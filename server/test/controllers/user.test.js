const chai = require('chai');

const Controller = require('../../src/controllers/user');

describe('Testing User Controller', function () {

  it ('should exist', function () {
    chai.assert(!!Controller);
  });
});