const fs = require("fs");
module.exports.config = {
	name: "dark",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "dungkon", 
	description: "no prefix",
	commandCategory: "Không cần dấu lệnh",
	usages: "Địt mẹ mày",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("dark")==0 || (event.body.indexOf("Dark")==0)) {
		var msg = {
				body: "Dark cc",
				attachment: fs.createReadStream(__dirname + `/noprefix/dark.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}