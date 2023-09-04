import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginContext } from './context/LoginContext.js';
import Login from './Login.js';
import Nav from './Nav.js';
import Home from './components/Home.js';
import Register from './Register.js';
import Mypage from './Mypage.js';
import Detail from './components/detail.js';
import images from './utils/List.js';
import Upload from './upload.js';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  //컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    try {
      const result = await axios.post('https://localhost:5000/logout', null, {
        withCredentials: true,
      });
      if (result.status === 200) {
        setIsLogin(false);
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get('https://localhost:5000/session', {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('세션 체크 에러:', error);
    }
  };

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      <Router>
        <div>{isLogin && <button onClick={logout}>Logout</button>}</div>
        <Nav />
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/" element={<Home />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/detail/:id" element={<Detail images={images} />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
