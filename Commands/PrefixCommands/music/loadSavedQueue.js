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
    run: async(client, message, args) => {
        const list = args.join(" ");
        const response = await loadqueue(client, message, list)
        message.reply(response)
    }
}
async function loadqueue(client, message, list) {
    if(!list) return `❌ **| You have to provide a queue name to import.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;

    if(!channel.viewable) return ({content:`⚠️ **| I need \`View_Channel\` Permission.**`});
    if(!channel.joinable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Connect_Channel\` Permission.**`);
    if(!channel.speakable && player.state !== "CONNECTED" && !player.playing) return (`⚠️ **| I need \`Speak\` Permission.**`);

    let player = client.manager.get(message.guild.id);
    if(!player) {
        player = client.manager.create({
            guild: message.guild.id, 
            textChannel: message.channel.id, 
            voiceChannel: message.member.voice.channelId,
            volume: 100,
            selfDeafen: true,
        })
    }
    if(channel && channel !== botChannel && player.playing) return `❌ **| You have to be on the same channel as mine to use this command**`
    if(channel.full && !channel.joinable && player.state !== "CONNECTED" && !player.playing) return `❌ **| The channel is full. I can't join it**`
    const queue = player.queue;
    const lists = await client.db.get(`${message.member.user.id}_savedQueue.${list}`)
    if(!lists) return `❌ **| There is no saved queue on this name.**`
    const loadedTracks = [];
    for(const track of lists) {
        let result = await player.search(track, message.member);
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