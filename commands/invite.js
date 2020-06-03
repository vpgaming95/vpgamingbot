const Discord = require('discord.js');
exports.run = async (bot,message,args) => {
let devs = new Discord.RichEmbed()

  .setColor ("RANDOM")
  .setTimestamp()
  .addField("my rank bot", "Invite Me [Here](https://discord.com/oauth2/authorize?client_id=717314633353920564&scope=bot&permissions=8)", true)
  .addField("my giveaway bot", "Invite Me [Here](https://discord.com/oauth2/authorize?client_id=717544540919169085&scope=bot&permissions=8)", true)
  .addField("my verify bot", "Invite Me [Here](https://discord.com/oauth2/authorize?client_id=717521376373768258&scope=bot&permissions=8)", true)
  .setTimestamp(new Date())
message.channel.send(devs)
}

exports.config = {
    aliases: [  ]
};

module.exports.help = {
    name: "invite"
}