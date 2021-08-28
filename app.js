const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const exphbs = require('express-handlebars')

const Todo = require('./models/todo')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// const restaurantList = require('./restaurant.json')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then(todos => res.render('index', { restaurantShow: todos }))
    .catch(error => console.error(error))
  // res.render('index', { restaurantShow: Todo })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todos => res.render('show', { restaurant: todos }))
    .catch(error => console.error(error))
})

// app.get('/search', (req, res) => {
//   const restaurantSearch = restaurantList.results.filter(item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
//   // console.log(restaurantSearch)
//   res.render('index', { restaurantShow: restaurantSearch, keyword: req.query.keyword })
// })
app.get('/search', (req, res) => {
  const keyword = RegExp(req.query.keyword, 'i') //i為不分大小寫
  Todo.find({
    $or: [
      { 'name': { $regex: keyword } },
      { 'category': { $regex: keyword } }]
  })
    .lean()
    .then(restaurant => {
      if (restaurant.length === 0) {
        console.log('無符合搜尋結果')
        res.render('index', {
          restaurants: restaurant, errorMsg: '無符合搜尋結果'
        })
      }
      res.render('index', { restaurantShow: restaurant, keyword: req.query.keyword })
    })
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.findById(id)
    .lean()
    .then(todos => res.render('edit', { restaurant: todos }))
    .catch(error => console.error(error))

})
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  Todo.findById(id)
    .then(todos => {
      todos.name = name
      todos.category = category
      todos.image = image
      todos.location = location
      todos.phone = phone
      todos.google_map = google_map
      todos.rating = rating
      todos.description = description
      todos.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))

})
app.post('/todos', (req, res) => {
  console.log('req.body', req.body.name)
  console.log('req.body', req.body.category)
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  Todo.create({
    name: name,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todos => todos.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log(`web run on http://localhost:${port}`)
})



const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('connected')
})