module.exports = {
  Sort: function(inputArray){
    var array = inputArray.slice();
    Sort(array, 0, array.length - 1);
    return array;
  }
};

var Sort = function(array, low, high){
  if (low < high){
    var pivot = Partition(array, low, high);
    //console.log(array.slice(0, high - low + 1) + " low: " + low + " high: " + high + " pivot: " + pivot);
    Sort(array, low, pivot - 1);
    Sort(array, pivot + 1, high);
  }
};

var Partition = function(array, low, high){
  var temp = array[low];
  var i = low + 1; j = high;

  do {
    while(array[i] < temp) i++;
    while(array[j] > temp) j--;

    if (i >= array.length) i--;
    if (j < 0) j++;

    [array[i], array[j]] = [array[j], array[i]];
  } while (i < j);

  [array[i], array[j]] = [array[j], array[i]];
  [array[low], array[j]] = [array[j], array[low]];

  return j;
}
