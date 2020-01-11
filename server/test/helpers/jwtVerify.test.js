const chai = require('chai');

const jwtVerify = require('../../src/helpers/jwtVerify');

describe('Testing JWT Verification Helper', function () {

  it('should return a malformed jwt error', function () {
    chai.assert.throws(function () { jwtVerify('blah'); }, 'jwt malformed');
  });

  it('should return a decoded JWT', function () {
    const payload = jwtVerify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.KX8kzUd8mN1BxR3iPZWXc7gKQDMa5GgxlY-Tp-ih89A');

    chai.expect(payload).to.be.an('Object');
    chai.expect(payload).to.eql({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  });
});