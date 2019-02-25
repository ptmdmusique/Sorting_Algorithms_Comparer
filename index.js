var testArray = [5, 4, 3, 2, 1, 6, 8, 112, 315, 8871, 221, 97, 0];

var sortName = ["Selection Sort", "Insertion Sort", "Bubble Sort", "Quick Sort", "Tim Sort"];
var sortVar = [require('./SelectionSort'), require('./InsertionSort'), require('./BubbleSort.js'), require('./QuickSort.js'), require('./TimSort.js')];
var runningTime = new Array(sortName.length);

console.log("-----Original array: ");
console.log(testArray);
console.log();

for(var sortIndx = 0; sortIndx < sortName.length; sortIndx++){
  console.log("----" + sortName[sortIndx] + ": ");
  console.log("~~Sorted array: ");
  runningTime[sortIndx] = -process.hrtime()[1];
  console.log(sortVar[sortIndx].Sort(testArray));
  runningTime[sortIndx] += process.hrtime()[1];
  console.log("Running time: " + runningTime[sortIndx] + " nanoseconds\n");
}
