module.exports = function(RED) {
   function SnCntlNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
           node.on('input', function(msg) {
               let snObj = {"sn":""};
               if (config.station !== "") { 
                   let snLst = config.station.split(/[,]{1}[\s]?/);
                   snObj.sn = snLst;
               }
               config.state == "on" ? snObj.set = 1 : snObj.set = 0;
               snObj.preempt = config.preempt | 0;
               if (msg.sipControl !== undefined) {
                   if ("stationList" in msg.sipControl) {
                       snObj.sn = msg.sipControl.stationList;
                   }
                   if ("set" in msg.sipControl) {
                       snObj.set = msg.sipControl.set;
                   }
                   if ("preempt" in msg.sipControl) {
                       snObj.preempt = msg.sipControl.preempt;
                   }
               }            
               if (typeof(msg.payload) === "object") {
                   if ("stationList" in msg.payload) {
                       snObj.sn = msg.payload.stationList;
                   }
                   if ("set" in msg.payload) {
                       snObj.set = msg.payload.set;
                   }
                   if ("preempt" in msg.payload) {
                       snObj.preempt = msg.payload.preempt;
                   }
               } else if (typeof(msg.payload) === "string") {
                 stn = []
                 stn[0] = msg.payload;
                 snObj.sn = stn;            
               }
           msg.payload = snObj;
           node.send(msg);
           });
   }
   RED.nodes.registerType("sip-station-cntl", SnCntlNode);
}