const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantShow: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params.id)
  // res.render('show', { restaurant: restaurantList.results[req.params.id - 1] })
  const restaurantClick = restaurantList.results.find(item => item.id === Number(req.params.id))
  res.render('show', { restaurant: restaurantClick })
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const restaurantSearch = restaurantList.results.filter(item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  // console.log(restaurantSearch)
  res.render('index', { restaurantShow: restaurantSearch, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`web run on http://localhost:${port}`)
})