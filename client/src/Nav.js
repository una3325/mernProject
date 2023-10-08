import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Nav.css'

export default function Nav({ isLoggedIn, onLogout, userName, setIsLogin }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await onLogout() // 로그아웃 요청이 완료될 때까지 대기
      setIsLogin(false) // 로그아웃 상태로 변경

      // 로그아웃 요청이 완료된 후에 홈 페이지로 이동
      navigate('/')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }
  console.log('userName:', userName)

  return (
    <nav className="Nav">
      <div className="title">
        <Link to="/">PHOTO SHARING</Link>
      </div>

      <ul>
        {isLoggedIn ? (
          <>
            <li>
              {userName ? (
                <span>{userName}님, 환영합니다</span>
              ) : (
                <span>사용자 이름을 불러올 수 없습니다.</span>
              )}
            </li>
            <li>
              <Link to="/Mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/upload">사진업로드</Link>
            </li>
            <li>
              <Link to="/Boards">자유게시판</Link>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Register">회원가입</Link>
            </li>
            <li>
              <Link to="/Login">로그인</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
