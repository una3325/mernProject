const express = require('express');

const router = express.Router();
const UserModel = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 사용자 생성 라우트
router.post('/users', async (req, res) => {
  const { id, pw, name, email, phone } = req.body;
  const hashedPassword = await bcrypt.hash(pw, saltRounds);
  const newUser = new UserModel({ id, pw: hashedPassword, name, email, phone });

  console.log(req.body);

  try {
    const existingUser = await UserModel.findOne({ id });
    if (existingUser) {
      return res
        .status(400)
        .json({ err: '같은 아이디가 존재합니다. 다른 아이디를 입력해주세요.' });
    }

    await newUser.save();
    console.log('새로운 사용자가 저장되었습니다.');
    res.status(200).send('새로운 사용자가 저장되었습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 에러');
  }
});

// 사용자 조회 라우트
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 에러');
  }
});

module.exports = router;
