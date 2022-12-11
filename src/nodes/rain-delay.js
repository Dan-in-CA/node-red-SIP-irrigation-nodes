module.exports = function(RED) {
    function RainDelayNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        var obj = {"sd":"rd", "val":0};
        node.on('input', function(msg) {
	        if ("rd_state" in msg.payload) {
	           if (msg.payload.rd_state == "1" 
	           	   && parseInt(config.hours) > 0) {
	             obj.val = parseInt(config.hours);
	           }
	           
	           else if ("val" in msg.payload) { // pass through
	           node.send(msg)
	           }
	           
	           else if (msg.payload.rd_state == "0") {
	             obj.val = 0;
	           } 
            }                         
            //if (Number.isNaN(obj.val)) obj.val = 0;
            var newMsg = {payload: JSON.stringify(obj) }        
            node.send(newMsg);
        })
    }
    RED.nodes.registerType("sip-rain-delay",RainDelayNode);
}