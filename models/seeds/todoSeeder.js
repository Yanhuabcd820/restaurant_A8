
const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('connected')
  for (let i = 0; i < 3; i++) {
    Todo.create({
      name: `name${i}`,
      category: `category${i}`
    })
  }
})
