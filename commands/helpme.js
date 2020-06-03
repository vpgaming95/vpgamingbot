const Discord = require("discord.js");
module.exports.run = async(client, message, args) => {
  let Rreason = args.join(" ")

  let voice = message.member.voiceChannel || ":no_entry:המשתמש לא נמצא בשום חדר :no_entry:"
  message.channel.send(`<@&717101721343623178>, <@&717103488873791579>, ** !צריך את עזרכתם ${message.author} \n ${voice}**`) 
}

module.exports.help = {

  name:"helpme",
};


