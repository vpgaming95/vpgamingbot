// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
let rolename= "664906589098213376" 
let emojiname = "673644516296884292";
commandPrefix: process.env.prefix


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
const Discord = require("discord.js")
const bot = new Discord.Client()
const botconfig = require("./botconfig.json");
const fs = require("fs");
const music = require("./music")
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;


bot.commands = new Discord.Collection();


bot.on("ready", async () => {
console.log(`${bot.user.tag} is now online`)
bot.user.setActivity(`${bot.users.size} אנשים בשרת`,);
})

bot.on('guildMemberAdd', member => {
console.log(`${bot.user.tag} is now online`)
bot.user.setActivity(`${member.guild.memberCount} אנשים בשרת`,);
bot.channels.get("709365085927112758").setName(`Total Members - [${member.guild.memberCount}]`);
})

bot.on('guildMemberRemove', member => {
console.log(`${bot.user.tag} is now online`)
bot.user.setActivity(`${member.guild.memberCount} אנשים בשרת`);
bot.channels.get("709365085927112758").setName(`Total Members - [${member.guild.memberCount}]`);
})

bot.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find(ch => ch.id === "709354445393100900");
  if (!channel) return;

  let joinEmbed = new Discord.RichEmbed()
    .setTitle("**Member Joined**")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Dev: VpGaming `)
    .setThumbnail(member.user.avatarURL)
    .setDescription(`${member} **,היי ברוך הבא לשרת שלנו מקווים שתהנה**
**עכשיו אנחנו** **${member.guild.memberCount} אנשים**`);
  channel.send(joinEmbed);
});
 


bot.on('message', async message=> {
  if(message.content.split(" ")[0] == "!mute"){
    if(message.member.hasPermission("MANAGE_MESSAGES")){
          let mutemem= message.mentions.members.first();
    if(!mutemem){
      message.channel.sned("תתייג את הבנאדם שאתה רוצה להשתיק");
      }else{
                            let muterole = message.guild.roles.find(x => x.name === "Muted")
                    if(!muterole) {
                      try {
                        muterole = await message.guild.createRole({
                          name: "Muted", 
                          color: "#514f48",
                          permissions: []
                        }).then().catch(err=>{
                          return;
                        })
                      } catch(e) {
                        console.log(e.stack);
                      }
                    }

                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false,
                          SEND_TTS_MESSAGES: false, 
                          ATTACH_FILES: false,
                          SPEAK: false
                        }).then().catch(err=>{console.log(err)});
                      })
                    if(mutemem.roles.has(muterole.id)){
                        message.channel.send("הבנאדם הזה כבר מושתק.")
                        return;
                    }else{
                        mutemem.addRole(muterole.id).then(() => {
                          message.channel.send(mutemem+" קיבל מיוט בהצלחה!")
                          }).catch(err=>{
                          message.channel.send("אין לי גישות לשים לבנאדם הזה מיוט")
                          });
                    }
      }
     }else{
        message.channel.send("אין לך גישות לפקודה זאת")
     }
   }if(message.content.split(" ")[0] == "!unmute"){
        if(!message.member.hasPermission("MUTE_MEMBERS")){
                return message.channel.send("אין לך גישות לפקודה זאת")
        }
                let mutemem = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[1])
                if(!mutemem){
                  message.channel.send("לא צוין משתמש להוריד לו מיוט")
                    return;
                }
                    let muterole = message.guild.roles.find(x => x.name === "Muted")
                    if(!muterole) {
                      try {
                        muterole = await message.guild.createRole({
                          name: "Muted", 
                          color: "#514f48",
                          permissions: []
                        }).then().catch(err=>{
                          return
                        })
                      } catch(e) {
                        console.log(e.stack);
                      }
                    }
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false,
                          SEND_TTS_MESSAGES: false, 
                          ATTACH_FILES: false,
                          SPEAK: false
                        }).then().catch(err=>{console.log(err)});
                      })
                    if(!mutemem.roles.has(muterole.id)){
                      message.channel.send("המשתמש שצוין לא במיוט.")
                        return;
                    }else{
                        mutemem.removeRole(muterole.id).then(() => {
                          message.channel.send("הוריד את המיוט בהצלחה ל:"+mutemem)
                          }).catch(err=>{
                          message.channel.send("הייתה בעיה בהורדת המיוט לבנאדם זה")
                          });
                    }
  }
});



fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
  })


});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }


  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});




bot.on('message', async message => {
	if (message.content === '+verify') {

    const embed = new Discord.RichEmbed()
        .setColor("#0066ff")
        .setTitle("Verification System")
        .setDescription("**בכדי לאשר את המשתמש שלך ולהכנס לשרת המלא יש ללחוץ על האמוגי הבא  ✅** ")
        .setTimestamp();
    
		    const reactmessage = await message.channel.send(embed);
		    await reactmessage.react('✅');

		    const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
		    const collector = reactmessage.createReactionCollector(filter);

		    collector.on('collect', async reaction => {
			    const user = reaction.users.last();
			    const guild = reaction.message.guild;
			    const member = guild.member(user) || await guild.fetchMember(user);
      
          const Niso = message.guild.roles.find(c => c.id === '664906589098213376')
      
			    member.addRole(Niso);
		});
	}
});



bot.login(process.env.TOKEN)
