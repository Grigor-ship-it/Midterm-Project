require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



const sendSMSnotification = function() {client.messages
  .create({
     body: 'Thanks for ordering. Your order will be ready in approximately 20 minutes.',
     from: '+12512835988',
     to: '+15144492722'
   })
  .then(message => {
    console.log(message)
    return client.messages
  })
  .catch(err => {
   console.log(err)
  })
  return client.messages
}



  module.exports = sendSMSnotification
