"use client";

import axios from 'axios';
import React, { useState } from 'react';

export function Register() {
  const [type, setType] = useState('');
  const [createdConsumer, setCreatedConsumer] = useState('');
  const [remvedConsumer, setRemovedConsumer] = useState('');

  const handleCommonSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.post('/api/admin/common',
        {
          type: type,
          created_consumer: createdConsumer,
          removed_consumer: remvedConsumer
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (response.data.failed) {
        alert(response.data.failed);
        return;
      }

      alert("설정 되었습니다.");
    } catch (error) {
      alert("설정 되지 않았습니다.");
      console.error('설정 실패:', error);
    }
  };

  return (
    <div className="container">
      <h1>관리자 목록</h1>
      <form onSubmit={handleCommonSubmit}>
        <div className="form-group">
          <label>그룹 등록</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="그룹 명"
          />
        </div>
        <div className="form-group">
          <label>받는 계정 등록</label>
          <input
            type="text"
            value={createdConsumer}
            onChange={(e) => setCreatedConsumer(e.target.value)}
            placeholder="받는 사람의 인스타그램 계정"
          />
        </div>
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
    </div>
  );
};