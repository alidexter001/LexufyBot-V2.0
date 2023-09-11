const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'volume',
    category: '🎵 music',
    description: 'Set the music Volume <0-100>',
    options: [{
        name: 'volume',
        description: 'Volume Number between 0 and 100',
        type: 4,
        required: false,
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await volume(interaction);
        interaction.followUp(response);
    }
}
async function volume(interaction) {
    const volume = interaction.options.getInteger('volume');
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    if(!volume) return `🔊 **| The Current Volume Is Set To \`${player.volume}\`**`
    try {
        if(volume > 100 || volume < 0) return  `❌ **| You Should Choose A Value Between *\`<0-100>\`***`
        await player.setVolume(volume);
        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
        .setDescription(`> 🔊 **Successfully Set The Volume To *\`${player.volume}\`* **`)
        .addFields([
            {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
        ])
        .setColor(config.EMBED_COLORS.GREEN)
        return {embeds: [embed]}
    }catch{return `❌ **| Something Went Wrong.**`}


}