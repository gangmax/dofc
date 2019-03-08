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

// //Set infinity distance as 10km.
const INFINITY_DISTANCE = 10.0 * 1000 * 1000;

/*
 Use the same millimeter unit to unify all the input parameters.
 */
function unifyInput(input, unit) {
  input.distance = input.distance * unit;
  return input;
}

/*
 Unify all the output properties back to passed-in unit.
 */
function unifyOutput(output, unit) {
  Object.keys(output).forEach(key => output[key] = output[key] / unit);
  return output;
}

/*
 All parameters in "unifiedInput" are based on millimeter or without unit:
   coc, focal, aperture, distance.
 The output is a object contains the 7 following numbers:
   Calculate: hyperFocal, nearLimit, farLimit, totalDepth, frontPercent,
   hehindPercent, frontDepth, behindDepth.
 */
function calculate(unifiedInput) {
  const coc = unifiedInput.coc;
  const focal = unifiedInput.focal;
  const aperture = unifiedInput.aperture;
  const distance = unifiedInput.distance;
  // Calculate: hyperFocal, nearLimit, farLimit, totalDepth, frontPercent,
  // hehindPercent, frontDepth, behindDepth.
  const hyperFocal = (focal * focal) / (aperture * coc) + focal;
  const nearLimit = ((hyperFocal - focal) * distance) / 
    (hyperFocal + distance - (2 * focal));
  //Prevent 'divide by zero' when calculating far distance.
  let farLimit = 1.0;
  if ((hyperFocal - distance) <= 0.00001) {
    //Set infinity at 10000m.
    farLimit = INFINITY_DISTANCE;
  } else {
    farLimit = ((hyperFocal - focal) * distance) / (hyperFocal - distance);
  }
  let totalDepth = farLimit - nearLimit;
  const frontPercent = (distance - nearLimit) / (farLimit - nearLimit) * 100.0;
  const hehindPercent = (farLimit - distance) / (farLimit - nearLimit) * 100.0;
  let frontDepth = 1.0;
  let behindDepth = 1.0;
  if (farLimit < INFINITY_DISTANCE) {
    frontDepth = distance - nearLimit;
    behindDepth = farLimit - distance;
  } else {
    farLimit = Infinity;
    totalDepth = Infinity;
    frontDepth = distance - nearLimit;
    behindDepth = Infinity;
  }
  return {
    hyperFocal,
    nearLimit,
    farLimit,
    totalDepth,
    frontPercent,
    hehindPercent,
    frontDepth,
    behindDepth
  }
}

function calc(coc, focal, aperture, distance, unit = UNITS.METER) {
  let unifiedInput = unifyInput({
      coc: coc,
      focal: focal,
      aperture: aperture,
      distance: distance
  }, unit);
  return unifyOutput(calculate(unifiedInput));
}

module.exports = {
  UNITS,
  calc
}
