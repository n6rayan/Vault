const chai = require('chai');
const sinon = require('sinon');

const Database = require('../../src/database');
const findUser = require('../../src/helpers/findUser');

describe('Testing Find User Helper', function () {

  before(function() {
    const userData = require('../fixtures/user/db-user');
    sinon.stub(Database.prototype, "getUserByUsername").resolves(userData);
  });

  it('should return a user', async function () {
    const user = await findUser('username');

    chai.expect(user).to.be.an('Object');
    chai.expect(user.username).to.equal('username');
    chai.expect(user.name).to.equal('User Name');
    chai.expect(user.email).to.equal('user.name@email.com');
  });

  after(function() {
    sinon.restore();
  });
});