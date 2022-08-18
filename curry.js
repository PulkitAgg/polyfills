function curry(fn) {
  var arity = fn.length; // check the arity of the given function
  var args = [];  // store all arguments here
  function curried() { // the curried function
    args = args.concat(Array.prototype.slice.call(arguments));
    if (arity <= args.length) {
      return fn.apply(null, args); // call the function with all the arguments
    }
    return curried; // otherwise return the curried function to be given more arguments
  }
  return curried;
}



function curry1(targetfn) {
  var numOfArgs = targetfn.length;
  return function fn() {
    if (arguments.length < numOfArgs) {
      return fn.bind(null, ...arguments);
    } else {
      return targetfn.apply(null, arguments);
    }
  }
}


function curry2 (targetfn) {
  var numOfArgs = targetfn.length;
  if (arguments.length - 1 < numOfArgs) {
    return curry2.bind(null, ...arguments);
  } else {
    return targetfn.apply(null, Array.prototype.slice.call(arguments, 1));
  }
}


var example = (a, b, c) => a + b + c;

console.log(curry(example)(1)(2));    // => function
console.log(curry(example)(1, 2));    // => function
console.log(curry(example)(1)(2)(3)); // => 6
console.log(curry(example)(1)(2, 3)); // => 6
console.log(curry(example)(1, 2)(3)); // => 6
console.log(curry(example)(1, 2, 3)); // => 6

console.log(curry1(example)(1)(2));    // => function
console.log(curry1(example)(1, 2));    // => function
console.log(curry1(example)(1)(2)(3)); // => 6
console.log(curry1(example)(1)(2, 3)); // => 6
console.log(curry1(example)(1, 2)(3)); // => 6
console.log(curry1(example)(1, 2, 3)); // => 6

console.log(curry2(example)(1)(2));    // => function
console.log(curry2(example)(1, 2));    // => function
console.log(curry2(example)(1)(2)(3)); // => 6
console.log(curry2(example)(1)(2, 3)); // => 6
console.log(curry2(example)(1, 2)(3)); // => 6
console.log(curry2(example)(1, 2, 3)); // => 6


