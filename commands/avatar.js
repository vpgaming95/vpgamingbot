const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    let waiting = await message.channel.send("<a:load:520658910072274944>").catch(console.error);
 
    let mentionedUser = message.mentions.users.first() || message.author;
 
    let avatarembed = new Discord.RichEmbed()
 
        .setImage(mentionedUser.displayAvatarURL)
        .setColor("RANDOM")
        .setTitle("Avatar")
        .setFooter(" " + message.author.tag)
        .setDescription("[ראטווא רושיק](" + mentionedUser.displayAvatarURL + ")");
 
    waiting.edit(avatarembed).catch(console.error)
message.delete();

}
 
module.exports.help = {
    name: "avatar"
}