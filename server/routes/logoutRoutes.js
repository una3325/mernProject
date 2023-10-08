const express = require('express')
const router = express.Router()

// 로그아웃 라우터
router.post('/logout', (req, res) => {
  // 세션 파괴
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 파괴 에러:', err)
      res.status(500).send('세션 파괴 에러')
    } else {
      res.status(200).send('로그아웃 성공')
    }
  })
})

module.exports = router
