"use client";

import { useEffect, useState } from 'react';

interface Payment {
  username: string;
  price: number;
}

export function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    setDuration(`${year}-${month}`);
  }, []);

  const fetchPayments = async (queryDuration: string) => {
    try {
      const response = await fetch(`/api/admin/payments?duration=${queryDuration}`);
      const result = await response.json();
      console.log(result);
      setPayments(result);
    } catch {
      setError('금액 산정에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchPayments(duration);
  }, [duration]);

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>사용자별 금액</h1>

      <input
        type="month"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ margin: '20px 0', padding: '5px', fontSize: '16px' }}
      />

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : payments.length === 0 ? (
        <p style={{ color: 'blue' }}>아쉽게도 받을 금액이 없습니다</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {payments.map((payment, index) => (
            <li key={index} style={{ background: '#f9f9f9', margin: '10px 0', padding: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
              <span style={{ fontWeight: 'bold' }}>{payment.username}</span>: <span style={{ color: '#555' }}>{payment.price.toLocaleString()} 원</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}