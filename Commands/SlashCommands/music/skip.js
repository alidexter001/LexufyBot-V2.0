const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports ={
    name: 'skip',
    category: '🎵 music',
    description: 'Skip to the next song in the queue',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = skip(interaction)
        interaction.followUp(response);
    }
}
function skip(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    player.stop();
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> ⏩ **Skipped To The Next Track Successfully.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
    ])
    return {embeds: [embed]}
}