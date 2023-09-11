const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'uptime',
    category: '🛠️ utils',
    description: 'Display the current uptime informations of the bot',

    run: async(interaction, client) => {
        
        try {
            var startingTime = Date.now();
            var currentdate = new Date(); 
            var datetime = "Date: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " Time: "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

            const client = interaction.client

            const embed = new EmbedBuilder()
            .setTitle('✅ Uptime.')
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(config.EMBED_COLORS.PURPLE)
            .setDescription(`⌚ **My Local Time: \`${datetime}\`**\n` +
            `📈 **Current Uptime: **` + 
            `\`${timeformat(process.uptime())}\`\n` +
            `\`\`\` \`\`\``)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])

            interaction.reply({embeds: [embed]})
        }catch{}
    }
}

function timeformat(timeInSeconds) {
    const days = Math.floor((timeInSeconds % 31536000) / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.round(timeInSeconds % 60);
    return (
      (days > 0 ? `${days} days, ` : "") +
      (hours > 0 ? `${hours} hours, ` : "") +
      (minutes > 0 ? `${minutes} minutes, ` : "") +
      (seconds > 0 ? `${seconds} seconds` : "")
    );
}
