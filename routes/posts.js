const router = require('express').Router()
const { PrismaClient } = require("@prisma/client")

const { post, user } = new PrismaClient()

router.get('/', async (req, res) => {
  const posts = await post.findMany({
    select: {
      id: true,
      title: true,
      post: true,
      created_at: true,
      updated_at: true,
      user_id: true
    }
  })

  res.json(posts)
})

router.post('/', async (req, res) => {
  const { title, content, user_id } = req.body

  const userExist = await user.findUnique({
    where: {
      id: user_id
    }
  })

  if (!userExist){
    return res.status(400).json({msg: 'user doesnt exist'})
  }

  const newPost = await post.create({
    data: {
      title,
      post: content,
      user_id
    }
  })

  return res.json(newPost)
})

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params
  
  const userExist = await user.findUnique({
    where: {
      id: parseInt(user_id)
    }
  })

  if (!userExist){
    return res.status(400).json({msg: 'user doesnt exist'})
  }

  const posts = await post.findMany({
    where: {
      user_id: parseInt(user_id)
    }
  })

  return res.json(posts)
})

module.exports = router