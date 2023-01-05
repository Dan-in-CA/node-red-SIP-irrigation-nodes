module.exports = function(RED) {
   function SnCntlNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;      
           node.on('input', function(msg) {
               let swObj = {};
               let snLst = config.station.split(/[,]{1}[\s]?/);
               swObj.sn = snLst;
               config.state == "on" ? swObj.set = 1 : swObj.set = 0;
               swObj.preempt = config.preempt | 0;               
               if (typeof(msg.payload) === "object") {
                   if ("sn" in msg.payload) swObj.sn = msg.payload.sn;
                   if ("set" in msg.payload) swObj.set = msg.payload.set;
                   if ("preempt" in msg.payload) swObj.preempt = msg.payload.preempt;
               } 
           msg.payload = swObj;
           node.send(msg);   
           });
   }     
   RED.nodes.registerType("sip-station-cntl", SnCntlNode);
}         