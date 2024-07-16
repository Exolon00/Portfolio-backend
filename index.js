const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config();
const cors = require('cors')

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;


const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    const { email, name, message } = req.body
    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    const transporter = nodemailer.createTransport(config)
    let mailOptions = {
        form: EMAIL,
        to: 'exolon00@gmail.com',
        subject: "New form submitted form portfolio",
        text: `You have received a new form submission!\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    }

    transporter.sendMail(mailOptions)
    .then(()=>{
        return  res.status(201).json({
            msg: "Submitted"
        })
    }).catch(err=>{
        res.status(500).json({
            msg: "Internal server error"
        })
    })

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});