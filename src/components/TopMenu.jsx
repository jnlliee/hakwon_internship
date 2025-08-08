// src/components/TopMenu.jsx
const TopMenu = () => {
  const styles = {
    topRightMenu: {
      position: 'fixed', // stick to top
      top: '24px',
      right: '40px',
      display: 'flex',
      gap: '24px',
      zIndex: 1000,
    },
    topLink: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.topRightMenu}>
      <a href="#home" style={styles.topLink}>홈</a>
      <a href="#search" style={styles.topLink}>검색</a>
      <a href="#settings" style={styles.topLink}>설정</a>
    </div>
  );
};

export default TopMenu;