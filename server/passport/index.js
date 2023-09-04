const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const users = require('../db.js');

exports.config = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const result = users.filter((user) => user.id === id); // 수정된 부분: user.id === id
    if (result.length > 0) {
      done(null, result[0]);
    } else {
      done(new Error('User not found')); // 사용자를 찾을 수 없을 때 에러 처리 추가
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'pw',
      },
      (id, pw, done) => {
        const result = users.filter((user) => user.id === id);
        if (result.length > 0) {
          const user = result[0];
          if (user.password === pw) {
            done(null, user);
          } else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } else {
          done(null, false, { message: '가입되지 않은 회원입니다.' });
        }
      }
    )
  );
};
