// 비밀번호 해싱하는 함수
import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
