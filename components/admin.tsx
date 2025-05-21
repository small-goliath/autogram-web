"use client";

import axios from 'axios';
import React, { useState } from 'react';

export function Register() {
  const [type, setType] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.post('/api/admin/groups?type=' + type);

      if (response.data.failed) {
        alert(response.data.failed);
        return;
      }

      alert(`그룹이 추가되었습니다: ${response.data.type}`);
    } catch (error) {
      alert(`그룹이 추가되지 않았습니다.`);
      console.error('그룹 추가 실패:', error);
    }
  };

  return (
    <div className="container">
      <h1>그룹 등록</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>그룹</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            placeholder="그룹 명"
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};