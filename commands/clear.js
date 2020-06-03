const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("אין לך הרשאה");
  if(!args[0]) return message.channel.send("אנא ציין מספר 1-100");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`הודעות ${args[0]} נמחקו`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}