import React, { useState } from 'react';
import './css/Register.css';

const CreateUserForm = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pw !== pw2) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    const userData = {
      id: id,
      pw: pw,
      pw2: pw2,
      name: name,
      email: email,
      phone: phone,
    };

    console.log(JSON.stringify(userData));
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.text(); //json 형식으로 하면 오류나는 거 이해가 잘 안간다.
      console.log(data); // 서버로부터의 응답 데이터 출력 (선택사항)
      alert(data); // 서버로부터의 응답 데이터 메시지 출력 (선택사항)
    } catch (error) {
      console.error('요청 실패:', error);
      alert('요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /*  오류남
     const responseData = await response.json(); // 백엔드에서 전달한 JSON 응답을 파싱

    if (response.ok) {
      // 응답이 성공적인 경우 (HTTP 상태 코드 200번대)
      console.log(responseData); // 백엔드로부터의 응답 데이터 출력 (선택사항)
      alert('새로운 사용자가 저장되었습니다.'); // 성공 메시지 알림
    } else {
      // 응답이 실패한 경우 (HTTP 상태 코드 200번대 이외의 코드)
      console.error(responseData.err); // 에러 메시지 콘솔 출력
      alert(responseData.err); // 실패 메시지 알림
    }
  } catch (error) {
    console.error('요청 실패:', error);
    alert('요청에 실패했습니다. 다시 시도해주세요.');
  }
};*/

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
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
