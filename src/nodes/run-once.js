module.exports = function(RED) {
   function RunOnceNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;     
       node.on('input', function(msg) {    
           var roObj = JSON.parse('{"ro":[' + msg.payload + ']}');
           roObj.preempt = config.preempt | 0
           msg.payload = roObj;
           node.send(msg);
       })
   }    
   RED.nodes.registerType("sip-run-once", RunOnceNode);
}  