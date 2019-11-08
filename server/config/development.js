module.exports = {
  mongoose: {
    connection: 'mongodb://localhost:27017/vault'
  },
  starling: {
    oauthUrl: 'https://oauth-sandbox.starlingbank.com/?',
    apiUrl: 'https://api-sandbox.starlingbank.com'
  },
  vault: {
    apiUrl: 'http://vault.io:3001/api',
    clientUrl: 'http://vault.io:3000'
  },
}