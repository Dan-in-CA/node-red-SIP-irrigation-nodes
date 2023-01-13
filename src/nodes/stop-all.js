module.exports = function(RED) {
   function StopAllNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
           node.on("input", function(msg) {
             stopObj = {"stopAll": 1};
             if (msg.sipControl !== undefined) {
               if ("stopStations" in msg.sipControl) {
                 msg.payload = stopObj;
               }
             } else if (typeof msg.payload === "object") {
                 if ("stopStations" in msg.payload) {
                   msg.payload = stopObj;
                 }
               }
             node.send(msg);
           });
   }
   RED.nodes.registerType("sip-stop-all", StopAllNode);
};