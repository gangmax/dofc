/*
 A Depth of Field calculator written in Node/Javascript.
 https://stackoverflow.com/questions/22097603/unit-testing-of-private-functions-with-mocha-and-node-js
 */
"use strict";

// All units based on millimeter.
const UNITS = {
  CM: 10.0,
  METER: 1000.0,
  FEET: 304.8,
  INCH: 25.4
};

/*
 Use the same millimeter unit to unify all the input parameters.
 */
function unifyUnit(input, unit) {
  input.distance = input.distance * unit;
  return input;
}

function calc(coc, focal, aperture, distance, unit = UNITS.METER) {
  input = unifyUnit({
      coc: coc,
      focal: focal,
      aperture: aperture,
      distance: distance
  }, unit);
  //Calculate hyper focal and set it to the result bean.
  hyperFocal = (focal * focal) / (aperture * coc) + focal;




}




exports.UNITS = UNITS;

exports.calc = calc;
