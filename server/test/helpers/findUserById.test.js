const chai = require('chai');
const sinon = require('sinon');

const Database = require('../../src/database');
const findUserById = require('../../src/helpers/findUserById');

describe('Testing Find User By ID Helper', function () {

  before(function() {
    const userData = require('../fixtures/user/db-user');
    sinon.stub(Database.prototype, "getUserById").resolves(userData);
  });

  it('should return a user', async function () {
    const user = await findUserById('5d74c4c607d5f4ac2e9e0c1d');

    chai.expect(user).to.be.an('Object');
    chai.expect(user.username).to.equal('username');
    chai.expect(user.name).to.equal('User Name');
    chai.expect(user.email).to.equal('user.name@email.com');
  });

  after(function() {
    sinon.restore();
  });
});