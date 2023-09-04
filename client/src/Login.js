import axios from 'axios';
import React, { useState, useContext } from 'react';
import { LoginContext } from './context/LoginContext';
import './css/Login.css';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const { setIsLogin } = useContext(LoginContext);

  const login = () => {
    axios({
      url: 'http://localhost:5000/api',
      method: 'POST',
      withCredentials: true,
      data: {
        id: id,
        pw: pw,
      },
    }).then((result) => {
      if (result.status === 200) {
        setIsLogin(true);
        // 로그인이 성공하면 사용자 이름을 가져와 상태를 업데이트
        setName(result.data.userName); // userName은 서버에서 받아온 사용자 이름의 필드이다.
      } else {
        // 로그인 실패 처리
      }
    });
  };

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

        <button onClick={login} className="button">
          로그인
        </button>
      </div>
      {name && <p className="welcomeMessage">Welcome, {name}!</p>}
    </div>
  );
}
