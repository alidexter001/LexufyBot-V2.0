const wait = require('node:timers/promises').setTimeout;
const msToHms = require('ms-to-hms')
module.exports = {
    name: 'play',
    category: '🎵 music',
    description: 'Play music from YouTube|Spotify|Deezer|RadioStations',
    options: [{
        name: 'song',
        description: 'The Song<name/url> you want me to play',
        type: 3,
        required: true,
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true})
        const song = interaction.options.getString('song')
        const response = await play(interaction, interaction.member, song)
        interaction.followUp(response)
    }
}
async function play(interaction, member, song) {
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!song) return ({content:`❌ **| You have to provide a song for me to play.**`, ephemeral: true});
    if(!channel) return (`❌ **| You have to be on a voice channel first to use this command.**`);
    if(!channel.viewable) return ({content:`⚠️ **| I need \`View_Channel\` Permission.**`});
    if(!channel.joinable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Connect_Channel\` Permission.**`);
    if(!channel.speakable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Speak\` Permission.**`);

    let player = interaction.client.manager.get(interaction.guild.id)
    if(!player) {
        player = interaction.client.manager.create({
            guild: interaction.guild.id, 
            textChannel: interaction.channel.id, 
            voiceChannel: interaction.member.voice.channelId,
            volume: 100,
            selfDeafen: true,
        })
    }
    
    if(channel && channel !== botChannel && player.playing) return ({content: `❌ **| You have to be on the same channel as mine to use this command**`, ephemeral: true});
    if(channel.full && !channel.joinable && player.state !== "CONNECTED" && !player.playing) return ({content: `❌ **| The channel is full. I can't join it**`, ephemeral: true});

    const queue = player.queue;
    let result = await player.search(song, interaction.member);
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
            if(!player.playing && !player.paused && player.queue.totalSize === pltracks.length) player.play();
            return `🎶 **| Added *\`${pltracks.length}\`* Tracks to The Queue From *\`${result.playlist.name}\`***`
        case "TRACK_LOADED":    
        case'SEARCH_RESULT':
            const track = result.tracks[0];
            queue.add(track);
            if(!player.playing && !player.paused && !queue.size) player.play(); 
            return `🎵 **| Added** ***\`${track.title}\`*** **To The Queue.**`;
    }
}