module.exports = {
  Sort(inputArray){
    if (inputArray.size < 2){
      return inputArray;
    }

    var array = inputArray.slice();
    for(var indx = 0; indx < array.length - 1; indx++){
      var minIndx = indx;

      for(var indx2 = indx + 1; indx2 < array.length; indx2++){
        if (array[minIndx] > array[indx2]){
          minIndx = indx2;
        }
      }

      [array[indx], array[minIndx]] = [array[minIndx], array[indx]];
    }

    return array;
  }

}
