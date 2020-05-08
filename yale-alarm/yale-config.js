module.exports = function (RED) {

    const yalealarm = require('yalealarmsystem');

    var localUserCache = {};

    RED.nodes.registerType("yale-config", YaleConfigNode, {
        name: {type: "text"},
        credentials: {
            email: {type: "text"},
            password: {type: "password"}
        },
        access_token: {value: "", type: "text"}
    });

    function YaleConfigNode(node) {
        RED.nodes.createNode(this, node);
        this.name = node.name

        if (this.credentials.email &&
            this.credentials.password) {

        	yalealarm.getAccessToken(this.credentials.email, this.credentials.password)
            .then((access_token) => {
            	this.access_token = access_token;
			})
			.catch(err => {
	            console.log(`yalealarmsystem.getAccessToken returned err:`, err);
	            console.log(`tried using ${this.credentials.email}`);
			})
        }
    }
};