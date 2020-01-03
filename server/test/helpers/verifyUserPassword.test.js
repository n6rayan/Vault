const bcrypt = require('bcrypt');
const chai = require('chai');
const sinon = require('sinon');

const verifyUserPassword = require('../../src/helpers/verifyUserPassword');

const hash = '$2b$10$5rFaTXfWvcTi4VCEOnWQSObcRhNMl19JoAC5vW189W7ZYYCKOEXeC';

describe('Testing Verify User Password Helper', function () {

  it('should verify a user password', async function () {
    const verification = await verifyUserPassword('password', hash);

    chai.expect(verification).to.be.an('Boolean');
    chai.expect(verification).to.equal(true);
  });

  it('should not verify a user password', async function () {
    const verification = await verifyUserPassword('incorrectPassword', hash);

    chai.expect(verification).to.be.an('Boolean');
    chai.expect(verification).to.equal(false);
  });
});