const Discord = require("discord.js")
const moment = require("moment")
const { stripIndents  }= require("common-tags")
module.exports.run = async(client, message, args) => {
  const formatDate = require("../utils/errors.js")
const m = message.mentions.members.first()||message.member
const roles = message.member.roles
const cat = new Discord.RichEmbed()
.addField('MemberInfo:', stripIndents` 


user Name: 
${m.user.tag}

user Id: 
${m.id}`, )

.addField('UserInfo', stripIndents`

user roles: 
${m.roles.filter(r=> r.id !== message.guild.id).map(r=> r).join(" ")||"No roles"}

user joined in: 
${moment.utc(m.joinedAT).format("dddd, MMMM Do YYYY")}

user Status: 
[${m.presence.status}]

user Is playing a game:
[${m.presence.game ? m.presence.game.name : 'None'}]

Account was created in: 
${moment(m.user.createdAt).format('LLLL')} (${moment(m.user.createdAt).fromNow()})`, )

.setColor("RANDOM")


.setTimestamp()

.setFooter(`Requsted by: ${message.author.username}`, message.author.displayAvatarURL)

message.channel.send(cat)
}