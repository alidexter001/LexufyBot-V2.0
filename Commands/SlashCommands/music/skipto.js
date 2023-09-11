const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'skipto',
    category: '🎵 music',
    description: 'Skip to a specific track from the queue',
    options: [{
        name: 'position',
        description: 'The track number from the queue you want to skipto ',
        required: true,
        type: 4,
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = skipto(interaction);
        interaction.followUp(response);
    }
}
function skipto(interaction) {
    const skipTo = interaction.options.getInteger('position')
    const player = interaction.client.manager.get(interaction.guild.id)
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    if(skipTo <= 1 || skipTo > player.queue.size && player.queue.size !== 0) return `❌ **| You have to provide a number between *\`<1-${player.queue.length}>\`***`

    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> ⏭️ **Skipped To The Track Number *\`${skipTo}\`* Successfully.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
    ]);
    player.queue.remove(0, Number(skipTo - 1))
    player.stop()
    return {embeds: [embed]}
}