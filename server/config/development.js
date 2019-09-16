module.exports = {
  mongoose: {
    connection: 'mongodb://localhost:27017/vault'
  },
  starling: {
    oauthUrl: 'https://oauth-sandbox.starlingbank.com/?',
    redirectUrl: 'https://ef21da95.ngrok.io/api/starling/oauth/redirect',
    apiUrl: 'https://api-sandbox.starlingbank.com/oauth/access-token'
  }
}