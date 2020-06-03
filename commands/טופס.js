  const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  
let voice;

message.channel.send(`**מי שרוצה להצטרף לצוות השרת**
https://docs.google.com/forms/d/12Dm4l6tihTiW_7WDAp2OjMPyIubAIELKnuTMsrotMAo ${message.member} 
 `)

message.delete();
}


module.exports.help = {
name:"טופס"
}