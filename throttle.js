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
