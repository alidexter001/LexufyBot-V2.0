const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'ping',
    category: '🛠️ utils',
    description: 'Show the current bot ping',
    run: async(client, message, args) => {
        try{
            const ping = Math.abs(Date.now()) - message.createdTimestamp;
            const embed = new EmbedBuilder()
            .setTitle('🏓 PONG.')
            .setColor('Random')
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> 💫 **My Current Api Latency: *\`${client.ws.ping} ms\`* **
           
            > 🏷️ **My Current Ping: *\`${ping} ms\`* **`)
            .addFields([
                {name: 'Requested By', value: ("`"+message.author.username+"`"), inline: true}
            ])

            message.reply({embeds: [embed]})

        }catch(e){console.log(e)}

    }
}