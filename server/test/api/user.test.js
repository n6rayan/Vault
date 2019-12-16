const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes', function () {

  it('should return creation error', async function () {
    const response = await chai.request(app).post('/api/user');

    expect(response.status).to.equal(400);
    expect(response.body).to.eql({ success: 0, error: "Unable to create user!" });
  });

  it('should create a user', async function () {
    const userData = require('../fixtures/user.json');
    const response = await chai.request(app).post('/api/user').send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.eql({ success: 1, message: 'User created!' });
  });
});