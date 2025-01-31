/* BACKEND: server.js */
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post('/submit', (req, res) => {
    const { name, phone, uuid } = req.body;
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'luniticmush@gmail.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nPhone: ${phone}\nUUID: ${uuid}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.send('Form submitted successfully!');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));