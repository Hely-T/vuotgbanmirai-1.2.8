const fs = require("fs");
module.exports.config = {
name: "lol",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "lol",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("lol")==0 || (event.body.indexOf("Lol")==0)) {
		var msg = {
				body: "Có cái l",
				attachment: fs.createReadStream(__dirname + `/noprefix/lol.mp4`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}