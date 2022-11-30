Throttle -> Throttling is a technique, to limit the execution of an event handler function, even when this event triggers continuously due to user actions. (ex: browser resizing)
Throttling is a technique where we make the function call in a predetermined time interval irrespective of continuous user actions.

Use in -> button click, shooting game scenario or browser resizing or onScroll events.
Not Use in -> search bar

function throttle (fn, limit) {
    var waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            fn.apply(this, arguments);        // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}



Problem: Implement a throttler that executes an array of tasks. When the throttler is passed a number, only execute that number of the tasks and passes the other tasks into a queue.
Question Link: https://stackoverflow.com/questions/49826332/simple-task-runner-in-javascript-with-waiting?rq=1

class Runner {
  constructor(concurrent) {
    this.taskQueue = []; //this should have "concurrent" number of tasks running at any given time

  }

  push(task) {
    /* pushes to the queue and then runs the whole queue */
  }
}


Solution:
class Runner {
  constructor(concurrent) {
    this.taskQueue = [];
    this.concurrent = concurrent;
    this.runningCount = 0;
  }

  push(task) {
    this.taskQueue.push(task);
    this.run();
  }
  
  run() {
      while(this.runningCount < this.concurrent && this.taskQueue.length) {
          this.runningCount++;
          const task = this.taskQueue.shift();
          task(() => {
              this.runningCount--;
              this.run();
          });
      }
  }
}

let runner = new Runner(5);

function task(id) {
    return function(cb) {
        console.log("id ", id);
        setTimeout(() => {
            cb();
        }, 500);
    }
}

runner.push(task(1));
runner.push(task(2));
runner.push(task(3));
runner.push(task(4));
runner.push(task(5));
runner.push(task(6));
runner.push(task(7));
runner.push(task(8));
runner.push(task(9));
runner.push(task(10));
runner.push(task(11));
runner.push(task(12));
