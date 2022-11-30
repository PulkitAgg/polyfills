class PubSub {
    constructor() {
        this.observers = {};
    }
    
    subscribe(eventType, callback) {
        if(!this.observers[eventType]) {
            this.observers[eventType] = [];
        }
        this.observers[eventType].push(callback);
        return {
            unsubscribe: () => {
                this.observers[eventType] = this.observers[eventType].filter(fn => fn !== callback);
            }
            
        }
    }
    
    publish(eventType, data) {
        for(let cb of this.observers[eventType]) {
            cb(data);
        }
    }
}

let pubsub = new PubSub();
a1 = pubsub.subscribe("a", (d) => {
    console.log("a1", d);
})
b1 = pubsub.subscribe("b", (d) => {
    console.log("b1", d);
})


pubsub.publish("a", 1);
pubsub.publish("b", 1);
a2 = pubsub.subscribe("a", (d) => {
    console.log("a2", d);
})

b2 = pubsub.subscribe("b", (d) => {
    console.log("b2", d);
})

pubsub.publish("a", 2);
pubsub.publish("b", 2);

a3 = pubsub.subscribe("a", (d) => {
    console.log("a3", d);
})

b3 = pubsub.subscribe("b", (d) => {
    console.log("b3", d);
})

a2.unsubscribe();
a3.unsubscribe();
pubsub.publish("a", 3);
pubsub.publish("b", 3);
