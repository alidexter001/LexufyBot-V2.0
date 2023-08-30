const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'ping',
    category: '🛠️ utils',
    description: 'Show the current bot ping',
    run: async(interaction) => {
        const message = await interaction.deferReply({fetchReply: true});

        try{
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setTitle('🏓Pong.')
            .setColor('Random')
            .setDescription(`> 💫 **My Current Api Latency: *\`${interaction.client.ws.ping} ms\`* **
           
            > 🏷️ **My Current Ping: *\`${message.createdTimestamp - interaction.createdTimestamp} ms\`* **`)

            .addFields([
                {name: 'Requested By', value: ("`"+interaction.member.user.username+"`"), inline: true}
            ])
            interaction.editReply({embeds: [embed]})
        }catch(e){console.log(e)}

    }
}