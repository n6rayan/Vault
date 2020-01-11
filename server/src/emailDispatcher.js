const config = require('config');
const mailjetConfig = config.get('mailjet');
const Mailjet = require('node-mailjet').connect(mailjetConfig.apiKey, mailjetConfig.secretKey);

/**
 * Sends a confirmation email for the user to validate their email address
 * @param {String} username
 * @param {String} emailAddress
 * @param {String} emailToken
 * @returns {Object}
 */
const sendConfirmationEmail = async (username, emailAddress, emailToken) => {
  const emailContent = `Hi ${username},

  Please confirm the email address you used to register your account by clicking the link below:

  http://vault.io:3001/api/user/confirm?data=${emailToken}

  Kind Regards,

  Vault Team`;

  return await _sendEmail(emailAddress, emailContent)
}

/**
 * Sends request to MailJet API to send email to specified email address
 * @param {String} emailAddress
 * @param {String} emailContent
 * @returns {Object} Returns the request object
 */
const _sendEmail = async (emailAddress, emailContent) => {
  const requestConfig = {
    FromEmail: mailjetConfig.fromEmail,
    FromName: mailjetConfig.fromName,
    Subject: 'Confirm Your Email Address',
    'Text-part': emailContent,
    Recipients: [ { Email: emailAddress  } ]
  };

  return await Mailjet.post('send').request(requestConfig);
}

module.exports.sendConfirmationEmail = sendConfirmationEmail;