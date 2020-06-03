const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

if(message.author.id !== '479739667592380447') return;
  
        let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    

const embed = new Discord.RichEmbed()

.setColor("#ff0000")
.setThumbnail(bicon)
.setDescription(`
>>> **__support__** 

**__אשמח עם  תשימו את הקוד שלי בחנות חברים
כל מי שישלח תמונה יקבל רול של תומך__**
`)



  .setFooter(`All rights reserved to VpGaming`) 

message.channel.send(embed)
message.delete();

  }
module.exports.help = {
  name:"support"
}