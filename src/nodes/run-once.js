module.exports = function(RED) {
   function RunOnceNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;     
       node.on('input', function(msg) {    
           var roObj = JSON.parse('{"ro":[' + msg.payload + ']}');
           if (!config.preempt) {
               roObj.preempt = 0;
           }
           else {
               roObj.preempt = 1;
           }
           msg.payload = roObj;
           node.send(msg);
       })
   }    
   RED.nodes.registerType("sip-run-once", RunOnceNode);
}  