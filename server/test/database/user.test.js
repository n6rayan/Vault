const chai = require('chai');
const sinon = require('sinon');

const Database = require('../../src/database');

const db = new Database();

describe('Test Database User Functions', function () {

  const userData = require('../fixtures/user/user');
  const dbUserData = require('../fixtures/user/db-user');

  it('should create user', async function () {
    sinon.stub(Database.prototype, "createUser").returns(dbUserData);
    const user = await db.createUser(userData);

    chai.expect(user).to.be.an('Object');
    chai.expect(user._id).to.equal('5d74c4c607d5f4ac2e9e0c1d');
  });

  it('should get user by username', async function () {
    sinon.stub(Database.prototype, "getUserByUsername").returns(dbUserData);
    const user = await db.getUserByUsername('username');

    chai.expect(user).to.be.an('Object');
    chai.expect(user._id).to.equal('5d74c4c607d5f4ac2e9e0c1d');
  });

  it('should get user by id', async function () {
    sinon.stub(Database.prototype, "getUserById").returns(dbUserData);
    const user = await db.getUserById('5d74c4c607d5f4ac2e9e0c1d');

    chai.expect(user).to.be.an('Object');
    chai.expect(user.username).to.equal('username');
    chai.expect(user.name).to.equal('User Name');
    chai.expect(user.phone).to.equal('07123456789');
  });

  it('should update a user from query', async function () {
    sinon.stub(Database.prototype, "updateUser").returns(dbUserData);
    const user = await db.updateUser({ username: 'username' }, { name: 'User Name' });

    chai.expect(user).to.be.an('Object');
    chai.expect(user.username).to.equal('username');
    chai.expect(user.name).to.equal('User Name');
    chai.expect(user.phone).to.equal('07123456789');
  });

  afterEach(function() {
    sinon.restore();
  });
});