const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'shuffle',
    category: '🎵 music',
    description: 'Shuffle the current server queue',
    run: async(client, message, args) => {
        const response = shuffle(client, message, args);
        message.reply(response);
    }
}
function shuffle(client, message, args) {
    const player = client.manager.get(message.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;

    const embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> 🔀 **Successfully Shuffled The Queue.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
    ])
    queue.shuffle();
    return {embeds: [embed]};

}