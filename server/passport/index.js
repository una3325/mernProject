const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const UserModel = require('../db')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

exports.config = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        // ObjectId로 캐스팅 가능한지 확인
        const result = await UserModel.findById(id) // async/await 사용
        done(null, result)
      } else {
        done(null, false) // ObjectId로 캐스팅할 수 없는 경우 사용자를 찾지 않음
      }
    } catch (error) {
      done(error)
    }
  })

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'pw',
      },
      async (id, pw, done) => {
        try {
          const user = await UserModel.findOne({ id: id })
          if (user) {
            // 사용자 데이터베이스에서 해시된 패스워드 가져오기
            const hashedPassword = user.pw

            // bcrypt를 사용하여 비밀번호 비교
            bcrypt.compare(pw, hashedPassword, (err, isMatch) => {
              if (err) throw err
              if (isMatch) {
                done(null, user)
              } else {
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
              }
            })
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' })
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )
}
