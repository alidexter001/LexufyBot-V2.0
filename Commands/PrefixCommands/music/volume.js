const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'volume',
    category: '🎵 music',
    description: 'Set the music Volume <0-100>',
    run: async(client, message, args) => {
        const response = await volume(client, message, args);
        message.reply(response);
    }
}
async function volume(client, message, args) {
    const volume = !isNaN(args) ? parseInt(args) : 100;
    if (isNaN(volume) || volume < 0) {
        return `❌ **| Please provide a valid number greater than 0.**`;
    };
    const player = client.manager.get(message.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    if(!volume) return `🔊 **| The Current Volume Is Set To \`${player.volume}\`**`
    try {
        if(volume > 100 || volume < 0) return  `❌ **| You Should Choose A Value Between *\`<0-100>\`***`
        await player.setVolume(volume);
        const embed = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setDescription(`> 🔊 **Successfully Set The Volume To *\`${player.volume}\`* **`)
        .addFields([
            {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
        ])
        .setColor(config.EMBED_COLORS.GREEN)
        return {embeds: [embed]}
    }catch{return `❌ **| Something Went Wrong.**`}


}