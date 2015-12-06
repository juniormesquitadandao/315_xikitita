var expect = require('expect.js');
var Xikitita = require('../../app/models/xikitita.js');

describe('String', function() {
  before(function() {
    Xikitita
      .init
  });

  it('#pluralize', function () {
    expect('user'.pluralize).to.be('users');
    expect('fish'.pluralize).to.be('fishs');
  });

  it('#singularize', function () {
    expect('users'.singularize).to.be('user');
    expect('fishs'.singularize).to.be('fish');
  });

});