const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)

module.exports = {
    name: 'bassboost',
    category: '🎵 music',
    description: 'set the bassboost level to the played song',

    run: async(client, message, args) => {
        const response = await bassboost(client, message, args);
        message.reply(response);
    }
}
async function bassboost(client, message, args) {
    const player = client.manager.get(message.guild.id);
    let level = message.content.split(' ')[1];
    const prefix = await client.db.get(`${message.guild.id}.prefix`) || config.PREFIX 
    if((!['default', 'low', 'medium', 'high'].includes(level)) || !level) return `❌ **| Usage: ${prefix}bassboost \`<default | low | medium | high>\`.**`
    const levels = {
        default: 0.0,
        low: 0.20,
        medium: 0.30,
        high: 0.35,
    };
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    try {
        const bands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] }));
        const embed = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.GREEN)
        .setDescription(`> ⏫ **Successfully set BassBoost level to *\`${level}\`* **`)
        .addFields([
            {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
        ])
        player.setEQ(...bands)
        return ({embeds: [embed]});

    }catch{return `❌ **| Something Went Wrong.**`}
}