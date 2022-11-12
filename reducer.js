Array.prototype.MyReducer = function (fn, init) {
  let current;
  let startIndex = 0;
  // If initial value is not defined assign it to with this first index value.
  if (init) {
    current = init;
  } else {
    // this refer to the array from which MyReducer is called.
    current = this[0];
    // If already take first index value then start loop from index 1.
    startIndex = 1;
  }
  for (let count = startIndex; count < this.length; count++) {
    current = fn(this[count], current, count, this);
  }
  return current;
}

//Way of calling MyReducer fucntion.
let arr = [1,2,3,4];
let res1 = arr.MyReducer((a,b) => a+b); // Here 1 will be the initial value.
let res2 = arr.MyReducer((a,b) => a+b, 10); // Here 10 will be the initial value.
console.log("res1 ", res, " res2 ", res2);
