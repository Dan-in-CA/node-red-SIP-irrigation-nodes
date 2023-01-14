module.exports = function(RED) {
   function RunOnceNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       node.on('input', function(msg) {
       	 let roObj = {}
       	 if (!config.preempt) {
       	   roObj.preempt = 0
       	 }
         if (config.runOnce !== "") {
           let roLst = config.runOnce.split(/(?<=\])[,]{1}[\s]?/);
           roLst = roLst.map((item) => JSON.parse(item));
           roObj.ro = roLst;
         }
         if (msg.sipControl !== undefined) {
           if ("runOnce" in msg.sipControl) {
             roObj.ro = msg.sipControl.runOnce;
           }
           if ("preempt" in msg.sipControl) {
             roObj.preempt = msg.sipControl.preempt;
           }              
         }
         if (typeof(msg.payload) === "object") {
           if ("runOnce" in msg.payload) {
             roObj.ro = msg.payload.runOnce;
           }
          if ("preempt" in msg.payload) {
            roObj.preempt = msg.payload.preempt;
          }        
         }
         msg.payload = roObj;
         node.send(msg);
       })
   }
   RED.nodes.registerType("sip-run-once", RunOnceNode);
};