const chai = require('chai');
const chaiHttp = require('chai-http');
const passport = require('passport');
const redis = require('redis');
const mockRedis = require('redis-mock');
const sinon = require('sinon');

const app = require('../../src/app');
const helpers = require('../../src/helpers');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Login Route - Errors', function () {

  it('should return missing credentials error', async function () {
    const response = await chai.request(app).post('/api/login');

    expect(response.body).to.eql({ message: 'Missing credentials', level: 'info', success: 0 });
  });

  it('should return incorrect credentials error', async function () {
    const response = await chai.request(app).post('/api/login').send({ username: 'username', password: 'password' });

    expect(response.body).to.eql({ message: 'Incorrect Credentials!', level: 'info', success: 0 });
  });
});

describe('Login/Log Out Routes', function () {

  before(function () {
    const userData = require('../fixtures/user');

    // sinon.stub(helpers, "findUser").resolves(userData);

    sinon.stub(redis, "createClient").resolves(mockRedis.createClient({}));

    sinon.stub(passport, "authenticate").callsFake((strategy, callback) => {
      callback(null, { "username": "test@techbrij.com" }, null);
      return (req, res, next) => { };
    });
    sinon.stub(passport, "serializeUser").yields({});
  });

  it('should log user in', async function () {
    const response = await chai.request(app).post('/api/login').send({ username: 'username', password: 'password' });

    expect(response.body.success).to.equal(1);
    expect(response.body.message).to.equal('Successfully logged in!');
  });

  after(function () {
    sinon.restore();
  });

  // TODO: Test api/current-user route
  // Add way to generate cookie
  xit('should get current user', async function () {
    const response = await chai.request(app).get('/api/current-user');
  });

  it('should log user out', async function () {
    const response = await chai.request(app).get('/api/logout');

    expect(response.body).to.eql({ success: 1, message: 'Successfully logged out!' });
  });
});