const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'shuffle',
    category: '🎵 music',
    description: 'Shuffle the current server queue',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = shuffle(interaction);
        interaction.followUp(response);
    }
}
function shuffle(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;

    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> 🔀 **Successfully Shuffled The Queue.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
    ])
    queue.shuffle();
    return {embeds: [embed]};

}