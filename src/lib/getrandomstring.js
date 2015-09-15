// Create a nice client unique enough id.
// https://github.com/google/closure-library/blob/2012c5372fdb02ce9531cf4b2561b05e3ce2ab39/closure/goog/string/string.js#L1183
export default function getRandomString() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) +
         Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
}
