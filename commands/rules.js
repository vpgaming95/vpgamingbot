const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

if(message.author.id !== '479739667592380447') return;
  
        let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    

const embed = new Discord.RichEmbed()

.setColor("#ff0000")
.setThumbnail(bicon)
.setDescription(`
>>> **__VpGaming Community__** 

**__חוקי השרת__**
**1.אין לקלל אף אחד מחברי השרת , או לרשום קללות בצ'אט.**
**2.יש להתייחס בצורה יפה ומכבדת לכל חברי השרת.**
**3.אין להספים את הצאטים בשרת.**
**4.אין לצעוק/לצרוח/ או לעשות אירייפ בחדרי הדיבור בשרת.**
**5.אין להשתמש בתוכנות לשינוי קול בחדרי הדיבור בשרת.**
**6.אין לשלוח תמונות מביכות/סוטות/לא יפות בחדר מדיה.**
**7.אין לפרסם פרטיים אישיים שלכם או של משתמשים אחרים.**
**8.אין לפרסם שחקן למכירה לא משנה באיזה משחק ו/או לעשות טריידים/ להרוויח כסף מהשרת/ים.**
**9.אין להתחצף/ לדבר לא יפה אל צוות השרת**
**10.אין לזייף שם /להתחזות לאחד ממשתמשי השרת**
**11.יש לכתוב כל דבר בחדר המתאים לו**
**12.מי שיתחיל מריבות/קללות כגון : (עלבון,ירידה,אלימות מילולית) יורחק מהשרת.**

**__עבירה על החוקים בפעם הראשונה  תוביל  לאזהרה
עבירה על החוקים בפעם השניה תוביל לחסימה זמנית מהצ'אט
עבירה על החוקים בפעם השלישית תוביל לקיק/באן תלוי בחומרת המעשה__**

**!!דעו כי אי ידיעת החוקים אינה פותרת מעונש**
**__קישור תמידי לשרת : __**
**https://discord.gg/PUXR6Sz**
`)



  .setFooter(`All rights reserved to VpGaming`) 

message.channel.send(embed)
message.delete();

  }
module.exports.help = {
  name:"rules"
}