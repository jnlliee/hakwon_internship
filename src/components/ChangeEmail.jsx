import React, { useState } from 'react';
import wave from '../assets/wave.png';
import { useNavigate } from 'react-router-dom';

function ChangeEmail() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate directly to the settings hash without delay or manual scrolling
    window.location.href = '/#settings';
  };

  const handleChangeEmail = async () => {
    if (!currentEmail || !newEmail) {
      alert('모든 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://172.20.94.156:8080/api/v1/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentEmail, newEmail }),
      });

      const result = await response.json();

      if (result.success) {
        alert('이메일이 성공적으로 변경되었습니다.');
        setCurrentEmail('');
        setNewEmail('');
      } else {
        alert(result.error || '이메일 변경에 실패했습니다.');
      }
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <button onClick={handleBack} style={styles.backButton}>← 뒤로가기</button>
      
      <img src={wave} alt="Wave" style={styles.wave} />

      <div style={styles.container}>
        <h1 style={styles.title}>학원의 신</h1>

        <h2 style={styles.heading}>이메일 변경하시겠습니까?</h2>
        <p style={styles.description}>
          기존에 등록하신 이메일 주소를 변경하고 싶으시면 아래에 입력해주세요.
        </p>

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="기존 이메일 주소를 입력해주세요"
            style={styles.input}
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
          <input
            type="email"
            placeholder="새 이메일 주소를 입력해주세요"
            style={styles.input}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={handleChangeEmail}>
          변경하기 →
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',        // ← span full viewport width
    minHeight: '100vh',
    backgroundColor: '#043873',
    color: 'white',
    fontFamily: 'sans-serif',
    overflowX: 'hidden',   // ← just in case
  },
    backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    paddingTop: '120px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  description: {
    fontSize: '16px',
    color: '#dbe9ff',
    marginBottom: '40px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  input: {
    width: '320px',
    padding: '14px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e6d9a8',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  button: {
    padding: '14px 32px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#f5426c',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '160%',
    pointerEvents: 'none',
    opacity: 0.2,
    transform: 'translateX(-5%)',
  },
};

export default ChangeEmail;
