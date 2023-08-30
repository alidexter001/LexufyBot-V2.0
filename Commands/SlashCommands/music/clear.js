const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'clear',
    category: '🎵 music',
    description: 'Clear the current server queue',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = clear(interaction);
        interaction.followUp(response);
    }
}
function clear(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;
    if(queue.size > 0){
        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.BLUE)
        .setDescription(`> 🚮 **Successfully Cleared The Queue.**`)
        .addFields([
            {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
        ])
        queue.clear();
        return {embeds: [embed]}
    }else return `❌ **| The Queue Is Already Empty.**`
}