fs = require('fs');

const convert = (from, to) => str => Buffer.from(str, from).toString(to)

module.exports = {
    utf8ToHex  : convert('utf8', 'hex'),
    hexToUtf8  : convert('hex', 'utf8')
}
// var imgHexEncode = utf8ToHex('1234');
// // Output encoded data to console
// console.log(imgHexEncode);
// var imgHexDecode = hexToUtf8(imgHexEncode);
// console.log(imgHexDecode);
