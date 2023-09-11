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
    run: async (interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await savequeue(interaction);
        interaction.followUp(response);
    }
}
async function savequeue(interaction) {
    const name = interaction.options.getString('name');
    if(!name) return `❌ **| You have to provide a name to save the queue as.**`
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player || !player.playing) return `❌ **| Nothing Playing Right Now.**`

    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;

    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;
    if(!queue.size) return `❌ **| The queue is Empty.**`

    for(const track of queue){
        await interaction.client.db.push(`${interaction.member.user.id}_savedQueue.${name}`, track.uri);
    }
    const savedQueueSize = await interaction.client.db.get(`${interaction.member.user.id}_savedQueue.${name}`).length;
    return `⏺️ **| Successfully saved \`${queue.length}\` tracks on \`${name}\`**.`
}