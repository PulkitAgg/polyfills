class PubSub {
    constructor() {
        this.observers = {};
    }
    
    subscribe(eventType, callback) {
        if(!this.observers[eventType]) {
            this.observers[eventType] = [];
        }
        let index = this.observers[eventType].length;
        this.observers[eventType][index] = callback;
        
        return {
            unsubscribe: () => {
                this.observers[eventType].splice(index, 1);
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
    console.log("a d1", d);
})
b1 = pubsub.subscribe("b", (d) => {
    console.log("b d1", d);
})


pubsub.publish("a", 1);
pubsub.publish("b", 1);
a2 = pubsub.subscribe("a", (d) => {
    console.log("a d2", d);
})

b2 = pubsub.subscribe("b", (d) => {
    console.log("b d2", d);
})

pubsub.publish("a", 2);
pubsub.publish("b", 2);
a1.unsubscribe();
pubsub.publish("a", 3);
pubsub.publish("b", 3);

