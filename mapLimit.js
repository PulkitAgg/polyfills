// Question Link: https://devtools.tech/questions/s/how-to-implement-custom-map-function-with-limit-on-number-of-operations-or-javascript-interview-questions-or-frontend-problem-solving---qid---ZVNw2lUMguEZIsnvzjC1

// Question
function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;
  setTimeout(() => {
    callback("User" + id)
  }, randomRequestTime);
}

// First Solution
function mapLimit(inputs, limit, iterateeFn, callback) {
  // write your solution here
    let result = [];
  let len = inputs.length;
  let count = 0;
  let index = 0;
  while(index < limit) {
    procesdFn(index);
    index++;
  }
  
  function procesdFn(i) {
    if(i >= len) {
      return;
    }
    iterateeFn(inputs[i], (data) => {
      count++;
      result[i] = data;
      if(count == len) {
        callback(result);
      } else if(i >= len) {
        return;
      } else {
        procesdFn(index);
        index++;
      }
    })
  }
}

// Second Solution
function mapLimit(inputs, limit, iterateeFn, callback) {
  // write your solution here
  let index = 0;
  let output = [];
  let count = 0;
  while (index < limit) {
    ((i) => iterateeFn(inputs[index], (data) => procedCallback(i, data)))(
      index
    );
    index++;
  }

  function procedCallback(i, data) {
    output[i] = data;
    count++;
    output.push(data);
    if (count === inputs.length) {
      callback(output);
    } else if (index >= inputs.length) {
      return;
    }
    ((i) => iterateeFn(inputs[index], (data) => procedCallback(i, data)))(
      index
    );
    index++;
  }
}

mapLimit([1,2,3,4,5], 2, getUserById, (allResults) => {
  console.print('output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
})
