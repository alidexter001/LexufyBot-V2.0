const {EmbedBuilder} = require('discord.js')
const msToHms = require("ms-to-hms");
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'queue',
    category: '🎵 music',
    description: 'Display the current guild queue',
    options: [{
        name: 'page',
        description: 'the page to display',
        type: 4,
        required: false,
    }],
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = getQueue(interaction);
        interaction.followUp(response);
    }
}
function getQueue(interaction) {
    const page = interaction.options.getInteger("page");
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;

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