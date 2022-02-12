const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(port, () => console.log('Server running'));

const onePlanetShopContactEmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
});

onePlanetShopContactEmail.verify((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Ready to send')
    }
});

router.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    console.log(name, email, message);
    const mail = {
        from: name,
        to: 'teamoneplanet@gmail.com',
        subject: subject,
        html:
            `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>`
    }

    onePlanetShopContactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "Something doesn't seem right." })
        } else {
            res.json({ status: "Carrier pigeon en route." })
        }
    })
})