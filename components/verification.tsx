"use client";

import { useEffect, useState } from 'react';

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
      const response = await fetch(`/api/sns-raise/verifications`);
      const result = await response.json();
      setVerifications(result);
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
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>사용자별 품앗이하지 않은 링크</h1>

      <input
        type="text"
        value={username}
        placeholder="username 입력"
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 16, padding: 8 }}
      />

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : grouped.length === 0 ? (
        <p style={{ color: 'blue' }}>좋아요! 모두 다 잘 하고 있으시네요!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {grouped.map(({ username, links }, idx) => (
            <li
              key={username}
              style={{
                background: '#f9f9f9',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)'
              }}>
              <span style={{ fontWeight: 'bold' }}>{username}</span>
              <ul style={{ padding: 0, marginTop: 8, marginBottom: 0 }}>
                {links.map((link, linkIdx) => (
                  <li key={linkIdx} style={{ display: 'inline-block', margin: '0 8px' }}>
                    <a
                      href={String(link)}
                      style={{ color: '#555' }}
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