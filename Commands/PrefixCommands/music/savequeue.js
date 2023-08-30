module.exports = {
    name: 'savequeue',
    category: '🎵 music',
    description: 'save the current queue to your database',
    options: [{
        name: 'name',
        description: 'the name to save the queue as',
        required: true,
        type: 3
    }],
    run: async (client, message, args) => {
        const response = await savequeue(client, message, args);
        message.reply(response);
    }
}
async function savequeue(client, message, args) {
    const name = args.join(' ');
    if(!name) return `❌ **| You have to provide a name to save the queue as.**`
    const player = client.manager.get(message.guild.id);
    if(!player || !player.playing) return `❌ **| Nothing Playing Right Now.**`

    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;

    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    let queue;
    queue = player.queue ? player.queue : player.queue.current

    for(const track of queue){
        await client.db.push(`${message.member.user.id}_savedQueue.${name}`, track.uri);
    }
    return `⏺️ **| Successfully saved \`${queue.length + 1}\` tracks on \`${name}\`**.`
}