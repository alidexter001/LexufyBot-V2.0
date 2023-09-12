const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'loop',
    category: '🎵 music',
    description: 'Loop The current <Track|Queue>',
    run: async(client, message, args) => {
        const response = await looped(client, message, args);
        message.reply(response);
    }
}
async function looped(client, message, args) {
    const type = message.content.split(' ')[1];
    const prefix = await client.db.get(`${message.guild.id}.prefix`) || config.PREFIX 
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`
    if((!['track', 'queue'].includes(type)) || !type) return `❌ **| Usage: ${prefix}loop \`<track | queue>\`.**`
    if(type === 'queue'){
        try{
            await player.setQueueRepeat(!player.queueRepeat);
            const embed = new EmbedBuilder()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> ♾️ ***\`${player.queueRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Queue.**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
            ])
            .setColor(`${player.queueRepeat ? config.EMBED_COLORS.GREEN : config.EMBED_COLORS.RED}`)
            return {embeds: [embed]}
        }catch{}
    }
    else if(type === 'track'){
        try{
            await player.setTrackRepeat(!player.trackRepeat);
            const embed = new EmbedBuilder()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> 🔁 ***\`${player.trackRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Track.**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
            ])
            .setColor(`${player.trackRepeat ? config.EMBED_COLORS.GREEN : config.EMBED_COLORS.RED}`)
            return {embeds: [embed]}
        }catch{}
    }
}
