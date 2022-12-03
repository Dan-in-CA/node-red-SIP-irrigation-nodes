
let delay = require("nodes/rain-delay");

module.exports = function(RED){
	RED.nodes.registerType('delay', delay.DelayNode);

}