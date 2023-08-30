module.exports = {
    name: 'pause',
    category: '🎵 music',
    description: 'Pause the current queue',
    run: async(client, message, args) => {
        const response = pause(client, message, args);
        message.reply(response)
    }
}
function pause(client, message, args) {
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    const player = client.manager.get(message.guild.id);

    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel first to use this command.**`
    if(channel && botChannel && channel !== botChannel && player.playing) return `❌ **| You have to be on the same channel as mine to use this command.**`

    player.pause(true);
    return `🎵 **| The music player is paused successfully.**`
}