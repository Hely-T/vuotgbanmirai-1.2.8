module.exports.config = {
    name: "setexp",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "NTKhang",
    description: "set exp cho user\nCredits: NTKhang",
    commandCategory: "system",
    usages: "setexp [exp] || setexp [tag] [exp] || setexp [iduser] [exp]",
    cooldowns: 5,
    info: [
    {
        key: 'exp',
        prompt: 'set exp cho bản thân',
        example: '$setexp 999'
    },
    {
        key: '[tag] [exp]',
        prompt: 'set exp cho người được tag',
        example: '$setexp @Khang 999'
    },
    {
        key: '[iduser] [exp]',
        prompt: 'set exp cho id được chỉ định',
        example: '$setexp 100010382497517 999'
    }]
};

module.exports.run = async(
{ Threads, api, event, Currencies, client, args, Users, global, __GLOBAL }) =>
{
    //lấy prefix
    var prefix = (await Threads.getData(event.threadID)).settings.PREFIX || global.config.PREFIX || __GLOBAL.settings.PREFIX;
    //lười viết event.body các kiểu nên làm như z
    let
    { body, senderID, threadID, messageID } = event;
    if (!args[0]) return api.sendMessage(`Sai cú pháp, sử dụng ${prefix}help setexp để xem cách sử dụng`, threadID, messageID);
    //lấy danh sách ng dùng trong dữ liệu bot
    const allUser = client.allUser;
    //lấy id theo trường hợp
    var idd = Object.keys(event.mentions); //nếu tag thì lấy id của ng tag
    if (idd.length == 0)
    {
        if (!args[1]) var idd = senderID; //nếu chỉ có exp thì lấy id của người gửi
        else if (args[0] && args[1]) var idd = args[0]; //nếu có id và exp thì lấy id là dãy số đầu tiên
    }
    //nếu ng dùng mang id đó ko có trong dữ liệu bot
    if (allUser.indexOf(parseInt(idd)) == -1)
        return api.sendMessage("Người dùng mang id " + idd + " không có trong dữ liệu bot", threadID, messageID);
    //lấy exp muốn set
    var exp = args[args.length-1];
    //nếu exp không phải số
    if (isNaN(parseInt(exp))) return api.sendMessage("Exp bạn nhập phải là số", threadID, messageID);
    //lấy tên trong Data
    var name = (await Users.getData(idd)).name;
    //lấy số exp hiện đang có
    var currentexp = parseInt((await Currencies.getData(idd)).exp);
    //cộng thêm exp cần set vào exp hiện tại
    var newexp = parseInt(exp) + currentexp;
    //cộng hoặc trừ
    var congtru = (exp < 0) ? "trừ đi " + exp.slice(1) : "cộng thêm " + exp;
    //gửi tin nhắn trả về + tag + set exp luôn, muốn không tag thì xóa từ chỗ /**/ tới /**/ phía sau (xóa luôn /**/)
    api.sendMessage(
    {
        body: "Đã " + congtru + " điểm kinh nghiệm cho người dùng " + name + ", Exp hiện tại của người này là: " + newexp /**/ ,
        mentions: [
        {
            tag: name,
            id: parseInt(idd)
        }]
    } /**/ , threadID, async() =>
    {
        await Currencies.setData(idd,
        {
            exp: parseInt(newexp)
        })
    }, messageID);
    //Cảm ơn đã đọc và sử dụng

};