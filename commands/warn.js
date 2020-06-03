const Discord = require("discord.js")
const botconfig = require("../config.json");
const colours = require("../colours.json");
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
 
module.exports.run = async (bot, message, args) => {
   
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission.")
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return ("Please add me permission `ADMINISTRATOR` to use this command.")
 
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("Please specify a user")
    if(member.highestRole.calculatePosition >= message.member.highestRole.calculatePosition && message.author.id) return message.channel.send("You do not have permission to warn this person")
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send("Please say the reason")
    if(!warns[member.id]) warns[member.id] = {
        warns: 0
    }
    warns[member.id].warns++;
 
    fs.writeFileSync("./warnings.json", JSON.stringify(warns))
 
    let warnEmbed = new Discord.RichEmbed()
    .setDescription(`WARNING - you just received a warn from the server **${message.guild.name}** with as reason : **${reason}**`)
    .setColor("RANDOM")
 
    message.channel.send(member + " Use received warning " + reason)
 
    member.createDM().then(channel => {
        channel.send(warnEmbed)
    })
 
    let warnlvl = warns[member.id].warns;
    message.channel.send(`${member} now ${warnlvl} warn.`)
}
 
 
module.exports.help  = {
    name: "warn"
}