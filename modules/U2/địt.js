const request = require('request');
const fs = require('fs')

module.exports.config = {
  name: "địt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BerVer mod by VanHung",
  description: "Địt bạn tag",
  commandCategory: "general",
  usages: "địt [tag người bạn cần địt]",
  cooldowns: 5,
  dependencies: ["request","fs"]
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join(" ")) return out("Bạn chưa tag người bạn muốn địt");
  else
  return request('http://api-teamucode.ga/dit.php', (err, response, body) => {
    let picData = JSON.parse(body);
    var mention = Object.keys(event.mentions)[0];
    let getURL = picData.url;
    let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
    let tag = event.mentions[mention].replace("@", "");
    let callback = function() {
      api.sendMessage({
        body: tag + `\nVừa bị địt ❤️`,
        mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
        attachment: fs.createReadStream(__dirname + `/cache/địt.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/địt.${ext}`), event.messageID);
    };
    request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/địt.${ext}`)).on("close", callback);
  });
}