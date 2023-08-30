module.exports = {
    name: 'resume',
    category: '🎵 music',
    description: 'Resume the current queue',
    run: async(client, message, args) => {
        const response = resume(client, message, args);
        message.reply(response);
    }
}
function resume(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    player.pause(false);
    return `🎵 **| The music player is resumed successfully.**`
}