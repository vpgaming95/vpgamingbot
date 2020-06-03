module.exports.run = async (bot, message, args) => {
  const discord = require ("discord.js")
  module.exports.help = {
  name: "kick"
}
if(!message.member.hasPermission('KICK_MEMBERS') && message.author.id != "427067708752789504") return message.channel.send('you dont have perms to kick!')   
  
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user he has a higher role! (or i dont have perms to do so)");
         if(message.member.highestRole.comparePositionTo(message.mentions.members.first().highestRole) > 0){
    let reason = args.join(" ").slice(21);
    if(!reason) reason = "No reason provided";
        
    //יהי הגיע זמן הקיק
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
const embed = new discord.RichEmbed()
.setTitle(`${member.user.tag} has been kicked`)
.setDescription(`**reason:** ${reason}`)
message.delete().catch(O_o => {});
message.channel.send(embed)
}else{
  return message.channel.send("cant kick them! they have a higher (or equel) role to you!")
    module.exports.help = {
  name: "kick"
    }
}}