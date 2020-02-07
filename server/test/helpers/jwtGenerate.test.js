const chai = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const jwtGenerate = require('../../src/helpers/jwtGenerate');

describe('Testing JWT Verification Helper', function () {

  it('should return a JWT', async function () {
    sinon.stub(jwt, 'sign').resolves('JWT');
    const token = await jwtGenerate({ username: 'N6Rayan' });

    chai.expect(token).to.be.an('String');
    chai.expect(token).to.eql('JWT');
  });

  afterEach(function () {
    sinon.restore();
  });
});