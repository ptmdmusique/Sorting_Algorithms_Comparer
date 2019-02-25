//Source: https://www.youtube.com/watch?v=9kFHVe5MT6o
module.exports = {
  Sort(inputArray){
    var array = inputArray.slice();

    for(var indx = 0; indx < array.length; indx += run){
        InsertionSort(array, indx, indx + run >= array.length ? array.length - 1 : indx + run);
    }

    for(var bound = run; bound < array.length; bound *= 2){
        for(var curIndx = 0; curIndx < array.length; curIndx += 2 * bound){
          Merge(array, curIndx, curIndx + bound - 1, curIndx + bound, curIndx + 2 * bound);
        }
    }

    return array;
  }
}

var run = 2;

var InsertionSort = function(array, low, high){
  for(var indx = 1; indx <= high; indx++){
    var temp = array[indx];
    var indx2 = indx - 1;
    for(; indx2 >= 0 && array[indx2] > temp; indx2--){
        array[indx2 + 1] = array[indx2];
    }
    array[indx2 + 1] = temp;
  }
  return array;
}

var Merge = function(array, low1, high1, low2, high2){
  var indx1 = low1, indx2 = low2;
  var result = [];

  while (indx1 <= high1 && indx2 <= high2){
    if (array[indx1] < array[indx2]){
      result.push(array[indx1++]);
    } else if (array[indx1] > array[indx2]){
      result.push(array[indx2++]);
    } else {
      result.push(array[indx1++]);
      result.push(array[indx2++]);
    }
  }

  while (indx1 <= high1){
    result.push(array[indx1++]);
  }

  while (indx2 <= high2){
    result.push(array[indx2++]);
  }

  for(var indx = low1; indx <= high2 && indx < array.length; indx++){
    array[indx] = result[indx - low1];
  }
}
