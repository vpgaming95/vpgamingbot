const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const opusscript = require('opusscript');
 
const client = new Client({ disableEveryone: true });
 
const youtube = new YouTube(GOOGLE_API_KEY);
 
const queue = new Map();
 
client.on('warn', console.warn);
 
client.on('error', console.error);
 
client.on('ready', () => console.log('מוזיקה מוכנה!'));
 
client.on('disconnect', () => console.log('התנתקתי מהצאנל...'));
 
client.on('reconnecting', () => console.log('התחברתי מחדש'));
 
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
 
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(PREFIX.length)
 
    if (command === 'search') {
 
    }
    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('❌ |You Dont In Voice Channel');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('❌ |I cannot connect in this voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('❌ |I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(` Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    const songselection = new Discord.RichEmbed()
                    .setAuthor(`song selection:`)
                    .setColor("RANDOM")
                    .addField("Please provide a value to select one of the search results ranging from 1-10:" ,`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
                    .setFooter(`After 30 seconds you will select a song`)
                    msg.channel.send(songselection)
 
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 30000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('I could not obtain any search results.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('❌ |Im Can`t Srach What Of You Srach');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
        if (!msg.member.voiceChannel) return msg.channel.send('❌ |You Dont In Voice Channel');
        if (!serverQueue) return msg.channel.send('❌ |There is nothing playing.');
        serverQueue.connection.dispatcher.end('✔ |The Song Skip');
        return undefined;
    } else if (command === 'stop') {
        if (!msg.member.voiceChannel) return msg.channel.send('❌ |You Dont In Voice Channel');
        if (!serverQueue) return msg.channel.send('❌ |There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('✔ |Stop command has been used!');
        return undefined;
    } else if (command === 'volume') {
        if (!msg.member.voiceChannel) return msg.channel.send('❌ |You Dont In Voice Channel');
        if (!serverQueue) return msg.channel.send('❌ |here is nothing playing.');
        if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return msg.channel.send(`I set the volume to: **${args[1]}**`);
    } else if (command === 'np') {
        if (!serverQueue) return msg.channel.send('❌ |here is nothing playing.');
        return msg.channel.send(` Now playing: **${serverQueue.songs[0].title}**`);
    } else if (command === 'queue') {
        if (!serverQueue) return msg.channel.send('❌ |here is nothing playing.');
        return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
        `);
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('✔ |Resumed the music for you!');
        }
        return msg.channel.send('❌ |There is nothing playing.');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('✔ |Resumed the music for you!');
        }
        return msg.channel.send('❌ |here is nothing playing.');
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`🎶 **${song.title}** has been added to the queue!`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
    serverQueue.textChannel.send(` Start playing: **${song.title}**`);
}
client.login(process.env.TOKEN)