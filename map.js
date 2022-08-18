Array.prototype.myMap = function(callback) {
    const resultArray = [];
    for (let index = 0; index < this.length; index++) {
        resultArray.push(callback(this[index], index, this));
    }
    return resultArray;
}

let arr = [1,2,3]
arr.myMap(function(val, index, arr){
  console.log(val, index, arr);
  return val * 10;
});
