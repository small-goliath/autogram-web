"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Group {
  id: string;
  type: string;
}

export function Register() {
  const [createConsumerFormData, setCreateConsumerFormData] = useState({
    username: '',
    groupId: '',
  });
  const [type, setType] = useState('');
  const [kakaoChatFile, setKakaoChatFile] = useState<File | null>(null);
  const [remvedConsumer, setRemovedConsumer] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
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
    setCreateConsumerFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKakaoChatFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKakaoChatFile(e.target.files[0]);
    }
  };

  const handleGroupSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.post('/api/admin/groups',
        {
          type: type
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      console.log(response.data.status);
      alert("설정 되었습니다.");
    } catch (error) {
      alert("설정 되지 않았습니다.");
      console.error('설정 실패:', error);
    }
  };

  const handleConsumerCreateSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.post('/api/admin/consumers',
        {
          username: createConsumerFormData.username,
          group_id: createConsumerFormData.groupId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      console.log(response.data.status);
      alert("설정 되었습니다.");
    } catch (error) {
      alert("설정 되지 않았습니다.");
      console.error('설정 실패:', error);
    }
  };

  const handleConsumerRemoveSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.delete('/api/admin/consumers?username=' + remvedConsumer);

      console.log(response.data.status);
      alert("설정 되었습니다.");
    } catch (error) {
      alert("설정 되지 않았습니다.");
      console.error('설정 실패:', error);
    }
  };

  const handleKakaoCharFileRemoveSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (!kakaoChatFile) {
        alert("파일을 선택해 주세요.");
        return;
      }

      const formData = new FormData();
      formData.append('file', kakaoChatFile);

      const response = await axios.post('/api/admin/kakao-chats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.status);
      alert("설정 되었습니다.");
      setKakaoChatFile(null);
    } catch (error) {
      alert("설정 되지 않았습니다.");
      console.error('설정 실패:', error);
    }
  };

  return (
    <div className="container">
      <h1>관리자 목록</h1>
      <form onSubmit={handleGroupSubmit}>
        <div className="form-group">
          <label>그룹 등록</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="그룹 명"
          />
        </div>
        <button type="submit">설정하기</button>
      </form>

      <hr />

      <form onSubmit={handleConsumerCreateSubmit}>
        <div className="form-group">
          <label>받는 계정 등록</label>
          <input
            name="username"
            type="text"
            value={createConsumerFormData.username}
            onChange={handleChange}
            placeholder="받는 사람의 인스타그램 계정"
          />
          <select
            name="groupId"
            value={createConsumerFormData.groupId}
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
        <button type="submit">설정하기</button>
      </form>

      <hr />

      <form onSubmit={handleConsumerRemoveSubmit}>
        <div className="form-group">
          <label>받는 계정 삭제</label>
          <input
            type="text"
            value={remvedConsumer}
            onChange={(e) => setRemovedConsumer(e.target.value)}
            placeholder="삭제할 받는 사람의 인스타그램 계정"
          />
        </div>
        <button type="submit">설정하기</button>
      </form>


      <hr />

      <form onSubmit={handleKakaoCharFileRemoveSubmit}>
        <div className="form-group">
          <label>카카오톡 채팅방 내용 최신화</label>
          <input
            type="file"
            accept=".txt"
            onChange={handleKakaoChatFileChange}
            placeholder="윈도우PC에서 채팅방 내용 내보내기한 파일"
          />
        </div>
        <button type="submit">설정하기</button>
      </form>
    </div>
  );
};