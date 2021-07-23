module.exports.config = {
    name: "adbot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SpermLord",
    description: "thông tin adbot",
    commandCategory: "Info",
    usages: "adbot",
    cooldowns: 5,
    dependencies: ["axios","cheerio"]
};

module.exports.run = ({ event, api }) => api.sendMessage(`==Giới Thiệu Về Admin==\n👀Tên Admin: Hà Mạc Trường Giang\n \n===============\n🤖UID admin: 626463485\n \n🤖Momo: 0911023689\n===============\n✍️Link FB Admin: https://www.facebook.com/TGGamer24\n \n✍️MB Bank: 909110663999`, event.threadID, event.messageID);