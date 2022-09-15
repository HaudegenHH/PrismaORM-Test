const axios = require('axios')
const express = require('express')
const router = require('express').Router()

const { PrismaClient } = require("@prisma/client")
const { user, post } = new PrismaClient()

const app = express()

app.use(express.json())
app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))

const PORT = process.env.PORT || 5000


app.get('/get-users', async (req, res) => {

  const url = "https://jsonplaceholder.typicode.com/users"

  const response = await axios.get(url)
  const records = response.data
  
  
  const data = records.map(record => {
    return { username: record.username }
  })

  await user.createMany({
    data,
    skipDuplicates: true, 
  })
  
  return res.status(201).json({msg: 'fake records created in users'})
})

app.get('/get-posts', async (req, res) => {

  const url = "https://jsonplaceholder.typicode.com/posts"

  const response = await axios.get(url)
  const records = response.data
  
  const data = records.map(record => {
    return {
      title: record.title,
      post: record.body,
      user_id: record.userId
    }
  })

  await post.createMany({
    data,
    skipDuplicates: true, 
  })
  
  return res.status(201).json({msg: 'fake records created in posts'})
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})