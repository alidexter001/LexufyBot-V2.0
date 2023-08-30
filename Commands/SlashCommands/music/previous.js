const { EmbedBuilder } = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'previous',
    category: '🎵 music',
    description: 'play the previous song',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = previous(interaction);
        interaction.followUp(response);
    }
}
function previous(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    try{
        const currentSong = player.queue.current;
        if(!player.queue.previous) return `❌ **| There is no previous played songs on this queue**`
        if (currentSong) player.queue.unshift(currentSong);
        player.play(player.queue.previous);

        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.BLUE)
        .setDescription(`> ⏪ **Successfully returned to the previous song**`)
        .addFields([
            {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
        ])

        return {embeds: [embed]}

    }catch{return `❌ **| Something Went Wrong.**`}
}