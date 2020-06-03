const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

let voice;
if(!message.member.voiceChannel) voice = `**! המשתמש לא נמצא באף חדר ${bot.emojis.get("673645047044112405")}** `;
if(message.member.voiceChannel) voice = `**\`${message.member.voiceChannel.name}\`: המשתמש נמצא בחדר**`

let staff = message.guild.roles.find(r => r.id == '716926249989308508');

message.channel.send(`${staff},צריך בחינה ${message.author}
${voice}`)
message.delete();
}

module.exports.help = {
name:"16"
}


