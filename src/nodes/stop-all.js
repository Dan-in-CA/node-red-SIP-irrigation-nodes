module.exports = function(RED) {
   function StopAllNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;      
           node.on('input', function(msg) {       
               msg.payload = {"stop-all": 1}
               node.send(msg);  
           });
   }     
   RED.nodes.registerType("sip-stop-all", StopAllNode);
}       