const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  
if(message.author.id !== '479739667592380447') return;


let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
    
let role1 = message.guild.roles.get("668928537851330583")
let role2 = message.guild.roles.get("668929386124148766")
let role3 = message.guild.roles.get("668930019430760450")
let role4 = message.guild.roles.get("664906580973715547")
let role5 = message.guild.roles.get("668932079706439694")
let role6 = message.guild.roles.get("668934099796492288")
let role7= message.guild.roles.get("668934660327473172")
let role8= message.guild.roles.get("668935935978635264")


const embed = new Discord.RichEmbed()

.setColor("#ff0000")
.setThumbnail(bicon)
.setDescription(`
>>> **__Information About The Staff__**

**<@&668928537851330583>** \`${role1.members.size} Members\` - ** מייסדי השרת, אליהם (אלינו) אין לפנות בשום אופן בשום מצב בפרטי בקשר לשרת אלא אם כן זה משהו מאוד חשוב.**

**<@&668929386124148766>** \`${role2.members.size} Members\` - ** עוזר מנהל, וצוות גבוהה מאוד בשרת, יכול להחליף את המנהל מתי שהוא לא נמצא.** 

**<@&668930019430760450>** \`${role3.members.size} Members\` - ** עזרה בשרת כמה שאפשר, ותפקיד גבוהה בצוות.**

**<@&664906580973715547>** \`${role4.members.size} Members\` -  ** תפקידו לתמוך בשרת, לעצב לשרת מתי שצריך דברים מסויימים, ולעזור כמובן, רול גבוהה בשרת.**

**<@&668932079706439694>** \`${role5.members.size} Members\` - **עוזר אדמין, גם רול גבוהה בשרת, אבל תפקידו יותר לעצב לשרת גם מתי שצריך, להזמין אנשים, להיות פעיל בצאט.**

**<@&668934099796492288>** \`${role6.members.size} Members\` - **לשמור על הצאט כמה שיותר פעיל, לעזור ולתמוך בכל מה שקורה בשרת.**

**<@&668934660327473172>** \`${role7.members.size} Members\` - **שומר שאין ריבים בצאט, דואג לפעילות בצאט ועוזר לאנשים.**

**<@&668935935978635264>** \`${role8.members.size} Members\` - **הדרגה הראשונה בצוות, עוזר, פשוטו כמשמעו, עוזר לשרת בכל מה שצריך, דואג שהכל יהיה מצויין ומאורגן, משגיח, דואג על הצאטים, מביע רעיונות חדשים.**

`)



  .setFooter(`All rights reserved to Team VpGaming`)

message.channel.send(embed)
message.delete();
  }
module.exports.help = {
  name:"server-info"
}