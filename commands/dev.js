const discord = require("discord.js")
module.exports.run = async(client, message,args) => {

  const embed = new discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**אני מתכנת הבוט**")
  .setDescription("<@479739667592380447>")
 message.channel.send(embed)
}
