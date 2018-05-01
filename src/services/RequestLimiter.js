class RequestLimiter {
    constructor(delay = 1, callbackEmptyQueue) {
        this.delay = delay
        this.requests = []
        this.id = 1
        this.interval = this.run()
        this.emptyQueueCallback = {
            callback: callbackEmptyQueue,
            run: false
        };
    }

    push(request, args, callback) {
        this.requests.push({
            id: this.id++,
            request: request,
            args: args,
            callback: callback,
            pending: false
        })
    }

    run() {
        return setInterval(() => {
            const request = this.requests.find(request => !request.pending)

            if(request) {
                request.pending = true
                request.request.call(request.request, request.args)
                    .then((response) => {
                        const id = request.id
                        const index = this.requests.findIndex(request => request.id == id)
                        this.requests.splice(index, 1)
                        request.callback.call(request.callback, response)

                        //after send first request empty queue callback can be started
                        this.emptyQueueCallback.run = true
                    })
            } else {
                if(this.emptyQueueCallback.run)
                    this.emptyQueueCallback.callback();
            }
        }, this.delay)
    }

    stop() {
        clearInterval(this.interval)
    }
}

module.exports = RequestLimiter;