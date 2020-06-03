const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

message.guild.members.map(x => x.send(args.join(" ")))
}
module.exports.help = {
name: "dm"
 }