import { builtinModules } from "module";

class Storage {
    constructor() {

    }
}

class TempStorage extends Storage {
    constructor(){
        this.store = []
    }

    checkStore (key) {
        this.store.map(entry => key === entry.key ? entry.value : false)
    }
    addEntry(key, value) {
        this.store.push({pattern: key,location: value})
    }
    removeEntry(key) {
        let filtered = this.store.filter(entry => entry.pattern === key ? true : false )
        this.store = filtered
    }
}

module.exports ={
    Storage : Storage,
    TempStorage : TempStorage
}