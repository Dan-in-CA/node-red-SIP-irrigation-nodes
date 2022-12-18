module.exports = function(RED) {
   function RunNowNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;      
       node.on('input', function(msg) {       
           if (msg.payload == true) {
               //msg.payload = {"run":[node.config.program]}
               var runObj = JSON.parse('{"run":' + config.program + '}');
           }
           msg.payload = runObj;
           node.send(msg);
       })
   }   
   RED.nodes.registerType("sip-run-now", RunNowNode);
}       