module.exports = {
    name: 'resume',
    category: '🎵 music',
    description: 'Resume the current queue',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = resume(interaction);
        interaction.followUp(response);
    }
}
function resume(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    player.pause(false);
    return `🎵 **| The music player is resumed successfully.**`
}