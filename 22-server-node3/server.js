const fs = require('fs');
const fileName = "./1.txt";


fs.readFile(fileName, "utf-8", function(err, data) {
  if (err) {
    console.log(err);
    return;
  }

  fs.writeFile(fileName, `${data}${data}`, function(err, data2) {
    if (err) {
      console.log(err);
      return;
    }
    console.log({data2});
  });

  console.log({data});
});


// fs.writeFile("./2.txt", "Ми записали щось у файл", function(err, data) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log({data});
// });

// fs.writeFileSync("url", data);



// const dataSync = fs.readFileSync("./1.txt", "utf-8");

// console.log({dataSync});
console.log("end file");



// console.log(fs);