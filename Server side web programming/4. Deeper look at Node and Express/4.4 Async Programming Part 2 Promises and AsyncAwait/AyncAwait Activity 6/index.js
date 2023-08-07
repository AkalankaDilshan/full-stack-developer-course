const customPromise = function () {
  const promise = new Promise(function (resolve, reject) {
    const x = 'open-uom';
    const y = 'open-uom';
    if (x === y) {
      resolve('Both Texts are same');
    } else {
      reject('Both Texts mismatch');
    }
  });

  return promise;
};

async function funcPromise() {
  try {
    let output = await customPromise();
    console.log(output);
  } catch (error) {
    console.log('Error: ' + error);
  }
}

funcPromise();
