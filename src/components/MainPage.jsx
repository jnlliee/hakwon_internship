// src/components/MainPage.jsx
import { Routes, Route } from 'react-router-dom';
import EmailRegistration from './EmailRegistration';
import ChangeEmail from './ChangeEmail';
import CancelSubscription from './CancelSubscription';
import wave from '../assets/wave.png';
import illustration from '../assets/illustration.png';

function MainPage() {
  return (
    <div style={styles.wrapper}>
      <img src={wave} alt="Wave Background" style={styles.wave} />
      <img src={illustration} alt="Illustration" style={styles.illustration} />

      <div style={styles.topRightButtons}>
        <a href="/cancel-subscription" style={styles.linkBtn}>구독 취소</a>
        <a href="/change-email" style={styles.linkBtn}>이메일주소 변경</a>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>학원의 신</h1>

        <h2 style={styles.subtitle}>
          오늘의 교육 트렌드,  <br /> 
          학원의 신으로 한눈에  <br />
        </h2>

        <p style={styles.description}>
          학부모와 선생님의 고민, 입시 이슈부터 교육 시장의 변화까지 — 매일 한 장의 리포트로 정리해드립니다.
        </p>

        <div style={styles.emailSection}>
          <Routes>
            <Route path="/" element={<EmailRegistration />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="/cancel-subscription" element={<CancelSubscription />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  topRightButtons: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    display: 'flex',
    gap: '12px',
    zIndex: 10,
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
    marginBottom: '40px',
  },
  emailSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
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
  illustration: {
    position: 'absolute',
    bottom: '100px',
    right: '40px',
    width: '600px',
    maxWidth: '45%',
  },
  linkBtn: {
    backgroundColor: '#ffdb58',
    color: 'black',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default MainPage;