const bcrypt = require('bcrypt');
const chai = require('chai');
const sinon = require('sinon');

const hashUserPassword = require('../../src/helpers/hashUserPassword');

describe('Testing Hash User Password Helper', function () {

  it('should return a hashed password', async function () {
    sinon.stub(bcrypt, 'hashSync').resolves('$2b$10$5rFaTXfWvcTi4VCEOnWQSObcRhNMl19JoAC5vW189W7ZYYCKOEXeC');
    const password = await hashUserPassword('password');

    chai.expect(password).to.be.an('String');
    chai.expect(password).to.equal('$2b$10$5rFaTXfWvcTi4VCEOnWQSObcRhNMl19JoAC5vW189W7ZYYCKOEXeC');
  });

  afterEach(function() {
    sinon.restore();
  });
});