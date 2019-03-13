const storage = require('./storage')
const remote = require('./remote')

// Registry service global status that it updates depending on current action

class Registry {
    constructor() {
        this.store = new storage.TempStorage() // TODO build this as default option, but able to be overwriten
        this.status = {name: '', timestamp:0 , status: ''}
        this.remote = new remote.coteRemote()
    }

    start(registry, peers) {
        updateStatus('starting')
    }
    handleStatus (status) {
        if (status === 'updating') return false
        else if (status === 'finding') return false
        else if (status === 'starting') return false
        else if (status === 'ready') return true
    }
    updateStatus (status) {
        this.status.timestamp = Date.now()
        this.status.name = ''
        this.status.status = status
    }
    checkPattern (pattern) {
        if(!pattern) return 'invalid pattern'
        if(typeof pattern !== 'string') return 'pattern must be string'
        return true
    }
    findService (pattern, msg) {
        updateStatus('finding')
        // give me a pattern, this will find a service that produces it and return it's location
        let local = this.store.checkStore(pattern)
        if (local) {
            updateStatus('ready')
            return local.location
        }
        let remote = this.remote.checkRemote(pattern, msg => msg)
        if(remote) {
            updateStatus('ready')
            return remote.location
        }
        updateStatus('ready')
        return false
    }
}

new Registry().start()