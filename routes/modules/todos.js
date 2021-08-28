const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')




router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.findById(id)
    .lean()
    .then(todos => res.render('edit', { restaurant: todos }))
    .catch(error => console.error(error))

})
router.put('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todos => todos.remove())
    // .delete()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


module.exports = router