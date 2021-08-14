
const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const restaurantList = require('../restaurant.json')

const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  for (let i = 0; i < restaurantList.results.length; i++) {
    Todo.create({
      name: restaurantList.results[i].name,
      category: restaurantList.results[i].category,
      image: restaurantList.results[i].image,
      location: restaurantList.results[i].location,
      phone: restaurantList.results[i].phone,
      google_map: restaurantList.results[i].google_map,
      rating: restaurantList.results[i].rating,
      description: restaurantList.results[i].description
    })
  }
})
