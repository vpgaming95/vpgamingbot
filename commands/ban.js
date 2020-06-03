const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first();
  if (!member) return message.channel.send("You need specific user");
  let reason = args.slice(1).join(" ");
  if (!reason) return message.channel.send("You need write a reason");
  if (!message.member.hasPermission("BAN_MEMBERS"))
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You dont have Permissions");

  message.delete();

  let banEmbed = new Discord.RichEmbed()
    .setDescription(`__Ban__`)
    .setColor("#ff1500")
    .addField("User", `${member}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", reason);



  member.ban(reason);
  message.channel.send(`**${member.user.tag}** has been Banned`);
  member.send(
    `You was Banned from **${message.guild.name}**. reason: ${reason}`
  );
  message.delete();
};

module.exports.help = {
  name: "ban",
  description: "ban a user with reason"
};
