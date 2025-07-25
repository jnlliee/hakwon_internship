import { useState } from 'react';
import illustration from './assets/illustration.png';
import wave from './assets/wave.png';

function App() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('http://localhost:3001/api/send-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        alert('메일이 성공적으로 전송되었습니다!');
        setEmail('');
      } else {
        alert('메일 전송에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('에러가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button style={styles.loginBtn}>로그인</button>

        <h1 style={styles.title}>학원의 신</h1>

        <h2 style={styles.subtitle}>
          오늘의 교육 트렌드,  <br /> 
          학원의 신으로 한눈에  <br />
        </h2>

        <p style={styles.description}>
          학부모와 선생님의 고민, 입시 이슈부터 교육 시장의 변화까지 — 매일 한 장의 리포트로 정리해드립니다.
        </p>

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="이메일 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button style={styles.sendBtn} onClick={handleSend} disabled={isSending}>
            {isSending ? '전송 중...' : '전송 시작 →'}
          </button>
        </div>

        <img src={wave} alt="Wave Background" style={styles.wave} />
        <img src={illustration} alt="Illustration" style={styles.illustration} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#043873',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    color: 'white',
    padding: '60px 40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '1400px',
    minHeight: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  loginBtn: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    backgroundColor: '#ffdb58',
    color: 'black',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    fontSize: '60px',
    fontWeight: 'bold',
    marginBottom: '32px',
  },
  subtitle: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '16px',
    lineHeight: '1.4',
  },
  description: {
    fontSize: '18px',
    color: '#c8d5e5',
    marginBottom: '24px',
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '18px',
    maxWidth: '220px',
    backgroundColor: '#d4cc95',
  },
  sendBtn: {
    backgroundColor: '#558cc7',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '16px 28px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    width: '160px',
    whiteSpace: 'nowrap',
  },
  illustration: {
    position: 'absolute',
    bottom: '100px',
    right: '40px',
    width: '600px',
    maxWidth: '45%',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '160%',
    height: 'auto',
    opacity: 1,
    pointerEvents: 'none',
    transform: 'translateX(-5%)',
  },

};

export default App;
