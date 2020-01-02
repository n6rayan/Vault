module.exports = {
  mongoose: {
    connection: 'mongodb://localhost:27017/vault'
  },
  starling: {
    oauthUrl: 'https://oauth-sandbox.starlingbank.com/?',
    apiUrl: 'https://api-sandbox.starlingbank.com'
  },
  redis: {
    host: '127.0.0.1'
  }
};