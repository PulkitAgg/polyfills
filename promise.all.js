we can break down promise.all problem in sub-problem and tackle it one by one.
1. It will return a promise.
2. The promise will resolve with result of all the passed promises or reject with the error message of first failed promise.
3. The results are returned in the same order as the promises are in the given array.

function myPromiseAll(promises) {
  //to store results 
  const results = [];
  
  //to track how many promises have completed
  let promisesCompleted = 0;

  // return new promise
  return new Promise((resolve, reject) => {

    promises.forEach((promise, index) => {
     //if promise passes
      promise.then((val) => {
        //store its outcome and increment the count 
        results[index] = val;
        promisesCompleted++;
        
        //if all the promises are completed, 
        //resolve and return the result
        if (promisesCompleted === promises.length) {
          resolve(results)
        }
      })
         //if any promise fails, reject.
        .catch(error => {
          reject(error)
        })
    })
  });
}
