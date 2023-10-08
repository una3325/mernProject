import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginContext } from './context/LoginContext.js'
import Login from './Login.js'
import Nav from './Nav.js'
import Home from './components/Home.js'
import Register from './Register.js'
import Mypage from './Mypage.js'
import Detail from './components/detail.js'
import images from './utils/List.js'
import Upload from './upload.js'
import Boards from './boards/Boards.js'
import Write from './boards/write.js'
import BoardDetail from './boards/BoardDetail'

function App() {
  const [isLogin, setIsLogin] = useState(false) // 로그인 상태 여부
  const [user, setUser] = useState('') // 로그인한 사용자 정보
  const [userName, setUserName] = useState('')

  // 로그인 상태 변경 함수
  const handleLogin = (userName) => {
    setIsLogin(true)
    setUserName(userName)
    console.log('로그인 성공. 사용자 이름:', userName)
  }

  // 로그아웃 상태 변경 함수
  const handleLogout = () => {
    axios({
      url: 'http://localhost:5000/api/logout',
      method: 'POST',
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setIsLogin(false) // 요청 성공하면 로그인 상태를 false로 변경
      }
    })
  }

  useEffect(() => {
    // 서버에서 로그인 상태를 확인하고 사용자 정보를 설정하는 코드
    axios({
      url: 'http://localhost:5000/api/login/success',
      method: 'get',
      withCredentials: true,
    }).then((result) => {
      if (result.data.user) {
        setUser({
          username: result.data.user.username,
        }) // 서버 응답 데이터에 사용자 아이디가 있는 경우 로그인 상태 true로 변경
        setIsLogin(true)
      }
    })
  }, []) // 빈 배열을 전달해 한 번만 실행되게

  return (
    <>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <Router>
          <Nav
            isLoggedIn={isLogin}
            onLogout={handleLogout}
            userName={userName}
            setIsLogin={setIsLogin}
          />

          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route
              path="/Login"
              element={
                <Login
                  onLogin={handleLogin}
                  isLoggedIn={isLogin}
                  onLogout={handleLogout}
                  userName={user ? user.username : ''}
                />
              }
            />
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/" element={<Home />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Boards" element={<Boards />} />
            <Route path="/write" element={<Write />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/detail/:id" element={<Detail images={images} />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </>
  )
}

export default App
