const chai = require('chai');
const chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Mockgoose = require('mock-mongoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
const User = require('../../src/database/models/User');

const app = require('../../src/app');

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

  before(function (done) {
    this.timeout(0);

    const userData = require('../fixtures/user');

    mockgoose.prepareStorage().then(async function () {
      mongoose.connect('mongodb://example.com/TestingDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        const user = new User(userData);

        user.save();
        done(err);
      });
    });
  });

  it('should log user in', async function () {
    const response = await chai.request(app).post('/api/login').send({ username: 'username', password: 'password' });

    expect(response.body.success).to.equal(1);
    expect(response.body.message).to.equal('Successfully logged in!');
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