module.exports = {
  Sort(inputArray){
    var array = inputArray.slice();
    for(var indx = 0; indx < array.length - 1; indx++){
      for(var indx2 = 0; indx2 < array.length - 1 - indx; indx2++){
        if (array[indx2] > array[indx2 + 1]){
          [array[indx2 + 1], array[indx2]] = [array[indx2], array[indx2 + 1]];
        }
      }
    }

    return array;
  }
}
