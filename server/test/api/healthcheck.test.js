const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const redis = require('redis');
const mockRedis = require('redis-mock');

const app = require('../../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Healthcheck Route', function () {

  beforeEach(function () {
    sinon.stub(redis, "createClient").resolves(mockRedis.createClient());
  });

  it ('should GET /healthcheck', async function () {
    const response = await chai.request(app).get('/api/healthcheck');
    
    expect(response).to.have.status(200);
    expect(response.body.now).to.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/);
    expect(response.body.status).to.equal('OK');
  });

  afterEach(function () {
    sinon.restore();
  });
});