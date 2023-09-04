const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moment = require('moment');
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./passport').config(passport);
const { MONGODB_URL } = process.env;

const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const postsRoutes = require('./routes/posts');

// CORS 설정 추가
app.use(
  cors({
    origin: 'http://localhost:3001', // 클라이언트 도메인
    credentials: true, // credentials 허용
  })
);

//middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', postsRoutes);

// connect to mongoDB server
mongoose.connect(MONGODB_URL).then(() => {
  console.log('Successfully connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
