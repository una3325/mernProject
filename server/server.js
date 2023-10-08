const express = require('express')
const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv')
const FileStore = require('session-file-store')(session)

const app = express()
dotenv.config()

const mongoose = require('mongoose')
const moment = require('moment') //일시 다루는 라이브러리
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./passport').config(passport)
const { MONGODB_URL } = process.env

const userRoutes = require('./routes/userRoutes')
const loginRoutes = require('./routes/loginRoutes')
const postsRoutes = require('./routes/posts')
const boardsRoutes = require('./routes/boards')
const logoutRoutes = require('./routes/logoutRoutes')
// CORS 설정 추가
app.use(
  cors({
    origin: 'http://localhost:3001', // 클라이언트 도메인
    methods: ['GET', 'POST'],
    credentials: true, // credentials 허용
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//session 설정
app.use(
  session({
    name: 'session ID',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    },
  })
)

//session확인 미들웨어
app.use('/', (req, res, next) => {
  try {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    console.log('session info', req.session)
    next()
  } catch (error) {
    console.error(error)
    next(error)
  }
})

app.get('/session', (req, res) => {
  //session을 받아오는 로직
  res.status(200).json('session informatin')
})

app.post('/login', (req, res) => {
  const userInfo = userDB.filter((item) => {
    return item.id === req.body.id
  })

  //session생성
  //   req.session.save(() => {
  //     req.session.user = {
  //       id: userInfo[0].id,
  //       name: userInfo[0].name,
  //     }
  //     const data = req.session
  //     res.status(200).json({ data })
  //   })
  // })

  // app.post('/login', async (req, res) => {
  //   const { id, pw } = req.body

  //   const user = await UserModel.findOne({ id, pw })

  if (!user) {
    // 일치하는 사용자가 없는 경우
    res.status(401).json({ message: '로그인 실패' })
  } else {
    // 세션에 사용자 정보 저장
    req.session.user = { id: user.id, name: user.name }
    res.status(200).json({ user: { id: user.id, name: user.name } })
  }
})

app.post('/logout', (req, res) => {
  //세션 파괴
  req.session.destroy(() => {
    res.status(200).json({ message: 'logout success' })
  })
})

app.get('/login/success', (req, res) => {
  try {
    const data = req.session
    res.status(200).json(data)
  } catch (error) {
    res.status(403).json('User not found')
  }
})

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', userRoutes)
app.use('/api', loginRoutes)
app.use('/api', postsRoutes)
app.use('/api', boardsRoutes)
app.use('/api', logoutRoutes)

// connect to mongoDB server
mongoose.connect(MONGODB_URL).then(() => {
  console.log('Successfully connected to MongoDB')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
