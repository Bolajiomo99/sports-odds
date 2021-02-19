require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require("twilio")(accountSid, authToken);
//d-9abe4dedc06f43c59b282620365c24e0

twilioClient.verify
  .services("VAfcc6244f78908c1851e2eb8e89a26829") //Put the Verification service SID here
  .verifications.create({to: "asndragoon@yahoo.com", channel: "email"})
  .then(verification => {
    console.log(verification.sid);
  });