const assert = require('assert');
const expect = require("chai").expect;
const dofc = require('../src/index');

describe("Demo test", function() {
  it("get UNITS length", function() {
  let unitsLength = Object.keys(dofc.UNITS).length;
  expect(unitsLength).to.equal(4);
  });
});
