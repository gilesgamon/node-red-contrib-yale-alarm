module.exports = function (RED) {

    const yalealarm = require('yalealarmsystem');

    function setStatusNode(config) {
        RED.nodes.createNode(this, config);

        this.yaleConfig = RED.nodes.getNode(config.yaleConfig);
        if (this.yaleConfig) {
            const node = this;
            node.on('input', async (msg, send, done) => {
                yalealarm.setStatus(node.yaleConfig.access_token, msg.payload.state)
                .then(alarmStatus => {
                    let msg = {
                        topic: "device",
                        payload: {
                            deviceId: this.device,
                            deviceType: "alarm",
                            state: alarmStatus
                        }
                    };

                    this.send(msg);
                })
                .catch(err => {
                    node.warn(`yalealarmsystem.setStatus returned err:`, err);
                })
            })
        } else {
            node.warn('No config defined');
        }
    }
    RED.nodes.registerType("set-state", setStatusNode);
};