module.exports = {
    name: 'pause',
    category: '🎵 music',
    description: 'Pause the current queue',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = pause(interaction);
        interaction.followUp(response)
    }
}
function pause(interaction) {
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    const player = interaction.client.manager.get(interaction.guild.id);

    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel first to use this command.**`
    if(channel && botChannel && channel !== botChannel && player.playing) return `❌ **| You have to be on the same channel as mine to use this command.**`

    player.pause(true);
    return `🎵 **| The music player is paused successfully.**`
}