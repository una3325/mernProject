import './css/Nav.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 시 클라이언트와 서버에서 세션을 삭제하는 작업 필요
    // 서버에 로그아웃 요청을 보내고 세션을 삭제하는 등의 처리를 해야 함
    onLogout(); // 클라이언트에서의 로그아웃 처리 (예시)
    navigate.push('/'); // 홈 화면으로 이동
  };

  return (
    <nav className="Nav">
      <div className="title">
        <Link to="/">PHOTO SHARING</Link>
      </div>

      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <span>안녕하세요, 님!</span>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
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
        <li>
          <Link to="/Mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="/upload">사진업로드</Link>
        </li>
        <li>
          <Link to="/">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}
