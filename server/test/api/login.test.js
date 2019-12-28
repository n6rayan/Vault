const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const helpers = require('../../src/helpers');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Login Route - Errors', function () {

  it('should return missing credentials error', async function () {
    const response = await chai.request(app).post('/api/login');

    expect(response.body).to.eql({ error: 'User not found!', success: 0 });
  });

  it('should return incorrect credentials error', async function () {
    const userData = require('../fixtures/user');
    sinon.stub(helpers, "findUser").resolves(userData);

    const response = await chai.request(app).post('/api/login').send({ username: 'username', password: 'wrong-password' });

    expect(response.body).to.eql({ error: 'User not found!', success: 0 });
  });

  after(function() {
    sinon.restore();
  });
});

describe('Login/Log Out Routes', function () {

  it('should log user in', async function () {
    const userData = require('../fixtures/db-user');
    sinon.stub(helpers, "findUser").resolves(userData);

    const response = await chai.request(app).post('/api/login').send({ username: 'username', password: 'password' });

    expect(response.body.success).to.equal(1);
    expect(response.body.message).to.equal('Successfully logged in!');
  });

  it('should get current user', async function () {
    const token = require('../jwtGenerate');
    const response = await chai.request(app).get('/api/current-user').set('Cookie', `jwt=${token}`);

    expect(response.body.user.username).to.equal('N6Rayan');
  });

  it('should log user out', async function () {
    const response = await chai.request(app).get('/api/logout');

    expect(response.body).to.eql({ success: 1, message: 'Successfully logged out!' });
  });

  after(function() {
    sinon.restore();
  });
});