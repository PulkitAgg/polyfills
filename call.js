Function.prototype.myCall = function (obj, ...args) {
  let func = this;
  return func.apply(obj, args);
}

// If we don't want to use apply method
Function.prototype.customCall = function (obj = {}, ...args) {
  obj.func = this;
  return obj.func(...args);
}

// Way to check
let name = { firstName: "Pulkit", lastName: "Aggarwal"}
function fullName(first, second) {
  console.log(this.firstName + " " + this.lastName + " " + first + " " + second);
}

fullName.myCall(name, "Hello", "World");
                               
fullName.customCall(name, "Hello", "World");
