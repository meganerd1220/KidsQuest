const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'robinhrdz@gmail.com',
    pass: '4lfr3d0hrdz#4960'
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, description } = req.body;

  const mailOptions = {
    from: email, 
    to: 'robinhrdz@gmail.com', 
    subject: 'Support Request',
    text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
