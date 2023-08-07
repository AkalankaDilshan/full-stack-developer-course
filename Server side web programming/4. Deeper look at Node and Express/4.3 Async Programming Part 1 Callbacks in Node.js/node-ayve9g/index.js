var fs = require('fs');

fs.readFile('input.txt', function (err, data) {
  if (err) return console.error(err);
  console.log(data.toString());
});

console.log('Program Ended');

/*in the terminal, execute the comman 'node index.js'. The output will display as,
Program Ended.
This is a text document
*/
