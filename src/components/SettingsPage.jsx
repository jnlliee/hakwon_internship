import React from 'react';
import wave from '../assets/wave.png';
// Updated SettingsPage component for embedding in MainPage
function SettingsPage() {
  return (
    <div style={styles.wrapper}>
      <img src={wave} alt="Wave background" style={styles.wave} />

      <div style={styles.content}>
        <h1 style={styles.title}>설정</h1>
        <div style={styles.buttons}>
          <a href="/change-email" style={styles.link}>
            이메일 변경하기
          </a>
          <a href="/cancel-subscription" style={styles.link}>
            구독 취소하기
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    //position: 'relative',
    color: 'white',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {
    zIndex: 2,
    textAlign: 'center',
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    paddingBottom: '6px',
    borderBottom: '2px solid white',
    width: 'fit-content',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    zIndex: 1,
    pointerEvents: 'none',
    opacity: 0.6,
  },
};

export default SettingsPage;