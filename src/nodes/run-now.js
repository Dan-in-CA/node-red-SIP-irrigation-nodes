module.exports = function(RED) {
   function RunNowNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;      
       node.on('input', function(msg) {       
           if ("runNow" in msg.payload) {
               if (msg.payload.runNow === true) {
                  var runObj = JSON.parse('{"run":' + config.program + '}'); 
               }
               else var runObj = JSON.parse('{"run": "' + msg.payload.runNow + '"}');
           }                
           else {
               var runObj = "Error invalid input"
           }        
           msg.payload = runObj;
           node.send(msg);
       });
   }   
   RED.nodes.registerType("sip-run-now", RunNowNode);
}       