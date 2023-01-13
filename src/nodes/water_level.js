module.exports = function(RED) {
   function WaterLevelNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       node.on("input", function(msg) {
         let wlObj = {"sd":"wl"};
         wlObj.val = (config.level !== "")  ? config.level : 100;
         if (msg.sipControl !== undefined) {
             if ("waterLevel" in msg.sipControl) { 
                 if (typeof msg.sipControl.waterLevel === 'number') {
                    wlObj.val = msg.sipControl.waterLevel;
                 }
             }
         } else if (typeof msg.payload === "object") {
            if ("waterLevel" in msg.payload) { 
                if (typeof msg.payload.waterLevel === 'number') {
                    wlObj.val = msg.payload.waterLevel;
                  }
             }
           }
         msg.payload = wlObj;
         node.send(msg);
       });
   }
   RED.nodes.registerType("sip-water-level", WaterLevelNode);
};