const express = require('express')
const router = express.Router()
const BoardModel = require('../boardsDB')

// 게시글 생성 라우트
router.post('/boards', async (req, res) => {
  const { title, contents } = req.body
  const newBoard = new BoardModel({ title, contents })
  try {
    await newBoard.save()
    res.status(200).send('새로운 게시글이 저장되었습니다.')
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

// 게시글 조회 라우트
router.get('/boards', async (req, res) => {
  try {
    const boards = await BoardModel.find({})
    res.status(200).json(boards)
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

// 게시글 상세 조회 라우트
router.get('/boards/:id', async (req, res) => {
  const boardId = req.params.id
  if (!boardId) {
    return res.status(400).json({ error: '게시글 ID가 유효하지 않습니다.' })
  }

  try {
    const convertedBoardId = idxToObjectId(boardId)
    const board = await BoardModel.findById(convertedBoardId)
    if (!board) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' })
    }
    res.status(200).json(board)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 에러' })
  }
})

module.exports = router

// 게시글 수정 라우트

// 게시글 삭제 라우트
