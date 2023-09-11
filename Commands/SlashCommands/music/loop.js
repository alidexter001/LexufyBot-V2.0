const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'loop',
    category: '🎵 music',
    description: 'Loop The current <Track|Queue>',
    options: [{
            name: 'type',
            description: 'The Entity you want to loop',
            type: 3,
            required: false,
            choices: [
                {
                    name: 'track',
                    value: 'track',
                },
                {
                    name: 'queue',
                    value: 'queue',
                }
            ]
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await looped(interaction);
        interaction.followUp(response);
    }
}
async function looped(interaction) {
    const type = interaction.options.getString('type') || 'track';
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    if(type === 'queue'){
        try{
            await player.setQueueRepeat(!player.queueRepeat);
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> ♾️ ***\`${player.queueRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Queue.**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])
            .setColor(`${player.queueRepeat ? config.EMBED_COLORS.GREEN : config.EMBED_COLORS.RED}`)
            return {embeds: [embed]}
        }catch{}
    }
    else if(type === 'track'){
        try{
            await player.setTrackRepeat(!player.trackRepeat);
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> 🔁 ***\`${player.trackRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Track.**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])
            .setColor(`${player.trackRepeat ? config.EMBED_COLORS.GREEN : config.EMBED_COLORS.RED}`)
            return {embeds: [embed]}
        }catch{}
    }
}