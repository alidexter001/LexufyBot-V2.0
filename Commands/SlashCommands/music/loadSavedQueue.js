module.exports = {
    name: 'loadsavedqueue',
    description: 'Load your saved queue',
    category: '🎵 music',
    options: [{
        name: 'name',
        description: 'The name of the saved queue',
        required: true,
        type: 3
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const list = await interaction.options.getString('name');
        const response = await loadqueue(interaction, interaction.member, list)
        interaction.followUp(response)
    }
}
async function loadqueue(interaction, member, list) {
    if(!list) return `❌ **| You have to provide a queue name to import.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;

    if(!channel.viewable) return ({content:`⚠️ **| I need \`View_Channel\` Permission.**`});
    if(!channel.joinable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Connect_Channel\` Permission.**`);
    if(!channel.speakable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Speak\` Permission.**`);

    let player = interaction.client.manager.get(interaction.guild.id);
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
    const lists = await interaction.client.db.get(`${interaction.member.user.id}_savedQueue.${list}`)
    if(!lists) return `❌ **| There is no saved queue on this name.**`
    const loadedTracks = [];
    for(const track of lists) {
        let result = await player.search(track, interaction.member);
        switch(result.loadType) {
            case "LOAD_FAILED":
            case'NO_MATCHES':
                if(!queue.current) player.destroy(); 
                return `❌ **| No Result Was Found!**`
            case "TRACK_LOADED":    
            case'SEARCH_RESULT':
                const loadedTrack = result.tracks[0];
                loadedTracks.push(loadedTrack);
                break;
        }
    }
    if (player.state !== "CONNECTED"){ 
        await player.connect();
    }
    queue.add(loadedTracks);
    if(!player.playing && !player.paused) player.play();
    return `🎵 **| Added ${loadedTracks.length} tracks to the queue from \`${list}\`.**`;

}