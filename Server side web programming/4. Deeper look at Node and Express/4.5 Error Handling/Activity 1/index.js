const fs = require('fs')

const content = 'This is the content which will write to text file!'

try {
  fs.writeFileSync('test.txt', content)
  //file written successfully
} catch (err) {
  console.error(err)
}