const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, muterole) => {

  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")
   
if(!message.member.hasPermission("BAN_MEMBERS")) 
  

  message.delete().catch(O_o=>{});

  let tempmuteembed = new Discord.RichEmbed()
  .setDescription(`__Unban__`)
  .setColor("RANDOM")
  .addField("User",  `${member}`)
  .addField("Staff", `${message.author}`)

    let log = message.guild.channels.find(`name`, "mod-log")
    if(!log) return message.channel.send("I cant find channel called `mod-log`");
  log.send(tempmuteembed);

  message.channel.send(`**${member.user.tag}** has been Unbanned`);
  member.send(`You was Unbanned from **${message.guild.name}**`)
message.delete();


}

module.exports.help = {
  name: "unban",
  
}