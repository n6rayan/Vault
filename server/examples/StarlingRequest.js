const axios = require('axios');

// Access token provided by Starling OAuth transaction
const token = process.env.TOKEN;

async function getAccounts() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api-sandbox.starlingbank.com/api/v2/accounts',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
}

getAccounts();