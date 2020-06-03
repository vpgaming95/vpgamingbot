const Discord = require("discord.js")
module.exports.run = async(client, message, args) => {
const count = new Discord.RichEmbed()
.setTitle("Server Members:")
.addField(`Total Members:`, message.guild.memberCount)
.addField(`**Total Bots:**`, message.guild.members.filter(bot=> bot.user.bot).size)
.setThumbnail(message.guild.iconURL)
.setColor("RANDOM")
.setFooter(`Requsted by:${message.author.username} `)
message.delete()
message.channel.send(count)
}

module.exports.help = {
  name: "membercount"
}