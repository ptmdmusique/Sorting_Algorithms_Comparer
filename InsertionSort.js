module.exports = {
  Sort(inputArr){
    var array = inputArr.slice();

    for(var indx = 1; indx < inputArr.length; indx++){
      var temp = array[indx];
      var indx2 = indx - 1;
      for(; indx2 >= 0 && array[indx2] > temp; indx2--){
          array[indx2 + 1] = array[indx2];
      }

      array[indx2 + 1] = temp;
    }

    return array;
  }
}
