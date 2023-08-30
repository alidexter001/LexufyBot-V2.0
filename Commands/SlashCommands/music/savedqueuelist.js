const {EmbedBuilder} = require('discord.js');
const  config  = require(`${process.cwd()}/config`);
module.exports = {
    name: 'savedqueuelist',
    description: 'the list of your saved queues',
    category: '🎵 music',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await queuelist(interaction)
        interaction.followUp(response);
    }
}
async function queuelist(interaction) {
    const lists = await interaction.client.db.get(`${interaction.member.user.id}_savedQueue`);
    if(!lists) return `❌ **| You don't have any saved queue.**`
    
    const savedqueue = [];
    for (const listName in lists) {
        if (Object.hasOwnProperty.call(lists, listName)) {
            savedqueue.push({
                name: listName,
                length: lists[listName].length,
            });
        }
    }
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
    .setTitle(`✅ | ${interaction.member.user.username} Saved Queue.`)
    .setColor(config.EMBED_COLORS.PURPLE)
    .setFooter({text: `Requested By: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({dynamic: true})})
    savedqueue.map(list => {
        embed.addFields([{name: `> **Name:** *\`${list.name}\`*`, value: `**Length:** *\`${list.length}\`* \n`, inline: false}])
    })

    return { embeds: [embed] };
}