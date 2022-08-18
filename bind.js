Function.prototype.myBind = function (obj, ...args) {
  let func = this;
  // Accepting arguments passed to newFunc
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
}

// If we don't want to use apply method
Function.prototype.customBind = function (obj = {}, ...args) {
  obj.func = this;
  return function (...newArgs) {
    obj.func(...args, ...newArgs);
  };
}

// Way to check
let name = { firstName: "Pulkit", lastName: "Aggarwal"}
function fullName(first, second) {
  console.log(this.firstName + " " + this.lastName + " " + first + " " + second);
}

fullName.myBind(name, "Hello", "World")();
fullName.myBind(name, "Hello")("World");
                               
fullName.customBind(name, "Hello", "World")();
fullName.customBind(name, "Hello")("World");
