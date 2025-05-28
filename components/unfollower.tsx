"use client";

import axios from 'axios';
import { useState } from 'react';

interface Unfollower {
  username: string;
  link: string;
}

export function Unfollowers() {
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [followers, setFollowers] = useState<Unfollower[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGroupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!username.trim()) {
      setError('유효한 사용자 이름을 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/unfollowers?username=${username}`);
      setFollowers(response.data);
      setError('')
    } catch (err) {
      setError('언팔로워 수집에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>언팔로워 리스트업</h1>
      <form onSubmit={handleGroupSubmit}>
        <div className="form-group">
          <label htmlFor="usernameInput">조회할 인스타그램 계정</label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '수집 중' : '조회하기'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!error && followers.length === 0 && <p style={{ color: 'blue' }}>언팔로워가 없습니다.</p>}

      {followers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>계정</th>
              <th>링크</th>
            </tr>
          </thead>
          <tbody>
            {followers.map((unfollower, index) => (
              <tr key={index}>
                <td>{unfollower.username}</td>
                <td>
                  <a href={unfollower.link} target='_blank' rel='noopener noreferrer'>
                    바로가기
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}