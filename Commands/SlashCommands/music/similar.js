module.exports = {
    name: 'similar',
    description: 'Search for a similar tracks of the current track.',
    category: '🎵 music',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true})
        const response = await similar(interaction);
        await interaction.followUp(response)
    }
}
async function similar(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player || !player.queue.current) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;
    const result = await player.search(`https://www.youtube.com/watch?v=${queue.current.identifier}&list=RD${queue.current.identifier}`, interaction.member)
    switch(result.loadType) {
        case "LOAD_FAILED":
        case'NO_MATCHES':
            if(!queue.current || !player.playing) player.destroy();
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