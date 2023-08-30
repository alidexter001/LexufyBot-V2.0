const wait = require('node:timers/promises').setTimeout;
const msToHms = require('ms-to-hms')
module.exports = {
    name: 'play',
    category: '🎵 music',
    description: 'Play music from YouTube|Spotify|Deezer|RadioStations',
    run: async(client, message, args) => {
        const song = args.join(" ");
        const response = await play(client, message, song)
        await message.reply(response)
    }
}
async function play(client, message, song) {
    if(!song) return `❌ **| You have to provide a song for me to play.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!song) return `❌ **| You have to provide a song for me to play.**`
    if(!channel) return (`❌ **| You have to be on a voice channel first to use this command.**`);
    if(!channel.viewable) return `⚠️ **| I need \`View_Channel\` Permission.**`
    if(!channel.joinable && player.state !== "CONNECTED" && !player.playing) return `⚠️ **| I need \`Connect_Channel\` Permission.**`
    if(!channel.speakable && player.state !== "CONNECTED" && !player.playing) return `⚠️ **| I need \`Speak\` Permission.**`

    let player = client.manager.get(message.guild.id)
    if(!player) {
        player = client.manager.create({
            guild: message.guild.id, 
            textChannel: message.channel.id, 
            voiceChannel: message.member.voice.channel.id,
            volume: 100,
            selfDeafen: true,
        })
    }
    
    if(channel && channel !== botChannel && player.playing) return `❌ **| You have to be on the same channel as mine to use this command**`
    if(channel.full && !channel.joinable && player.state !== "CONNECTED" && !player.playing) return `❌ **| The channel is full. I can't join it**`

    const queue = player.queue;
    let result = await player.search(song, message.member);
    if (player.state !== "CONNECTED"){ 
        await player.connect();
    }
    switch(result.loadType) {
        case "LOAD_FAILED":
        case'NO_MATCHES':
            if(!queue.current) player.destroy(); 
            return `❌ **| No Result Was Found!**`
        case'PLAYLIST_LOADED':
            const pltracks = result.tracks;
            queue.add(pltracks)
            if(!player.playing && !player.paused && player.queue.totalSize === pltracks.length) await player.play();
            return `🎶 **| Added *\`${pltracks.length}\`* Tracks to The Queue From *\`${result.playlist.name}\`***`
        case "TRACK_LOADED":    
        case'SEARCH_RESULT':
            const track = result.tracks[0];
            queue.add(track);
            if(!player.playing && !player.paused && !queue.size) player.play(); 
            return `🎵 **| Added** ***\`${track.title}\`*** **To The Queue.**`; 
    }
}