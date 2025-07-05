"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Verification {
  username: string;
  link: number;
}

// username으로 그룹화
function groupByUsername(verifications: Verification[]) {
  const grouped: Record<string, number[]> = {};
  for (const v of verifications) {
    if (!grouped[v.username]) grouped[v.username] = [];
    grouped[v.username].push(v.link);
  }
  // 최종 결과를 [{username, links: number[]}] 형태로 변환
  return Object.entries(grouped).map(([username, links]) => ({
    username,
    links,
  }));
}

export function Verification() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  const fetchVerifications = async () => {
    try {
      const response = await axios.get(`/api/sns-raise/verifications`);
      setVerifications(response.data);
    } catch {
      setError('품앗이 검증 조회 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  // username으로 필터링
  const filtered = username.trim()
    ? verifications.filter((v) => v.username === username)
    : verifications;

  // username별로 그룹핑
  const grouped = groupByUsername(filtered);

  return (
    <div className="container verification-container">
      <h1>사용자별 품앗이하지 않은 링크</h1>

      <input
        type="text"
        value={username}
        placeholder="username 입력"
        onChange={(e) => setUsername(e.target.value)}
        className="verification-input"
      />

      {error ? (
        <p className="error-message">{error}</p>
      ) : grouped.length === 0 ? (
        <p className="info-message">좋아요! 모두 다 잘 하고 있으시네요!</p>
      ) : (
        <ul className="verification-list">
          {grouped.map(({ username, links }) => (
            <li key={username} className="verification-item">
              <span className="username">{username}</span>
              <ul className="link-list">
                {links.map((link, linkIdx) => (
                  <li key={linkIdx} className="link-item">
                    <a
                      href={String(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkIdx + 1}번 바로가기
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}