const axios = require('axios');
const {EmbedBuilder} = require('discord.js')
const config = require(`${process.cwd()}/config.js`);

const webhookURL = config.webhookURL.JOIN;

const client = require(`${process.cwd()}/bot.js`).client;

module.exports = async(guild) => {
    if(!config.webhookURL.LEAVE) return;

    sendWebhook(guild);
}
function sendWebhook(guild) {

    const owner = client.users.cache.get(guild.ownerId).username

    const embed = new EmbedBuilder()
        .setTitle("Guild Leaved")
        .setColor(config.EMBED_COLORS.RED)
        .setThumbnail(guild.iconURL())
        .addFields([
            {name: 'Name:', value: `\`${guild.name}\``, inline: false},
            {name: 'ServerId:', value: `\`${guild.id}\``, inline: false},
            {name: 'Owner:', value: `\`${owner}(${guild.ownerId})\``, inline: false},
            {name: 'Members:', value: `\`\`\`yaml\n${guild.memberCount}\`\`\``, inline: false},
        ])
        .setFooter({ text: `Guild #${client.guilds.cache.size}` });

  
    // Set up the payload for the webhook request
    const payload = {
      embeds: [embed],
      username:  `${client.user.username} Leave`,
      avatar_url: client.user.displayAvatarURL({dynamic: false}),
    };
  
    // Make the HTTP POST request to the webhook URL
    axios.post(webhookURL, payload)
}