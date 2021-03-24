module.exports = {
  vault: {
    apiUrl: 'http://vault.io:3001/api',
    clientUrl: 'http://vault.io:3000'
  },
  starling: {
    clientId: process.env.STARLING_CLIENT_ID,
    clientSecret: process.env.STARLING_CLIENT_SECRET
  },
  jwt: {
    secret: process.env.JWT_AUTH_SECRET
  }
};
