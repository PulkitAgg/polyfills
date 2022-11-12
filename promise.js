// Reference:  https://dev.to/vijayprwyd/polyfill-for-promises-1f0e
function myPromise(executor) {
    let onResolve, onReject;
    let isFullfilled = false, isRejected = false;
    let called = false, value;
    
    function resolve(data) {
        isFullfilled = true;
        value = data;
        if(typeof onResolve === "function") {
            onResolve(data);
        }
    }
    
    function reject(err) {
        isRejected = true;
        value = err;
        if(typeof onReject === "function") {
             onReject(err);
        }
    }
    
    this.then = function(callback) {
        onResolve = callback;
        if(isFullfilled && !called) {
            called = true;
            onResolve(value);
        }
        return this;
    }
    
    this.catch = function(callback) {
        onReject = callback;
        if(isRejected && !called) {
            called = true;
            onReject(value);
        }
        return this;
    }
    if(typeof executor === "function") {
        executor(resolve, reject);
    }
    
}

myPromise.resolve = (data) => {
    return new myPromise((res, rej) => res(data));
}

myPromise.reject = (err) => {
    return new myPromise((res, rej) => rej(err));
}

myPromise.all = (promises) => {
    let result = [], len = 0;
    return new myPromise((resolve, reject) => {
        promises.map((promise, index) => {
            promise.then(res => {
                result[index] = res;
                len++;
                if(len === promises.length) {
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        })
    })
}


// 1
new myPromise((res, rej) => {
    setTimeout(() => {
        res(1);
    }, 1000);
}).then(data => {
    console.log("data in async", data);
    return data;
}).catch(err => {
    console.log("err in async", err);
});


// 2
new myPromise((res, rej) => res(2)).then(data => {
    console.log("data in async but with sync operation-", data);
});


//3
myPromise.resolve(3).then(data => {
    console.log("data in direct resolve-", data);
});


//4 
new myPromise((res, rej) => {
    setTimeout(() => {
        rej(4);
    }, 1000);
}).then(data => {
    console.log("data in async", data);
    return data;
}).catch(err => {
    console.log("err in async", err);
});


// 5
new myPromise((res, rej) => rej(5)).then(data => {
    console.log("data in async but with sync operation-", data);
}).catch(err => {
    console.log("err in async but with sync operation-", err);
});


// 6
myPromise.reject(6).then(data => {
    console.log("data in  direct resolve-", data);
}).catch(err => {
    console.log("err in direct resolve-", err);
})


// 7
a = new Promise((res, rej) => res(1))
b = new Promise((res, rej) => res(2))
c = new Promise((res, rej) => res(3))
d = new Promise((res, rej) => res(4))
myPromise.all([a,b,c,d]).then(d => console.log("data in chaining",d)).catch(err => console.log("err in chaining,", err))



