const {EmbedBuilder} = require('discord.js')
const msToHms = require("ms-to-hms");
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'queue',
    category: '🎵 music',
    description: 'Display the current guild queue',
    run: async(client, message, args) => {
        const response = getQueue(client, message, args);
        message.reply(response);
    }
}
function getQueue(client, message, args) {
    // const page = message.content.split(' ')[1] || 1;
    const page = !isNaN(args) ? parseInt(args) : 1;
    if (isNaN(page) || page <= 0) {
        return `❌ **| Please provide a valid page number greater than 0.**`;
    }
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;

    if(!player) return `❌ **| Nothing Is Played Right Now**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    const queue = player.queue;

    const embed = new EmbedBuilder()
    .setAuthor({name: `📑 The Current Queue`})
    .setColor(config.EMBED_COLORS.BLUE)


    const multiple = 10;// change for the amount of tracks per page
    const pagen = page || 1;

    const end = pagen * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if(queue.current) embed.addFields([{name: `Current: `, value: `**[${queue.current.title}](${queue.current.uri})**`}])

    if (!tracks.length) embed.setDescription(`No tracks in ${pagen > 1 ? `page ${pagen}` : "the queue"}.`);
    else embed.setDescription(tracks.map((track, i) => `\`${start + ++i}\` - **[${track.title}](${track.uri})**`).join("\n"));

    embed.addFields([{name: `Queue Duration:`, value: "***`"+(msToHms(queue.duration)+"`***"), inline: true}])
    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter({ text: `Page ${pagen > maxPages ? maxPages : pagen} of ${maxPages}` });

    return {embeds: [embed]}
}