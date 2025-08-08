// src/components/Layout.jsx
import { Outlet, Link } from 'react-router-dom';
import wave from '../assets/wave.png';

const Layout = () => {
  return (
    <div style={styles.layout}>
      {/* Top Nav */}
      <div style={styles.topRightMenu}>
        <a href="#home" style={styles.topLink}>홈</a>
        <a href="#search" style={styles.topLink}>검색</a>
        <a href="#settings" style={styles.topLink}>설정</a>
      </div>

      <Outlet /> {/* this renders the nested route content */}
      
      <img src={wave} alt="Wave" style={styles.wave} />
    </div>
  );
};

const styles = {
  layout: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#043873',
    color: 'white',
  },
  topRightMenu: {
    position: 'absolute',
    top: 24,
    right: 40,
    display: 'flex',
    gap: 24,
    zIndex: 10,
  },
  topLink: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '160%',
    pointerEvents: 'none',
    opacity: 0.3,
  },
};

export default Layout;
