const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: { type: String, default: moment().format('YYYY-MM-DD hh:mm:ss') },
  updatedAt: { type: Date },
});
const Post = mongoose.model('post', postSchema);
