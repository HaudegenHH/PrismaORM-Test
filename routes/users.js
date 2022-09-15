const router = require('express').Router()
const { PrismaClient } = require("@prisma/client")

const { user } = new PrismaClient()

router.get('/', async (req, res) => {
  const users = await user.findMany({
    select: {
      username: true,
      posts: true
    }
  })

  res.json(users)
})

router.get('/:id', async (req, res) => {
  const {id} = req.params
  
  const record = await user.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  res.json(record)
})

router.post('/', async (req, res) => {
  const {username} = req.body
  // first check if username already exist
  const userExist = await user.findUnique({
    where: {
      username: username
    },
    select: {
      username: true
    }
  })

  if(userExist){
    return res.status(400).json({message: 'user already exists'})    
  } 
  const newUser = await user.create({
    data: {
      username
    }
  })
  
  return res.json(newUser)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { username } = req.body
  // check if user exist
  const userExist = await user.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if(!userExist){
    return res.status(400).json({message: 'user doesnt exists'})    
  } 

  const updatedUser = await user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username
    },
  })
  
  return res.status(203).json(updatedUser)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const userExist = await user.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if(!userExist){
    return res.status(400).json({message: 'user doesnt exists'})    
  } 
  
  await user.delete({
    where: {
      id: parseInt(id)
    }
  })

  return res.status(200).json({msg: 'deleted'})
})

module.exports = router