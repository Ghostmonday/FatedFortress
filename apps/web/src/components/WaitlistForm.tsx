'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, github })
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'You\'re on the list!');
        setEmail('');
        setName('');
        setGithub('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to join waitlist');
    }
  };

  return (
    <div className="waitlist-form">
      {status === 'success' ? (
        <div className="waitlist-success">
          <span className="success-icon">✓</span>
          <p>{message}</p>
          <button onClick={() => setStatus('idle')} className="reset-btn">
            Add another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="waitlist-form-inner">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="waitlist-input"
          />
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="waitlist-input"
          />
          <input
            type="text"
            placeholder="GitHub username (optional)"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="waitlist-input"
          />
          <button type="submit" disabled={status === 'loading'} className="waitlist-btn">
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
          {message && <p className="waitlist-message error">{message}</p>}
        </form>
      )}

      <style jsx>{`
        .waitlist-form {
          max-width: 400px;
          margin: 0 auto;
        }
        .waitlist-form-inner {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .waitlist-input {
          padding: 12px 16px;
          border: 1px solid #333;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 14px;
        }
        .waitlist-input::placeholder {
          color: #666;
        }
        .waitlist-input:focus {
          outline: none;
          border-color: #00d4ff;
        }
        .waitlist-btn {
          padding: 12px 24px;
          background: #00d4ff;
          color: #000;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .waitlist-btn:hover:not(:disabled) {
          background: #00b8e6;
        }
        .waitlist-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .waitlist-message {
          margin: 8px 0 0;
          font-size: 13px;
        }
        .waitlist-message.error {
          color: #ff4444;
        }
        .waitlist-success {
          text-align: center;
          padding: 20px;
        }
        .success-icon {
          display: inline-block;
          width: 48px;
          height: 48px;
          line-height: 48px;
          background: #00d4ff;
          color: #000;
          border-radius: 50%;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .reset-btn {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          text-decoration: underline;
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
}
