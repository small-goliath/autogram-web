"use client";

import { useState } from 'react';
import { Unfollower } from './unfollower';
import { Verification } from './verification';

const navItems = [
  { key: 'verification', label: '[카카오톡 ] SNS 키우기 품앗이 현황' },
  { key: 'unfollower', label: '인스타 언팔검색기' },
];

function ResponsiveStyle() {
  return (
    <style>
      {`
        @media (max-width: 768px) {
          .layout-root {
            flex-direction: column !important;
          }
          .sidebar {
            width: 100% !important;
            min-height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid #ddd !important;
            padding: 0.5rem 0.5rem !important;
          }
          .main-content {
            padding: 1rem !important;
          }
          .nav-button {
            padding: 1rem 0.5rem !important;
            font-size: 1.1rem !important;
          }
        }
      `}
    </style>
  );
}

export function App() {
  const [current, setCurrent] = useState('verification');

  return (
    <>
      <ResponsiveStyle />
      <div
        className="layout-root"
        style={{
          display: 'flex',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
          flexDirection: 'row',
        }}
      >
        {/* Navbar */}
        <nav
          className="sidebar"
          style={{
            background: '#f3f3f3',
            borderRight: '1px solid #ddd',
            padding: '2rem 1rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  className="nav-button"
                  onClick={() => setCurrent(item.key)}
                  style={{
                    width: '100%',
                    background: current === item.key ? '#ddd' : 'transparent',
                    border: 'none',
                    borderRadius: 4,
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: current === item.key ? 'bold' : 'normal',
                    fontSize: '1rem',
                    transition: 'background 0.2s',
                  }}
                  aria-current={current === item.key}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Content */}
        <main
          className="main-content"
          style={{
            flex: 1,
            padding: '2rem',
            minWidth: 0,
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 800,
            margin: '0 auto'
          }}
        >
          {current === 'verification' ? <Verification /> : <Unfollower />}
        </main>
      </div>
    </>
  );
}