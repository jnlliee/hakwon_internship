const express = require('express'); //web framework for building api
const cors = require('cors'); // so frontend can talk to backend on another port
const bodyParser = require('body-parser'); //Parses incoming JSON requests
const nodemailer = require('nodemailer');  // ✅ Using Gmail instead
require('dotenv').config();


//express server instance
const app = express();
const PORT = 3001; // it will listen on port 3000


// ✅ Gmail transporter using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       
    pass: process.env.GMAIL_APP_PASS,  
  },
});

// ✅ Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //이메일 형식을 확인하기 위한 regex 패턴
// ✅ Your mock S3 link
const MOCK_S3_LINK =
'https://hakwonsin-ipsitrend-bucket.s3.us-east-2.amazonaws.com/2025-07-24%20%EC%9E%85%EC%8B%9C%20%ED%8A%B8%EB%A0%8C%EB%93%9C%20%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf';

app.use(cors()); //requests from front end
app.use(bodyParser.json());  //allows parsing of JSON request bodies (e.g., { email: "abc@xyz.com" }).
//api endpoint where frontend sends user's email address to backend.
app.post('/api/send-pdf', async (req, res) => { 
  const { email } = req.body; //extract email from the request

  if (!email) { 
    return res.status(400).json({ success: false, error: '이메일이 제공되지 않았습니다.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: '유효하지 않은 이메일 주소입니다.' });
  }

  try {
    await transporter.sendMail({
      from: `"Hakwon Academy" <${process.env.GMAIL_USER}>`, // shows in inbox
      to: email,
      subject: '📄 요청하신 리포트입니다',
      html: `
        <p>안녕하세요!</p>
        <p>요청하신 리포트를 아래 링크에서 확인하실 수 있습니다:</p>
        <p><a href="${MOCK_S3_LINK}">PDF 다운로드</a></p>
        <p>감사합니다.<br/>Hakwon Academy</p>
      `,
    });

    console.log(`✅ Email sent to: ${email}`);
    res.status(200).json({ success: true, message: '이메일 전송 성공' });
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    res.status(500).json({ success: false, error: '이메일 전송 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

//“This is a Node.js Express server that receives an email from the frontend, 
// validates it, and sends a PDF link to that email using Gmail SMTP with Nodemailer.”
//이 서버는 Node.js Express로 만든 백엔드로, 프론트엔드에서 이메일을 입력받고 유효성 검사를 한 뒤,
// Gmail SMTP와 Nodemailer를 이용해 해당 이메일로 PDF 링크를 전송합니다.