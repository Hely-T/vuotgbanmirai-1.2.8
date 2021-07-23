module.exports.config = {
	name: "pay",
	version: "0.0.1",
	hasPermssion: 2,
	credits: "Dung UwU",
	description: "pay",
	commandCategory: "Economy",
	usages: "pay [coins]",
  cooldowns: 5,
};

module.exports.run = async ({ event, api, Currencies, args, __GLOBAL }) => {
	let { contentMessage, threadID, messageID, senderID } = event;
	const coins = parseInt(args[0])
	const mention = Object.keys(event.mentions)[0];
	const moneyUser = (await Currencies.getData(mention)).money;
	return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[mention].replace(/@/g, "") + ` ${coins} coins`}, threadID, async () => {
             await Currencies.increaseMoney(mention, coins);}, messageID);
}