module.exports.config = {
    name: "adminbot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "dangkhoa",
    description: "Thông tin về admin",
    commandCategory: "Admin",
    usages: "adminbot",
    cooldowns: 5,
    dependencies: ["request"],
};

module.exports.handleEvent = ({ api, event, args }) => {
    const request = require("request");
    if (!args[0] || typeof parseInt(args[0]) !== "number") return api.sendMessage(`\n★Thông Tin Admin Bot Này★\nADMIN NAME : HÀ MẠC TRƯỜNG GIANG\nBiệt Danh: Yangg ~~\nGiới Thiệu: Nhà anh không có gì ngoài nợ ngân hàng 10 tỉ\nI Have Something To You\nI Love You\nTính Cách : Cái gì cái chứ trêu gái là nhanh nhất nhé OwO\nChiều cao : 1m83\nSinh ngày : 15/11/2001\nLiên hệ:+84911023689 \nInstagram: Yang._.24\nTikTok: Yang._.24\nSở Thích: Thích chơi game, trêu gái\nCân nặng: 57kg\nID FACEBOOK : 626463485\nName ID : Hà Mạc Trường Giang \nLink Facebook : https://www.facebook.com/DVFB.HMTG2\nVài lời tới người dùng BOT: Vui lòng không spam khi sử dụng để tránh die bot. Cảm ơn mọi người đã sử dụng đên con bot của mình.\nLưu ý : Đừng có dại dột mà add 2 bot kẻo bị phát hiện là bạn toang đó <3\nCảnh báo : Vui lòng không dùng bot với mục đích xấu hay cố ý report acc facebook\nChúc bạn sử dụng vui vẻ <3\n=== Hà Mạc Trường Giang ===`, event.threadID, event.messageID);
    return request(`https://nhentai.net/api/gallery/${parseInt(args[0])}`, (error, response, body) => {
        var codeData = JSON.parse(body);
        if (codeData.error == true) return api.sendMessage(getText('cantFindHentai'), threadID, messageID);
        const title = codeData.title.pretty;
        var tagList = [],
            artistList = [],
            characterList = [];
        codeData.tags.forEach(item => (item.type == "tag") ? tagList.push(item.name) : (item.type == "artist") ? artistList.push(item.name) : (item.type == "character") ? characterList.push(item.name) : '');
        var tags = tagList.join(', ');
        var artists = artistList.join(', ');
        var characters = characterList.join(', ');
        if (characters == '') characters = 'Original';
        api.sendMessage(`» Tên: ${title}\n» Tác giả: ${artists}\n» Nhân vật: ${characters}\n» Tags: ${tags}\n» Liên kết: https://nhentai.net/g/${args[0]}`, event.threadID, event.messageID);
    });
}