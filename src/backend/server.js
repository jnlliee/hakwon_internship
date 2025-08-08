const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
//const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001;

// ✅ Gmail SMTP setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// ✅ Email format validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

/**
app.post('/api/v1/user/register', async (req, res) => {

  if (!email) {
    return res.status(400).json({ success: false, error: '이메일이 제공되지 않았습니다.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: '유효하지 않은 이메일 주소입니다.' });
  }
  console.log(`이메일 등록됨: ${email}`);
  // TODO: save to mock DB 
  res.status(200).json({ success: true, message: '이메일 등록 성공 (로컬 테스트)' });
}); 
*/


/**
 * Receive email list + pdfUrl and send the Gmail
 */
app.post('/api/receive-email-list', async (req, res) => {
  console.log('✅ Got a POST request from teammate!');
  const { emails, pdfUrl } = req.body;

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ success: false, error: '이메일 리스트가 없습니다.' });
  }

  if (!pdfUrl || typeof pdfUrl !== 'string') {
    return res.status(400).json({ success: false, error: 'PDF 링크가 유효하지 않습니다.' });
  }
  //printing 
  if (pdfUrl) {
      console.log(`📄 전달받은 PDF 링크: ${pdfUrl}`);
    } else {
      console.log('⚠️ PDF 링크가 전달되지 않았습니다.');
    }
  console.log(`📋 총 ${emails.length}개의 이메일 수신됨`);
  //print texts

  try {
    for (const email of emails) {
      if (!isValidEmail(email)) {
        console.warn(`❌ 유효하지 않은 이메일: ${email}`);
        continue;
      }
      console.log(`📩 이메일: ${email}`); //이메일 모두 로그 

      await transporter.sendMail({
        from: `"학원의신" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: '📄 오늘의 리포트입니다',
        html: `
          <p>안녕하세요!</p>
          <p>오늘의 리포트를 아래 링크에서 확인하실 수 있습니다:</p>
          <p><a href="${pdfUrl}">PDF 다운로드</a></p>
          <p>감사합니다.<br/>Hakwon Academy</p>
        `,
      });
      console.log(`📤 전송 완료: ${email}`);
    }

    res.status(200).json({ success: true, message: '모든 이메일 전송 완료' });
  } catch (error) {
    console.error('❌ 일괄 전송 실패:', error.message);
    res.status(500).json({ success: false, error: '일부 또는 전체 이메일 전송 실패' });
  }
});

// ✅ Start the server
app.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
