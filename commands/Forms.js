const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
  
if(message.author.id !== '479739667592380447') return;

        let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    

const embed = new Discord.RichEmbed()

.setColor("#ff0000")
.setThumbnail(bicon)
.setDescription(`
>>> **__טופס לצוות__** 

**כדי להתקבל לצוות יש למלא את הטופס הבא
אחרי שאתם  מגישים יש לרשום לי בפרטי ואחרי זה אבדוק
https://docs.google.com/forms/d/12Dm4l6tihTiW_7WDAp2OjMPyIubAIELKnuTMsrotMAo**

`)



  .setFooter(`All rights reserved to VpGaming`) 

message.channel.send(embed)

message.delete();
  }
module.exports.help = {
  name:"Forms"
}