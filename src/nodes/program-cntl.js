module.exports = function(RED) {
   function ProgCntlNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;      
           node.on('input', function(msg) {       
               let swObj = {};
               let pLst = config.program.split(/[,]{1}[\s]?/);
               swObj.prog = pLst;
               config.state == "off" ? swObj.set = 0 : swObj.set = 1;
               swObj.end = config.end | 0;               
               if (typeof(msg.payload) === "object") {
                   if ("prog" in msg.payload) swObj.prog = msg.payload.prog;
                   if ("set" in msg.payload) swObj.set = msg.payload.set;
                   if ("end" in msg.payload) swObj.end = msg.payload.end;
               } 
           msg.payload = swObj;
           node.send(msg);   
           });
   }     
   RED.nodes.registerType("sip-prog-cntl", ProgCntlNode);
} 