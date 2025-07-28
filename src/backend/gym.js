// React 컴포넌트 (EmailRegistration.jsx)
import React, { useState } from 'react';

const EmailRegistration = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // POST 요청 보내기
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // CORS 관련 헤더 (필요시)
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('이메일이 성공적으로 등록되었습니다!');
        setEmail(''); // 입력 필드 초기화
        console.log('등록 성공:', data);
      } else {
        // 에러 응답 처리
        const errorData = await response.json();
        setMessage(`등록 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      setMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>이메일 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !email}>
          {loading ? '등록 중...' : '등록하기'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailRegistration;

// ===== 또는 axios를 사용하는 방법 =====
// npm install axios 설치 후

import axios from 'axios';

const EmailRegistrationWithAxios = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setMessage('이메일이 성공적으로 등록되었습니다!');
      setEmail('');
      console.log('등록 성공:', response.data);
    } catch (error) {
      if (error.response) {
        // 서버에서 에러 응답을 받은 경우
        setMessage(`등록 실패: ${error.response.data.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        setMessage('서버와 연결할 수 없습니다.');
      } else {
        // 기타 오류
        setMessage('요청 중 오류가 발생했습니다.');
      }
      console.error('등록 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // JSX는 위의 fetch 예시와 동일
};

// ===== Spring Boot 백엔드 예시 (참고용) =====
/*
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 URL
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        try {
            // 이메일 유효성 검사
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "이메일이 필요합니다."));
            }
            
            // 이메일 중복 검사 (예시)
            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "이미 등록된 이메일입니다."));
            }
            
            // 사용자 등록 로직
            User user = userService.registerUser(email);
            
            return ResponseEntity.ok(Map.of(
                "message", "등록이 완료되었습니다.",
                "userId", user.getId()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "서버 오류가 발생했습니다."));
        }
    }
}
*/