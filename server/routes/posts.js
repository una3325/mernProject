const router = require('express').Router()
const Post = require('../models/Post')
const moment = require('moment')

router.post('/', async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
    })

    const result = await post.save()
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
