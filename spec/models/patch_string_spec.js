var expect = require('expect.js');
var Xktta = require('../../temp/xktta.js');

describe('String', function() {

  before(function() {
    Xktta
      .init;
  });

  it('#capitalize', function () {
    expect('user'.capitalize).to.be('User');
  });

  it('#pluralize', function () {
    expect('user'.pluralize).to.be('users');
    expect('fish'.pluralize).to.be('fishs');
  });

  it('#singularize', function () {
    expect('users'.singularize).to.be('user');
    expect('fishs'.singularize).to.be('fish');
  });

  it('#interpolate', function(){
    expect('#{first} #{last}'.interpolate({first: 'First', last: 'Last'})).to.be('First Last');

    expect('%first %last'.interpolate({first: 'First', last: 'Last'}, '%', false)).to.be('First Last');
  });

});