function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
const RandomType = {
  Increasing: 'Increasing',
  Decreasing: 'Decreasing',
  TrulyRandom: 'TrulyRandom',

}

//Server stuff
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ptmdmusique:cheatcode@sortingalgocomparer-w4wpk.mongodb.net/test?retryWrites=true";
const express = require('express')
const app = express()
const port = 3000

//Decoration
var clc = require("cli-color");
var printf = require('printf');

//Test data
var minRandom = -100;
var maxRandom = 100;
var minSize = 1;
var maxSize = 100;
var sizeStep = 15;
let randomType = RandomType.Increasing;

//Sort algorithms data
var sortName = ["Selection Sort", "Insertion Sort", "Bubble Sort", "Quick Sort", "Tim Sort", "Merge Sort"];
var sortVar = [require('./SelectionSort.js'), require('./InsertionSort'), require('./BubbleSort.js'),
               require('./QuickSort.js'), require('./TimSort.js'), require('./MergeSort.js')];
var runningTime = new Array(sortName.length);
var combinedList = [];    //{size: ..., runningTime: runningTime[]}

//Report data
var maxNameLen = -1;
var maxTimeLen = -1;
var nameFormat;
var timeFormat;
var failTime = 0;
var successTime = 0;

for(var size = 1; size <= maxSize; size += sizeStep){
  //Generate random array
  var testArray = [];
  for(var indx = 0; indx < size; indx++){
    testArray[indx] = randomInt(minRandom, maxRandom);
  }
  switch (randomType){
    case RandomType.Increasing:
      testArray.sort((a, b) => a - b)
      break;
    case RandomType.Decreasing:
      testArray.sort((a, b) => b - a)
      break;
  }

  var sortedArray = testArray.slice();
  console.log("-----Original array: ");
  console.log(...testArray);
  console.log("~~Expected sorted array: ");
  console.log(...sortedArray.sort((a, b) => a - b));

  for(var sortIndx = 0; sortIndx < sortName.length; sortIndx++){
    console.log("----" + sortName[sortIndx] + ": ");

    runningTime[sortIndx] = -process.hrtime()[1];
    var temp = sortVar[sortIndx].Sort(testArray);
    runningTime[sortIndx] += process.hrtime()[1];
    //console.log("~!Sorted array: " + temp);
    var same = true;
    for(var indx = 0; indx < sortedArray.length; indx++){
      if (temp[indx] !== sortedArray[indx]){
        same = false;
        break;
      }
    }
    if (same == false){
      console.log("Sort " + clc.redBright("failed") + " the test!");
      console.log(...temp);
      failTime++;
    } else {
      console.log("Sort " + clc.cyan("passed") + " the test!");
      successTime++;
    }

    console.log("Running time: " + runningTime[sortIndx] + " nanoseconds");
  }
  combinedList.push({size: size, runningTime: runningTime.slice()});
}

//Print report
sortName.forEach(function(name){
    if (maxNameLen < name.length) maxNameLen = name.length;
});
for(var indx = 0; indx < sortName.length; indx++){
  if (maxNameLen < sortName[indx].length) maxNameLen = sortName[indx].length;
  if (maxNameLen < runningTime[indx].toString().length) maxNameLen = runningTime[indx].toString().length;
}

maxNameLen += 15;
maxTimeLen += 15;
nameFormat = '%-' + maxNameLen.toString() + 's';
timeFormat = '%-' + maxTimeLen.toString() + 's';

console.log(clc.greenBright("\n~~Report: "));
console.log("Ran " + clc.greenBright(failTime + successTime) + " tests.");
console.log("Fail " + clc.redBright(failTime) + " tests.");
console.log("Passed " + clc.cyan(successTime) + " tests.");

console.log(clc.greenBright("\n~~Report table: "));
process.stdout.write(printf(nameFormat, "Name"));
for(var indx = 0; indx < combinedList.length; indx++){
  process.stdout.write(printf(timeFormat, ("Time(s=" + combinedList[indx].size.toString()) + ")"));
}

console.log();
for(var indx = 0; indx < sortName.length; indx++){
  process.stdout.write(printf(nameFormat, sortName[indx]));
  for(var indx2 = 0; indx2 < combinedList.length; indx2++){
    process.stdout.write(printf(timeFormat, combinedList[indx2].runningTime[indx]));
  }
  process.stdout.write('\n');
}

//Database interaction
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("RunningTime_ForReport");

  //Drop the old data and add the new one
  dbo.collection("RunningTime").drop(function(err, res){
    dbo.collection("RunningTime").insertMany(combinedList);
    db.close();
  });
});

app.get('/', (req, res) => {
  //res.send(runningTime);
  res.send(totalRunningTime);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
