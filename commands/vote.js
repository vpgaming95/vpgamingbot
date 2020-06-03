const Discord = require("discord.js")


module.exports.run = async (bot, message, args, member) => {
  
    const channel = message.guild.channels.find('name', "『👌』הצבעות");
    
if (!channel) return;
  
  const voteContent = args.join(" ");
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('הצבעה חדשה!', voteContent)
  
  channel.send(embed)
              .then(function (message2) {
              message2.react("👎")
              message2.react("👍")
            }).catch(function() {
             });


}

module.exports.help = {
  name:"vote"
}

