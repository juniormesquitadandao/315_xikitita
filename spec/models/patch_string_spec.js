var expect = require('expect.js');
var Xikitita = require('../../temp/xikitita.js');

describe('String', function() {
  
  before(function() {
    Xikitita
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

  it('#interpolation', function(){
    expect('#{first} #{last}'.interpolation({first: 'First', last: 'Last'})).to.be('First Last');

    expect('%first %last'.interpolation({first: 'First', last: 'Last'}, '%', false)).to.be('First Last');
  });

});