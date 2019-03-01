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
    
    Sort(array, low, pivot - 1);
    Sort(array, pivot + 1, high);
  }
};

var Partition = function(array, low, high){
  var temp = array[low];
  var i = low; j = high + 1;

  do {
    do i++; while (array[i] < temp);
    do j--; while (array[j] > temp);

    [array[i], array[j]] = [array[j], array[i]];
  } while (i < j);

  [array[i], array[j]] = [array[j], array[i]];
  [array[low], array[j]] = [array[j], array[low]];

  return j;
}
