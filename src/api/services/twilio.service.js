const Twilio = require('twilio');
const { twilioAuth } = require('../../config/vars');

exports.send = async ({
  content, receiver, sender,
}) => {
  const options = {
    body: content,
    from: sender,
    to: receiver,
  };
  const client = new Twilio(twilioAuth.key, twilioAuth.password);
  const response = await client.messages.create(options);
  return {
    trackingid: response.sid,
  };
};
