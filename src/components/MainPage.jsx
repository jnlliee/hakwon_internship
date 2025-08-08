// src/components/MainPage.jsx
import { Routes, Route } from 'react-router-dom';
import EmailRegistration from './EmailRegistration';
import ChangeEmail from './ChangeEmail';
import CancelSubscription from './CancelSubscription';
import KeywordTrendsChart from './KeywordTrendsChart';
import SettingsPage from './SettingsPage';
import wave from '../assets/wave.png';
import TopMenu from './TopMenu';
import { useEffect, useRe,useState  } from 'react';
import { useLocation } from 'react-router-dom';

function MainPage() {
  const [view, setView] = useState('default');
  const location = useLocation();

useEffect(() => {
  const handleHashNavigation = () => {
    if (location.hash) {
      setTimeout(() => {
        let targetElement;
        
        if (location.hash === '#search') {
          targetElement = document.getElementById('search-header');
        } else {
          targetElement = document.querySelector(location.hash);
        }
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 150);
    }
  };

  handleHashNavigation();
}, [location]);

  return (
    <div style={styles.fullPage}>
      <TopMenu />
      
      {/* Section 1: 메인 소개 + 이메일 */}
      <section id="home" style={styles.wrapper}>
        <img src={wave} alt="Wave Background" style={styles.wave} />
        <div style={styles.container}>
          <h1 style={styles.title}>학원의 신</h1>
          <h2 style={styles.subtitle}>
            오늘의 교육 트렌드, <br /> 학원의 신으로 한눈에
          </h2>
          <p style={styles.description}>
            학부모와 선생님의 고민, 입시 이슈부터 교육 시장의 변화까지 — 매일 한 장의 리포트로 정리해드립니다.
          </p>
          <div style={styles.emailSection}>
            <EmailRegistration />
          </div>
        </div>
      </section>

      {/* Section 2: 검색 */}
      <section id="search" style={styles.searchSection}>
        <h2 style={styles.sectionHeader}>검색 트렌드</h2>
        <KeywordTrendsChart />
      </section>

      {/* Section 3: 설정 */}
      <section id="settings" style={styles.settingsSection}>
        <SettingsPage />
      </section>
    </div>
  );
}


const styles = {
    fullPage: {
    width: '100%',
    backgroundColor: '#00264D', // dark background for entire page
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },

  topRightMenu: {
  position: 'absolute',
  top: '24px',
  right: '40px',
  display: 'flex',
  gap: '24px',
  zIndex: 10,
},
topLink: {
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
  textDecoration: 'none',
},
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
  linkBtn: {
    backgroundColor: '#ffdb58',
    color: 'black',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  searchSection: {
    backgroundColor: '#043873',
    padding: '100px 40px',
    minHeight: '100vh',
  },
  settingsSection: {
    backgroundColor: '#043873',
    minHeight: '100vh', // Make it full screen height like homepage
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Remove scrollMarginTop or reduce it significantly
    scrollMarginTop: '0px', // This was pushing content down
  },
  sectionHeader: {
    fontSize: '32px',
    color :'white',
    fontWeight: 'bold',
    marginBottom: '40px',
    textAlign: 'center',
  },
};


export default MainPage;