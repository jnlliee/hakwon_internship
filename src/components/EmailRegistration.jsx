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

    try {
      const response = await fetch('https://hakwon-internship.onrender.com/api/v1/user/register', {
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
    <div style={styles.inputGroup}>
      <input
        type="email"
        placeholder="이메일 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <button style={styles.sendBtn} onClick={handleSend} disabled={isSending}>
        {isSending ? '전송 중...' : '구독 →'}
      </button>
    </div>
  );
}

const styles = {
  inputGroup: {
    display: 'flex',
    gap: '12px',
    flexDirection: 'row',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    padding: '16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '18px',
    maxWidth: '220px',
    backgroundColor: '#d4cc95',
    width: '100%',
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