/*module.exports = function(RED) {
   function RainDelayNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       node.on('input', function(msg) {
       	   let rdObj = {"sd":"rd"};
       	   if (config.hours === "") {
               rdObj.val = 0;
           }
       	   else {
       	       rdObj.val = config.hours;
       	   }
           if (msg.sipControl !== undefined) {
               if ("rd_state" in msg.sipControl) {
                   rdObj.val = msg.sipControl.rd_state;
               }
           }
           else if (typeof msg.payload === "object") {
               if ("rd_state" in msg.payload) {
                   rdObj.val = msg.payload.rd_state;
                  if (parseInt(msg.payload.rd_state) === 1) {                    
                       if (!("val" in msg.payload)) {
                           if (config.hours === "" || parseInt(config.hours) == !!0) {
                               rdObj.val = -1;
                           }
                       //else if (parseInt(config.hours) > 0)  rdObj.val = parseInt(config.hours);
                       }
                       else if (Number.isInteger(parseInt(msg.payload.val))) {
                           rdObj.val = parseInt(msg.payload.val);
                       }
               }
                   
               /*else if (parseInt(msg.payload.rd_state) === 0) {
                   rdObj.val = 0;
               }
               
               else {
                   rdObj.val = -1;
               }
           }
       msg.payload = rdObj;
       node.send(msg);
       });
   }    
   RED.nodes.registerType("sip-rain-delay",RainDelayNode);
};*/


module.exports = function(RED) {
   function RainDelayNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       var obj = {"sd":"rd", "val":999};
       node.on('input', function(msg) {
	      if ("rd_state" in msg.payload) {
               if (parseInt(msg.payload.rd_state) == 1) {
                   if (!("val" in msg.payload)) {
                       if (config.hours == "" || parseInt(config.hours) == !!0) {
                           obj.val = -1;
                       } else if (parseInt(config.hours) > 0)  {
                           obj.val = parseInt(config.hours);
                         }
                   } else if (Number.isInteger(parseInt(msg.payload.val))) {
                       obj.val = parseInt(msg.payload.val)
                     }
               } else if (parseInt(msg.payload.rd_state) == 0) 
                   {obj.val = 0;
                 }
               else obj.val = -1;
           }
         var newMsg = {payload: JSON.stringify(obj) }
         node.send(newMsg);
       })
   }
   RED.nodes.registerType("sip-rain-delay",RainDelayNode);
}
