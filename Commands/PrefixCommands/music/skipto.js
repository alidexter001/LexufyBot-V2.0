const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'skipto',
    category: '🎵 music',
    description: 'Skip to a specific track from the queue',
    run: async(client, message, args) => {
        const response = skipto(client, message, args);
        message.reply(response);
    }
}
function skipto(client, message, args) {
    const skipTo = !isNaN(args) ? parseInt(args) : null;
    if (isNaN(skipTo) || skipTo <= 0 || skipTo === null) {
        return `❌ **| Please provide a valid number greater than 0.**`;
    }
    const player = client.manager.get(message.guild.id)
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    if(skipTo <= 1 || skipTo > player.queue.size && player.queue.size !== 0) return `❌ **| You have to provide a number between *\`<1-${player.queue.length}>\`***`

    const embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> ⏭️ **Skipped To The Track Number *\`${skipTo}\`* Successfully.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
    ]);
    player.queue.remove(0, Number(skipTo - 1))
    player.stop()
    return {embeds: [embed]}
}