##Features
find services in the network 
registers location/function of services

##Componenets
storage - leveldb
Discovery/messaging - cote

node = { key: pattern/function, value: location }

##Processes


Start()
    Register()
        load local registry
        find peers
        remove old/broken peers

        





service sends 'need' request

send need.pattern request into network
if response from network == {name, location}, respond to service with {name, location}
NOTE: {name, location} is the id for the remote service node that meets the needs of the service attached to this registry.


REGISTERY SIDE
subscribe to needs from service namespace
if unable to subscribe, retry until found or timeout

need = {pattern: 'name.type', status: 'met' | 'unmet'}

if status === met then return stop_requesting


SERVICE SIDE
load needs.json
publish needs, under service namespace
load config.json
attempt to connect to needed services, 
if unable to connect or messages below threshold, update needs.status = 'unmet'



request - ask for a copy of a peer's remote registry
response - respond to peer's request for copy of local registry