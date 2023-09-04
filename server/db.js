const mongoose = require('mongoose')

mongoose.connect('[db_info]', {
  useUnifiedTopology: true,
})
// 사용자 정보 필드들...
const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  pw: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
