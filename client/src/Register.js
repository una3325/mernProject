import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // useHistory 대신 useNavigate를 가져옵니다.
import './css/Register.css'

const CreateUserForm = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const navigate = useNavigate() // useNavigate를 사용하여 navigate 함수를 가져옵니다.

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (pw !== pw2) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
      return
    }

    const userData = {
      id: id,
      pw: pw,
      pw2: pw2,
      name: name,
      email: email,
      phone: phone,
    }

    console.log(JSON.stringify(userData))
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.text()
      console.log(data)

      if (response.status === 200) {
        alert('사용자 생성에 성공했습니다.')
        navigate('/login') // /login 페이지로 리디렉트
      } else {
        alert('사용자 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('요청 실패:', error)
      alert('요청에 실패했습니다. 다시 시도해주세요.')
    }
  }
  return (
    <div className="box">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">아이디</label>
        <input
          placeholder="아이디"
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br />
        <label htmlFor="pw">비밀번호</label>
        <input
          placeholder="비밀번호"
          type="password"
          id="pw"
          name="pw"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <br />
        <label htmlFor="pw2">비밀번호 확인</label>
        <input
          placeholder="비밀번호 확인"
          type="password"
          id="pw2"
          name="pw2"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          required
        />
        <br />
        <label htmlFor="name">이름</label>
        <input
          placeholder="이름"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">이메일</label>
        <input
          placeholder="이메일"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="phone">전화번호</label>
        <input
          placeholder="전화번호"
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="regi-create-button">
          생성
        </button>
      </form>
    </div>
  )
}

export default CreateUserForm
