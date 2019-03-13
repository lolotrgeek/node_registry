const cote = require('cote')

class Remote {
    constructor(){

    }

}

class coteRemote extends Remote {
    constructor() {
        this.peers = []
        this.publisher = new cote.Publisher({name:'Registry Publisher', key:'registry'})
        this.subscriber = new cote.Subscriber({name:'Registry Subscriber', key:'registry'})
        this.requester = new cote.Requester({name: 'Registery Requester', key: 'pattern'})
        this.responder = new cote.Responder({name: 'Registry Responder', key: 'pattern'})
    }
    discover () {
        this.subscriber.on('cote:added', peer => {
            this.peers.push(peer)
            console.log(peer)
        })
        this.publisher.on('cote:added', peer => {
            this.peers.push(peer)
            console.log(peer)
        })
    } 
    checkRemote (pattern, msg) {
        this.requester.send(pattern, msg)
    }
    respondRemote (pattern, msg) {
        this.responder.on(pattern, msg)
    }
}

module.exports = {
    Remote : Remote,
    coteRemote  : coteRemote
}