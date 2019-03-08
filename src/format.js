/*
  The implementation how to format dofc result numbers into human friendly text.

  https://www.npmjs.com/package/localize
 */
'use strict';

const debug = require('debug')('dofc');
const Localize = require('localize');

const UNITS = require('./index').UNITS;

const dofLocalize = new Localize({
    'Infinity': {
        'en': 'Infinity',
        'cn': '无限远'
    },
    'mm': {
        'en': 'mm',
        'cn': '毫米'
    },
    'cm': {
        'en': 'cm',
        'cn': '分米'
    },
    'meter': {
        'en': 'meter',
        'cn': '米'
    },
    'feet': {
        'en': 'feet',
        'cn': '英尺'
    },
    'inches': {
        'en': 'inches',
        'cn': '英寸'
    }
});

/*
  Format a number using fixed-point notation.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
 */
function financial(x, lengthAfterDot = 2) {
  return Number.parseFloat(x).toFixed(lengthAfterDot);
}

function format(value, unit, locale = 'en') {
  dofLocalize.setLocale(locale);
  let result = '';
  if (value=== Infinity) {
    result = dofLocalize.translate('Infinity');
  } else {
    const valueString = financial(value);
    const unitString = dofLocalize.translate(UNITS.items[unit].code);
    result = valueString + unitString;
  }
  return result;
}

function formatPercent(value) {
    const result = '' + financial(value) + '%';
    return result;
}

module.exports = {
    format,
    formatPercent
}
