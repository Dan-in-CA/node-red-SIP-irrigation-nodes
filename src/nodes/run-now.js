module.exports = function(RED) {
   function RunNowNode(config) {
       RED.nodes.createNode(this, config);
       const node = this;
       node.on("input", function(msg) {
           let runObj = {"runProg":""};
           if (msg.sipControl !== undefined) {
             if ("runProgram" in msg.sipControl) {
               if (msg.sipControl.runProgram === true) {
                 runObj.runProg = config.program;
               } else {
                   runObj.runProg = msg.sipControl.runProgram;
                 }
             }
           } else if (typeof msg.payload === "object") {
               if ("runProgram" in msg.payload) {
                 if (msg.payload.runProgram === true) {
                    runObj.runProg = config.program;
                 } else {
                    runObj.runProg = msg.payload.runProgram;
                   }
               }
             }
           msg.payload = runObj;
           node.send(msg);
        });
   }
   RED.nodes.registerType("sip-run-now", RunNowNode);
};