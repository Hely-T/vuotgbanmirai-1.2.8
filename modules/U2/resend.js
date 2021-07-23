﻿module.exports.config = {
	name: "resend",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Thọ",
	description: "Thì là resend đó",
	commandCategory: "group", 
	usages: "resend",
	cooldowns: 0, 
	dependencies: ["tinyurl","fs-extra"]
};

module.exports.event = async function ({ event, api, client }) {
  let {messageID, senderID, threadID, body } = event;
  let fs = require("fs-extra");
  if (!client.message) client.message = new Array();
  if (!fs.existsSync(__dirname + "/cache/resend.json")) {
  fs.writeFileSync(__dirname + "/cache/resend.json", JSON.stringify([]), 'utf-8');
}
  fs.readFile(__dirname + "/cache/resend.json", "utf-8", (err, data) => {
					if (err) throw err;
					var oldData = JSON.parse(data);
					if (!oldData.some(item => item.id == threadID)) {
						let addThis = {
							id: threadID,
							resend: "on"
						}
						oldData.push(addThis);
						return fs.writeFile(__dirname + "/cache/resend.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : '');
					}
    })
					
     let a = JSON.parse(fs.readFileSync(__dirname + "/cache/resend.json"))
       if (a.some(item => item.id == threadID)) {
				let getThread = a.find(item => item.id == threadID).resend;
				if (getThread == "off") return;
       }
    
 

    if(event.type != "message_unsend") client.message.push({
    msgID:messageID,
    msgBody:body,
    attachment:event.attachments
  })
    if(event.type == "message_unsend") {
      if(!client.message.some(item => item.msgID == messageID)) return;
      var getMsg = client.message.find(item => item.msgID == messageID);
     let name = (await api.getUserInfo(event.senderID))[senderID].name;
      if(getMsg.msgBody != "")    return api.sendMessage({
			body: `Con vợ ${name} vừa gỡ 1 tin nhắn nhưng gỡ thế lồn nào được với Nội Dung :\n${getMsg.msgBody}`,
			mentions: [{
				tag: name,
				id: senderID
			}]
		}, event.threadID);
      else {
            let num = 0
            let msg = ` vừa gỡ ${getMsg.attachment.length} tệp đính kèm nhưng gỡ thế đéo nào được với nội dung `
          for (var i = 0; i < getMsg.attachment.length; i++) {
				var shortLink = await require("tinyurl").shorten(getMsg.attachment[i].url);
				num +=1;
        msg += `${num}: ${shortLink}\n`;
    	}
        return api.sendMessage({
			body: ` ${name}${msg}`,
			mentions: [{
				tag: name,
				id: senderID
			}]
		}, event.threadID);
        }
     
      }
    }

module.exports.run = async function({ api, event, args}) {
  let { messageID, threadID, body, senderID } = event
  let fs = require("fs-extra");
  let resend = JSON.parse(fs.readFileSync(__dirname + "/cache/resend.json"));
      
  	if (args[0] == "off") {
				return fs.readFile(__dirname + "/cache/resend.json", "utf-8", (err, data) => {
					if (err) throw err;
					var oldData = JSON.parse(data);
					var getThread = oldData.find(item => item.id == threadID);
					getThread.splice(getThread.findIndex(item => item.id == threadID), 1);
					fs.writeFile(__dirname + "/cache/resend.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : '');
          let addThis = {
							id: threadID,
							resend: "off"
						}
						oldData.push(addThis);
						return fs.writeFile(__dirname + "/cache/resend.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tắt resend thành công!"));
				});
			}
  
  	if (args[0] == "on") {
				return fs.readFile(__dirname + "/cache/resend.json", "utf-8", (err, data) => {
					if (err) throw err;
					var oldData = JSON.parse(data);
					var getThread = oldData.find(item => item.id == threadID);
					getThread.splice(getThread.findIndex(item => item.id == threadID), 1);
					fs.writeFile(__dirname + "/cache/resend.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : '');
          let addThis = {
							id: threadID,
							resend: "on"
						}
						oldData.push(addThis);
						return fs.writeFile(__dirname + "/cache/resend.json", JSON.stringify(oldData), "utf-8", (err) => (err) ? console.error(err) : api.sendMessage("Tắt resend thành công!"));
				});
			}
  
}