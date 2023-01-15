module.exports = function(RED) {
   function ProgCntlNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
           node.on("input", function(msg) {
               let swObj = {};
               let pLst = config.program.split(/[,]{1}[\s]?/);
               swObj.prog = pLst;
               config.state == "off" ? (swObj.set = 0) : (swObj.set = 1);
               swObj.end = config.end | 0;
               if (msg.sipControl !== undefined) {
                   if (typeof(msg.sipControl) === "object") {
                     if ("program" in msg.sipControl) {
                         swObj.prog = msg.sipControl.program;
                     }
                     if ("set" in msg.sipControl) {
                       swObj.set = msg.sipControl.set;
                     }
                     if ("end" in msg.sipControl) {
                       swObj.end = msg.sipControl.end;
                     }
                   }
                }
               else if (typeof(msg.payload) === "object") {
                   if ("program" in msg.payload) {
                     swObj.prog = msg.payload.prog;
                   }
                   if ("set" in msg.payload) {
                     swObj.set = msg.payload.set;
                   }
                   if ("end" in msg.payload) {
                     swObj.end = msg.payload.end;
                   }
               }
           msg.payload = swObj;
           node.send(msg);
           });
   }
   RED.nodes.registerType("sip-prog-cntl", ProgCntlNode);
};