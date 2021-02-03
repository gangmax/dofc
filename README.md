A DOF(depth of field) calculator in JavaScript.

Run the unit test:

```js
npm test
```

A simple code example:

```JavaScript
var dofc = require("dofc")
const result = dofc.calc(0.020, 50, 1.8, 3, dofc.UNITS.Meter);
console.log(result)

// The result looks like below:
{
    behindDepth: 0.1330938257164339,
    farLimit: 3.133093825716434,
    frontDepth: 0.12224694958176678,
    frontPercent: 0.047876000000000085,
    hehindPercent: 0.05212399999999992,
    hyperFocal: 69.49444444444444,
    nearLimit: 2.8777530504182334,
    totalDepth: 0.2553407752982007
}
```

