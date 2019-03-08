/*
  Unit testing of private functions with mocha and node.js:
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

  it("test unifyInput", function() {
    const unifyInput = dofc.__get__('unifyInput');
    const input = {
      coc: 0.1,
      focal: 50,
      aperture: 0.5,
      distance: 10
    };
    const result = unifyInput(input, dofc.UNITS.METER);
    console.log(result);
    expect(Object.keys(result).length).to.equal(4);
    expect(result.coc).to.equal(0.1);
    expect(result.focal).to.equal(50);
    expect(result.aperture).to.equal(0.5);
    expect(result.distance).to.equal(10000);
  });

  it("test unifyOutput", function() {
    const unifyOutput = dofc.__get__('unifyOutput');
    const output = {
      hyperFocal: 1000.0,
      nearLimit: 100.0,
      farLimit: 1300.0,
      totalDepth: 1400.0,
      frontPercent: 10.0,
      hehindPercent: 90.0,
      frontDepth: 5.0,
      behindDepth: 10.0
    };
    const result = unifyOutput(output, dofc.UNITS.METER);
    console.log(result);
    expect(Object.keys(result).length).to.equal(8);
    expect(result.hyperFocal).to.equal(1);
    expect(result.nearLimit).to.equal(0.1);
    expect(result.farLimit).to.equal(1.3);
    expect(result.totalDepth).to.equal(1.4);
    expect(result.frontPercent).to.equal(0.01);
    expect(result.hehindPercent).to.equal(0.09);
    expect(result.frontDepth).to.equal(0.005);
    expect(result.behindDepth).to.equal(0.01);
  });
});
