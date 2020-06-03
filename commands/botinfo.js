const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  
        let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    

const embed = new Discord.RichEmbed()

.setTitle(`__**bot info-**__`)
.setColor("#000bff")
.setThumbnail(bicon)
.setDescription(`
__**links-**__
[server Bot](https://discord.gg/PUXR6Sz)

__**Lirbay:-**__
java script (discord.js)

__**bot owner-💻**__
<@!680834248529281056>

__**bot id:-**__
680834248529281056

__**bot prefix-**__
     **!**
`)

.addField("__Ping-__", bot.ping)
.addField("__Created On-__", bot.user.createdAt)
.addField("__Bot Name-__", bot.user.username)

.addField("**__Users-__**", `${bot.users.size.toLocaleString()}`, true)
.addField("**__Servers-__**", `${bot.guilds.size.toLocaleString()}`, true)
.addField("**__Channels-__** ", `${bot.channels.size.toLocaleString()}`, true)

  .setFooter(`𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐬𝐞𝐧𝐝 𝐟𝐫𝐨𝐦:${message.author.username}`)

message.channel.send(embed)
message.delete();
  }
module.exports.help = {
  name:"botinfo"
}