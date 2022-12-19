
delay = require("nodes/rain-delay");
once = require("nodes/run-once");
now = require("nodes/run-now");
stop = require("nodes/stop-all");

module.exports = function(RED){
	RED.nodes.registerType('delay', delay.DelayNode);
	RED.nodes.registerType('once', once.RunOnceNode);
	RED.nodes.registerType('now', now.RunNowNode);
	RED.nodes.registerType('stop', now.StopAllNode);

}