import axios from 'axios';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      console.log(username)
      const response = await axios.post('http://localhost:8000/api/py/accounts/instagram', {
        username: username,
        password: password,
        verification_code: verificationCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(password)
      if (response.data.failed) {
        alert(response.data.failed);
        return;
      }

      alert(`계정 추가 성공: ${response.data.id}`);
    } catch (error) {
      alert(`계정 추가 실패`);
      console.error('인스타 로그인 실패:', error);
    }
  };

  return (
    <div>
      <h1>인스타그램 계정 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>인증코드:</label>
          <input
            type="password"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <div>
          인스타그램 정책상 짧은 시간에 많은 행위를 하게되면 일시적으로 피드 조회가 불가능할 수 있습니다.
          이를 대비하여 본 서비스는 5분에 한 번씩 좋아요와 댓글을 자동화합니다.
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label>동의합니다.</label>
        </div>
        <button type="submit" disabled={!agree}>Submit</button>
      </form>
    </div>
  );
};

export default Home;