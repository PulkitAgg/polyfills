Debounce - Debounce function limits the execution of a function call and waits for a certain amount of time before running it again.
Debouncing is a technique where we can monitor the time delay of user action and once that delay reaches our predetermined threshold we can can make the function call.

Use in-> In search bar or on change event
Not Use in -> we we cannot use debouncing in shooting game scenario or browser resizing or onScroll events.

const debounce = (func, delay) => {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    }
}

function expensive(){
  console.log("I am expensive");
}

// Use expensive function like below
<input
className="search-bar"
onChange={debounce(expensive, 500)}
/>
window.addEventListener("scroll", debounce(expensive, 500));
