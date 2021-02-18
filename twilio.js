const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require("twilio")(accountSid, authToken);

twilioClient.verify
  .services("AC5c7816b39c8a43149de5237c594a0598") //Put the Verification service SID here
  .verifications.create({to: "gambitprofit@gmail.com", channel: "email"})
  .then(verification => {
    console.log(verification.sid);
  });