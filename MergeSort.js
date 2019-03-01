module.exports = {
  Sort(inputArray){
    var array = inputArray.slice();
    Sort(array, 0, array.length - 1);
    return array;
  }
}

var Sort = function(array, low, high){
  if (low < high){
    var middle = low + Math.floor((high - low) / 2);
    //console.log(low, middle, high);
    Sort(array, low, middle);
    Sort(array, middle + 1, high);

    Merge(array, low, middle, high);
  }
}

var Merge = function(array, low, middle, high){
  if (low >= array.length || high >= array.length){
    return;
  }
  //Pivot for Partition
  var indx1 = low, indx2 = middle + 1;
  var temp = [];

  while (indx1 <= middle && indx2 <= high){
    if (array[indx1] < array[indx2]){
      temp.push(array[indx1++]);
    } else if (array[indx1] > array[indx2]){
      temp.push(array[indx2++]);
    } else {
      temp.push(array[indx1++]);
      temp.push(array[indx2++]);
    }
  }

  while (indx1 <= middle){
    temp.push(array[indx1++]);
  }

  while (indx2 <= high){
    temp.push(array[indx2++]);
  }

  for(var indx = low; indx <= high; indx++){
    array[indx] = temp[indx - low];
  }
}
