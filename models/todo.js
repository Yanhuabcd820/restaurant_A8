const mongoose = require('mongoosr')
const Schema = mongoose.Schema
const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  }, category: {
    type: String,
    required: true
  }
  // , image: {
  //   type: String,
  //   required: true
  // }, location: {
  //   type: String,
  //   required: true
  // }, phone: {
  //   type: Number,
  //   required: true
  // }, google_map: {
  //   type: String,
  //   required: true
  // }, rating: {
  //   type: Number,
  //   required: true
  // }, description: {
  //   type: String,
  //   required: true
  // }
})

module.exports = mongoose.module('Todo', TodoSchema)