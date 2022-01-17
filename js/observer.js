let handlers = [
    {
        event: "test",
        callback: () => { console.log("test") }
    }
]; // observers

function notify(eventName) {
    for (let handler of handlers) {
        if (handler.event === eventName) {
            handler.callback();
        }
    }
}