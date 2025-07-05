"use client";

import { useState } from 'react';
import { Unfollower } from './unfollower';
import { Verification } from './verification';

const navItems = [
  { key: 'verification', label: '[카카오톡 ] SNS 키우기 품앗이 현황' },
  { key: 'unfollower', label: '인스타 언팔검색기' },
];

export function App() {
  const [current, setCurrent] = useState('verification');

  return (
    <div className="layout-root">
      {/* Navbar */}
      <nav className="sidebar">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={`nav-button ${current === item.key ? 'active' : ''}`}
                onClick={() => setCurrent(item.key)}
                aria-current={current === item.key}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Content */}
      <main className="main-content">
        {current === 'verification' ? <Verification /> : <Unfollower />}
      </main>
    </div>
  );
}