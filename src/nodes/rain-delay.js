module.exports = function(RED) {
   function RainDelayNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       node.on("input", function(msg) {
           let rdObj = {"sd":"rd"};
           let stateMsg = {}
           if (config.hours) {
             rdObj.val = config.hours;
           } else {
             rdObj.val = 0;
           }         
           
           if (typeof(msg.payload) === "boolean") { // from node-red switch
             if (msg.payload === false) {
               rdObj.val = 0;
               msg.payload = rdObj
               node.send([msg, null]);               
             }else if (msg.payload === true) {
               msg.payload = rdObj
               node.send([msg, null]);
              }       
           } else if (typeof(msg.payload) === "object") {               
	         if ("rainDelay" in msg.payload) { // from other node-red node
	           rdObj.val = parseInt(msg.payload.rainDelay)
	           msg.payload = rdObj
               node.send([msg, null]);
	         } else if ("rd_state" in msg.payload) { // from Python side
               stateMsg.payload = !!+Number(msg.payload.rd_state)
               node.send([null, stateMsg]);
             }
           } else { // from any other input from a node
               msg.payload = rdObj
               node.send([msg, null]);
             }
       })
   }
   RED.nodes.registerType("sip-rain-delay",RainDelayNode);
};
