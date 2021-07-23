const fs = require("fs");
module.exports.config = {
name: "Chill",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Chill",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Chill")==0 || (event.body.indexOf("chill")==0)) {
		var msg = {
				body: "down",
				attachment: fs.createReadStream(__dirname + `/noprefix/cu_chill_thoi_chillies_official_music_video_ft_suni_ha_linh_rhymastic_-8680145560311963882.mp3`)
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}