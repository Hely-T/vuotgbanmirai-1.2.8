module.exports.config = {
	name: "antiout",
	version: "1.0.0",
	credits: "DungUwU",
	hasPermssion: 1,
	description: "Bật tắt antiout",
	usages: "antiout on/off",
    commandCategory: "system",
	cooldowns: 0
};

module.exports.run = async({ api, event, client, Threads, args, utils}) => {
	let settings = (await Threads.getData(event.threadID)).settings;
	switch(args[0]) {
		case "on": {
			settings["antiout"] = true;
			await Threads.setData(event.threadID, options = { settings });
			client.threadSetting.set(event.threadID, settings);
			api.sendMessage("Bật antiout thành công!!", event.threadID);
			break;
		}
		case "off": {
			settings["antiout"] = false;
			await Threads.setData(event.threadID, options = { settings });
			client.threadSetting.set(event.threadID, settings);
			api.sendMessage("Tắt antiout thành công!!", event.threadID);
			break;
		}

		default: {
			utils.throwError("antiout",event.threadID,event.messageID);
			break;
		}
	}
}