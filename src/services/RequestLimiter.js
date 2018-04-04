class RequestLimiter {
    constructor(delay = 1) {
        this.delay = delay
        this.requests = []
        this.id = 1
        this.interval = this.run()
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
                request.request.apply(request.request, request.args)
                    .then(request.callback)
                    .catch(err => (
                        console.log(err)
                    ))

                console.log("send " + request.id + "; all: " + this.id);
            }
        }, this.delay)
    }

    stop() {
        clearInterval(this.interval)
    }

    /*
    todo:
    - głowny setInterval
    - tablica z requestami
    - przekazanie collback

    Uruchamiam metoda dopowiednia do ktorej w parametrze wysyłam ajaxa. Ona dodaje go na stos i request czeka na swoj czas wykonania. J
     */
}

module.exports = RequestLimiter;