/*
  https://stackoverflow.com/a/31462773/3115617
 */

const assert = require('assert');
const expect = require("chai").expect;
const rewire = require('rewire');
const dofc = rewire('../src/index');

describe("dofc test", function() {
  it("get UNITS length", function() {
  let unitsLength = Object.keys(dofc.UNITS).length;
  expect(unitsLength).to.equal(4);
  });

  it("test unifyUnit", function() {
  let unifyUnit = dofc.__get__('unifyUnit');
  input = {
      coc: 0.1,
      focal: 50,
      aperture: 0.5,
      distance: 10
  };
  output = unifyUnit(input, dofc.UNITS.METER);
  console.log(output);
  expect(Object.keys(output).length).to.equal(4);
  expect(output.coc).to.equal(0.1);
  expect(output.focal).to.equal(50);
  expect(output.aperture).to.equal(0.5);
  expect(output.distance).to.equal(10000);

  });
});
