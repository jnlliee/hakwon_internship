import { useState } from 'react';

function EmailRegistration() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsSending(true);

    try {;
      const response = await fetch('http://172.20.94.56:8080/api/v1/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        alert('메일이 성공적으로 등록되었습니다!');
        setEmail('');
      } else {
        alert('메일 등록에 실패하였습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('에러가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={styles.row}>
      <input
        type="email"
        placeholder="이메일 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleSend} disabled={isSending}>
        {isSending ? '전송 중...' : '구독 →'}
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#d8cc9c',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '16px',
    padding: '0 24px',
    fontSize: '18px',
    height: '56px',
    minWidth: '260px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4c9eff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '16px',
    padding: '0 24px',
    fontSize: '18px',
    height: '56px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: '12px',
    width: '160px',
    whiteSpace: 'nowrap',
  },
};

export default EmailRegistration;