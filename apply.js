Function.prototype.myApply = function (obj, args) {
  let func = this;
  return func.call(obj, ...args);
}

// If we don't want to use call method
Function.prototype.customApply = function (obj = {}, args) {
  obj.func = this;
  return obj.func(...args);
}

// Way to check
let name = { firstName: "Pulkit", lastName: "Aggarwal"}
function fullName(first, second) {
  console.log(this.firstName + " " + this.lastName + " " + first + " " + second);
}

fullName.myApply(name, ["Hello", "World"]);
                               
fullName.customApply(name, ["Hello", "World"]);
