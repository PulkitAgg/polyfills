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


