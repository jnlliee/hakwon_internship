import React, { useState } from 'react';
import wave from '../assets/wave.png';
import { useNavigate } from 'react-router-dom';

function CancelSubscription() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  
  const handleBack = () => {
      // Navigate directly to the settings hash without delay or manual scrolling
      window.location.href = '/#settings';
    };
  const handleCancelSubscription = async () => {

  if (!email) {
    alert('이메일을 입력해주세요.');
    return;
  }



  try {
    const response = await fetch('http://172.20.94.156:8080/api/v1/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.success) {
      alert('구독이 성공적으로 취소되었습니다.');
      setEmail('');
    } else {
      alert(result.error || '구독 취소에 실패했습니다.');
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

        <h2 style={styles.heading}>구독 취소하시겠습니까?</h2>
        <p style={styles.description}>
          구독을 취소하시면 더 이상 교육 트렌드 관련 보고서를 받아보실 수 없습니다.
        </p>

        <div style={styles.inputRow}>
          <input
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

          <button style={styles.button} onClick={handleCancelSubscription}>
          구독취소 →
        </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
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
  wrapper: {
    backgroundColor: '#043873',
    color: 'white',
    minHeight: '100vh',
    position: 'relative',
    fontFamily: 'sans-serif',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    paddingTop: '120px',
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
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
  inputRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '14px 20px',
    borderRadius: '10px',
    border: 'none',
    width: '260px',
    backgroundColor: '#e6d9a8',
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    padding: '14px 24px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#f5426c',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '160%',
    height: 'auto',
    pointerEvents: 'none',
    zIndex: 1,
    transform: 'translateX(-5%)',
  },
};

export default CancelSubscription;
