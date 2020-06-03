const Discord = require('discord.js')

exports.run = async (bot, msg, args) => {
  let embed = new Discord.RichEmbed()
   
  .setTitle('**VpGaming Commands List**')
  .setDescription(`__**bot prefix-**__ **!**`)  
  .addField('**General**', '**`help`**, **`membercount`** , **`16`** , **`dev`** , **`invite`** , **`טופס`**')
  .addField('**Music**' , '**`play`** , **`stop`** , **`skip`**')
  .addField('**Staff**', '**`ban`**, **`clear`**, **`kick`**, **`mute`**, **`unmute`** , **`say`** , **`unban`** , **`warn`**')
  .addField('**Fun**', '**`avatar`**, **`botinfo`**, **`serverinfo`**, **`userinfo`**')
  .setColor('RANDOM')
  
  msg.channel.send(embed)

}