import axios from 'axios'
import React, { useState, useContext } from 'react'
import { LoginContext } from './context/LoginContext'
import './css/Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin, isLoggedIn, onLogout, userName }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const { isLogin, setIsLogin } = useContext(LoginContext)
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const login = () => {
    axios({
      url: 'http://localhost:5000/api/login',
      method: 'POST',
      withCredentials: true,
      data: {
        id: id,
        pw: pw,
      },
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.user && response.data.user.name) {
          console.log('로그인 성공')
          setIsLogin(true)
          const userName = response.data.user.name

          // 사용자 정보 업데이트
          setUser(response.data.user)

          onLogin(userName) // 로그인 시 호출
          navigate('/')
        } else {
          console.log('로그인 실패..')
          alert('로그인 실패')
          window.location.reload()
        }
      } else {
        console.log('로그인 실패..')
        alert('로그인 실패')
        window.location.reload()
      }
    })
  }
  const handleLogout = () => {
    setIsLogin(false)
    onLogout()
    navigate('/')
  }
  return (
    <div className="Loginbox">
      <h1>로그인</h1>

      <div>
        <div className="input-container">
          <label htmlFor="id" className="label">
            아이디
          </label>
          <input
            id="id"
            type="text"
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            value={id}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="pw" className="label">
            비밀번호
          </label>
          <input
            id="pw"
            type="password"
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
            value={pw}
            required
          />
        </div>
        <button
          onClick={login}
          isLoggedIn={isLogin}
          onLogout={handleLogout}
          name={name}
          className="login-button"
        >
          로그인
        </button>
      </div>
    </div>
  )
}
