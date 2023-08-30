const {EmbedBuilder} = require('discord.js');
const  config  = require(`${process.cwd()}/config`);
module.exports = {
    name: 'savedqueuelist',
    description: 'the list of your saved queues',
    category: '🎵 music',
    run: async(client, message, args) => {
        const response = await queuelist(client, message, args)
        message.reply(response);
    }
}
async function queuelist(client, message, args) {
    const lists = await client.db.get(`${message.member.user.id}_savedQueue`);
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
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
    .setTitle(`✅ | ${message.member.user.username} Saved Queue.`)
    .setColor(config.EMBED_COLORS.PURPLE)
    .setFooter({text: `Requested By: ${message.member.user.username}`, iconURL: message.member.displayAvatarURL({dynamic: true})})
    savedqueue.map(list => {
        embed.addFields([{name: `> **Name:** *\`${list.name}\`*`, value: `**Length:** *\`${list.length}\`* \n`, inline: false}])
    })

    return { embeds: [embed] };
}