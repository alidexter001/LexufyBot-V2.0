const { EmbedBuilder } = require("discord.js");
const config = require(`${process.cwd()}/config.js`)
module.exports = async(message) => {

    const client = message.client;
    if (message.partial) return;
    if (message.author.bot || !message.guild) return;
    const settings = await client.db.get(`${message.guild.id}.automod.antighost.status`);
    const { members, roles, everyone } = message.mentions;

    if(!settings) return;
    if (message.member.permissions.has('ADMINISTRATOR')) return;

    if (members.size > 0 || roles.size > 0 || everyone) {
    
        const embed = new EmbedBuilder()
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
          .setTitle("👻 | Ghost ping detected")
          .setThumbnail(message.author.displayAvatarURL())
          .setColor(config.EMBED_COLORS.RED)
          .setDescription(
            `**Message:**\n${message.content}\n\n` +
              `**Author:** ${message.author.tag} (\`${message.author.id}\`)\n` +
              `**Channel:** ${message.channel.toString()}`
          )
          .addFields([
            {name: 'Members:', value: members.size.toString(), inline: true},
            {name: 'Roles:', value: roles.size.toString(), inline: true},
            {name: 'Everyone?:', value: everyone.toString(), inline: true},
          ])
          .setFooter({ text: `Sent at: ${message.createdAt}` });
    
        message.channel.send({ embeds: [embed] });
      }


}