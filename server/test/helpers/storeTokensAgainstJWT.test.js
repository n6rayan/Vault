const chai = require('chai');
const jwt = require('jsonwebtoken');

const jwtModify = require('../../src/helpers/storingTokensAgainstJWT');

describe('Testing JWT Modification Helper', function () {

  it('should return a malformed jwt error', function () {
    chai.assert.throws(function () {
      jwtModify('blah', 'blah');
    }, 'jwt malformed');
  });

  it('should return a JWT and include new modifications', function () {
    const jsonwebtoken = jwtModify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.rznY5j2yATtnFeFNkykjaVTHb-ej78ZjYOpyi7qE0xA', { access_token: 'accessToken', refresh_token: 'refreshToken' });

    chai.expect(jsonwebtoken).to.match(/eyJ.+\.eyJ.+\..+/);

    const payload = jwt.verify(jsonwebtoken, 'PyXqNfZBfiGy87pw');

    chai.expect(payload).to.contain({ accessToken: 'accessToken', refreshToken: 'refreshToken' });
  });
});