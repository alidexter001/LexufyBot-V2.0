const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'bassboost',
    category: '🎵 music',
    description: 'set the bassboost level to the played song',
    options: [{
        name: 'level',
        description: 'bassboost level',
        type: 3,
        required: true,
        choices: [
            {
                name: 'default',
                value: 'default',
            },
            {
                name: 'low',
                value: 'low',
            },
            {
                name: 'medium',
                value: 'medium',
            },
            {
                name: 'high',
                value: 'high',
            }
        ],
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = bassboost(interaction);
        interaction.followUp(response);
    }
}
function bassboost(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    let level = interaction.options.getString('level');
    const levels = {
        default: 0.0,
        low: 0.20,
        medium: 0.30,
        high: 0.35,
    };
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    try {
        const bands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] }));
        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.GREEN)
        .setDescription(`> ⏫ **Successfully set BassBoost level to *\`${level}\`* **`)
        .addFields([
            {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
        ])
        player.setEQ(...bands)
        return ({embeds: [embed]});

    }catch{return `❌ **| Something Went Wrong.**`}
}