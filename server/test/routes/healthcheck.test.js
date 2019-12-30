const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Healthcheck Route', function () {

  it ('should GET /healthcheck', async function () {
    const response = await chai.request(app).get('/api/healthcheck');

    expect(response).to.have.status(200);
    expect(response.body.now).to.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/);
    expect(response.body.status).to.equal('OK');
  });
});