/*
  A Depth of Field calculator written in Node/Javascript.

  Coding Style Guide for node.js:
    https://stackoverflow.com/a/5497467/3115617
 */
'use strict';

const debug = require('debug')('dofc')

const format = require('./format')

// All units based on millimeter.
// https://stijndewitt.com/2014/01/26/enums-in-javascript/
const UNITS = {
  MM: '1',
  CM: '2',
  METER: '3',
  FEET: '4',
  INCH: '5',
  items : {
    '1': {name: 'MM', value: 1.0, code: ' mm'},
    '2': {name: 'CM', value: 10.0, code: ' cm'},
    '3': {name: 'METER', value: 1000.0, code: ' meter'},
    '4': {name: 'FEET', value: 304.8, code: ' feet'},
    '5': {name: 'INCH', value: 25.4, code: ' inches'}
  }
};

// Define the infinity distance as 10km.
const INFINITY_DISTANCE = 10.0 * 1000 * 1000;

/*
  Use the same millimeter unit to unify all the input parameters.
 */
function unifyInput(input, unit) {
  input.distance = input.distance * UNITS.items[unit].value;
  return input;
}

/*
  Unify all the output properties back to passed-in unit.
 */
function unifyOutput(output, unit) {
  debug('Before unifyOutput: %s', JSON.stringify(output));
  Object.keys(output).forEach(key => output[key] = output[key] / 
    UNITS.items[unit].value);
  debug('After unifyOutput: %s', JSON.stringify(output));
  return output;
}

/*
  All parameters in 'unifiedInput' are based on millimeter or without unit:
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
  debug('hyperFocal = %s', hyperFocal)
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
  const result = {
    hyperFocal,
    nearLimit,
    farLimit,
    totalDepth,
    frontPercent,
    hehindPercent,
    frontDepth,
    behindDepth
  };
  debug('result = %s', JSON.stringify(result));
  return result;
}

function calc(coc, focal, aperture, distance, unit = UNITS.METER,
  locale = 'en', stringResult = false) {
  const unifiedInput = unifyInput({
      coc: coc,
      focal: focal,
      aperture: aperture,
      distance: distance
  }, unit);
  debug('unifiedInput: %s', JSON.stringify(unifiedInput));
  const result = unifyOutput(calculate(unifiedInput), unit);
  if (stringResult === true) {
    result.hyperFocal = format.format(result.hyperFocal, unit, locale);
    result.nearLimit = format.format(result.nearLimit, unit, locale);
    result.farLimit = format.format(result.farLimit, unit, locale);
    result.totalDepth = format.format(result.totalDepth, unit, locale);
    result.frontPercent = format.formatPercent(result.frontPercent);
    result.hehindPercent = format.formatPercent(result.hehindPercent);
    result.frontDepth = format.format(result.frontDepth, unit, locale);
    result.behindDepth = format.format(result.behindDepth, unit, locale);
  }
  debug('final result: %s', JSON.stringify(result));
  return result;
}

module.exports = {
  UNITS,
  calc
}
