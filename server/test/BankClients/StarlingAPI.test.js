const chai = require('chai');
const sinon = require('sinon');

const StarlingAPI = require('../../src/banks/StarlingAPI');
const starling = new StarlingAPI();

describe('Test Starling API', function() {

  it('should get an access token', async function() {
    const tokenData = require('../fixtures/oauth/tokens');
    sinon.stub(starling, 'getAccessToken').resolves(tokenData);

    const tokens = await starling.getAccessToken('code');
    
    chai.expect(tokens).to.be.an('Object');
    chai.expect(tokens.access_token).to.eql('bW3kAkyNWCYUvNG6QFBLoiZc1YbGGblvLFW9FYvNzMF0FAidxNoPZP5gsN1T3NiS');
  });

  it('should get a list of accounts', async function() {
    const accountData = require('../fixtures/accounts/accounts-list');
    sinon.stub(starling, 'getAccountsList').resolves(accountData);

    const accounts = await starling.getAccountsList('4cc355-T0k3N');
    
    chai.expect(accounts).to.be.an('Object');
    chai.expect(accounts.accounts).to.be.an('Array');
    chai.expect(accounts.accounts).to.have.length(2);
  });

  it('should retrieve an accounts information', async function() {
    const accountInfo = require('../fixtures/accounts/account-information');
    sinon.stub(starling, 'getAccountInfo').resolves(accountInfo);

    const account = await starling.getAccountInfo('4cc355-T0k3N', 'this-is-a-test');
    
    chai.expect(account).to.be.an('Object');
    chai.expect(account.iban).to.eql('GB63SRLG60837101234567');
  });

  it('should retrieve an accounts balance', async function() {
    const accountBalance = require('../fixtures/accounts/account-balance');
    sinon.stub(starling, 'getAccountBalance').resolves(accountBalance);

    const account = await starling.getAccountBalance('4cc355-T0k3N', 'this-is-a-test');
    
    chai.expect(account).to.be.an('Object');
    chai.expect(account.amount.minorUnits).to.eql(11223344);
  });

  afterEach(function() {
    sinon.restore();
  });
});