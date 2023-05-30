module.exports = function(RED) {
   function RainDelayNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       let curState = null;
       let msgState = null;
       let stateMsg = {};
       node.on("input", function(msg) {
           let rdObj = {"sd":"rd"};         
           if (config.hours) {
             rdObj.val = config.hours;
           } else {
             rdObj.val = 0;
           }         
           
           if (typeof(msg.payload) === "boolean") { // from node-red switch
             if (msg.payload == false && curState !== false) {
               curState = false;
               rdObj.val = 0;
               msg.payload = rdObj;
               node.send([msg, null]);                         
             }else if (msg.payload === true && curState !== true) {
               curState = true;
               //rdObj.val = 1;
               msg.payload = rdObj;
               node.send([msg, null]);            
              }
                   
           } else if (typeof(msg.payload) === "object") {               
	         if ("rainDelay" in msg.payload) { // from other node-red node
	           rdObj.val = parseInt(msg.payload["rainDelay"])
	           if (!!rdObj.val === false && curState !== false) {
		         curState = false;
		         stateMsg.payload = curState
		         msg.payload = rdObj;
	             node.send([msg, stateMsg]);     
               }
               else if (!!rdObj.val === true && curState !== true) {
		         curState = true;
		         msg.payload = rdObj;
		         stateMsg.payload = curState
	             node.send([msg, stateMsg]);     
               }
               
	         } else if ("rd_state" in msg.payload) { // from Python side
               msgState = !!Number(msg.payload["rd_state"])
               if (msgState !== curState){
                 curState = msgState
                 stateMsg.payload = curState
                 node.send([null, stateMsg]);
               }
             }
           } else { // from any other input from a node (pass through)
               msg.payload = rdObj
               node.send([msg, null]);
             }
       })
   }
   RED.nodes.registerType("sip-rain-delay",RainDelayNode);
};
