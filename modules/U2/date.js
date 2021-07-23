module.exports.config = {
  name: "date",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho",
  description: "",
  commandCategory: "System",
  usages: "",
  cooldowns: 3,
  dependencies: ["vn-lunar","axios"]
};

module.exports.run = async ({ api, event, args }) => {
  var { threadID, messageID } = event;
  var vnLunar = require('vn-lunar')
  var axios = require('axios')
  var today = new Date()
  var date = today.getDate()+ '/' +(today.getMonth()+1)+ '/' +today.getFullYear();
  var ngay = today.getDate();
  var thang = (today.getMonth()+1);
  var nam = today.getFullYear()             
  var am = vnLunar.getLunarDate(ngay,thang,nam)
  var d = new Date();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
  let res = await axios.get(encodeURI(`http://le31.glitch.me/poem`));
  console.log(res)
  var msg = `🎄Dương: ${date}\r\n🌲Âm: ${am.day}/${am.month}/${am.year}\r\n🐧Thời gian: ${time}\r\n"${res.data.data}"`
  api.sendMessage(msg,threadID,messageID)
  
  }