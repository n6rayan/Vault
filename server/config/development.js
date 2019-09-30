module.exports = {
  mongoose: {
    connection: 'mongodb://localhost:27017/vault'
  },
  starling: {
    oauthUrl: 'https://oauth-sandbox.starlingbank.com/?',
    redirectUrl: 'https://d01de125.ngrok.io/api/starling/oauth/redirect',
    apiUrl: 'https://api-sandbox.starlingbank.com/oauth/access-token'
  }
}