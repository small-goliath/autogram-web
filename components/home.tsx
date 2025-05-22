"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Group {
  id: string;
  type: string;
}

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    verificationCode: '',
    groupId: '',
  });
  const [groups, setGroups] = useState<Group[]>([]);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        const result = await response.json();
        console.log(result)
        setGroups(result);
      } catch {
        setError('Failed to fetch groups');
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.groupId) {
      alert('그룹을 선택하세요.');
      return;
    }
    
    try {
      const response = await axios.post(
        '/api/accounts/instagram',
        {
          username: formData.username,
          password: formData.password,
          verification_code: formData.verificationCode,
          group_id: formData.groupId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data.status)

      alert("계정이 추가되었습니다.");
    } catch (error) {
      alert('계정이 추가되지 않았습니다.');
      console.error('인스타 로그인 실패:', error);
    }
  };

  return (
    <div className="container">
      <h1>인스타그램 계정 등록</h1>
      <a href="https://instagram.com/doto.ri_">⚙️ 문의는 DM 주세요.</a>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <label>
            Password <span className="desc">패스워드는 일회용 로그인을 위함이며 당 서비스에서 저장하지 않습니다.</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="password"
          />
        </div>
        <div className="form-group">
          <label className="Bold">인증코드</label>
          <input
            type="password"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            required
            placeholder="인증코드 6자리"
          />
        </div>
        <label> 🔑 인증코드 등록 방법</label>
        <div className="verificationCodeVideo">
          <video controls width="100%">
            <source src="/verification-code-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="form-group">
          <label>본인 인스타그램 그룹</label>
          <select
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            required
          >
            <option value="">그룹을 선택하세요</option>
            {groups.map((group, index) => (
              <option key={index} value={group.id}>
                {group.type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group agreement">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            id="agree"
          />
          <label htmlFor="agree">
            인스타그램 정책상 짧은 시간에 많은 행위를 하게되면 일시적으로 피드 조회가 불가능할 수 있습니다. 이를 대비하여 본 서비스는 n분에 한 번씩 좋아요와 댓글을 자동화합니다.<br />동의 하십니까?
          </label>
        </div>
        <button type="submit" disabled={!agree}>
          Submit
        </button>
      </form>
    </div>
  );
}