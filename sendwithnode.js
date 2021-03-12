const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();
const port = process.env.PORT || 5000;
app.use('/v1', route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// process.env.GAMBIT_EMAIL
// process.env.GAMBIT_PASS

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.GAMBIT_EMAIL,
            pass: process.env.GAMBIT_PASS,
         },
    secure: true,
    });



const mailOptions = {
    from: 'gambitgames@gmail.com',  // sender address
        to: 'asndragoon@yahoo.com',   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b>     <br> Your Temporary Password is Go f yourself<br/>',
    };



transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
    });