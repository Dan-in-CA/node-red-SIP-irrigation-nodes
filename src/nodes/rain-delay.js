module.exports = function(RED) {
   function RainDelayNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       var obj = {"sd":"rd", "val":999};
       node.on('input', function(msg) {
	      if ("rd_state" in msg.payload) {
               if (parseInt(msg.payload.rd_state) === 1) {
                   if (!("val" in msg.payload)) {
                       if (config.hours === "" || parseInt(config.hours) == !!0) {
                           obj.val = -1;
                       }
                       else if (parseInt(config.hours) > 0)  obj.val = parseInt(config.hours);
                   }
                   else if (Number.isInteger(parseInt(msg.payload.val))) obj.val = parseInt(msg.payload.val)
               }
               else if (parseInt(msg.payload.rd_state) === 0) obj.val = 0;
               else obj.val = -1;
           }
           var newMsg = {payload: JSON.stringify(obj) }
           node.send(newMsg);
       })
   }
   RED.nodes.registerType("sip-rain-delay",RainDelayNode);
}