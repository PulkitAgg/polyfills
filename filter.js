Array.prototype.myFilter= function(callback) {
    let result = [];
    for(let i = 0; i < this.length; i++) {
        if(callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
}

let arr = [1,2,3,4,5,6];
let res1 = arr.myFilter(a => a % 2== 0);
console.log("res1 ", res1);
