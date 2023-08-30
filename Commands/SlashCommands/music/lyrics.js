const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
const Genius = require("genius-lyrics");

const msToHms = require('ms-to-hms')

module.exports = {
    name: 'lyrics',
    category: '🎵 music',
    description: 'Show the current song Lyrics',
    run: async(interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await lyrics(interaction);
        interaction.followUp(response);
    }
}
async function lyrics(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    if(!player || !player.queue.current) return `❌ **| Nothing Is Played Right Now.**`
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`
    try{
        const searches = await interaction.client.genius.songs.search(player.queue.current.title);
        if(!searches || searches.length === 0) return `❌ **| There is no available lyrics for this Track.**`;
        const firstSong = searches[0];
        if (!firstSong || !firstSong.lyrics) return `❌ **| There is no available lyrics for this Track.**`;
        const lyrics = await firstSong.lyrics();
        const current = player.queue.current;

        if(!lyrics || lyrics.length === 0) return `❌ **| There is no available lyrics for this Track.**`;

        const chunks = lyrics.match(/[\s\S]{1,2000}/g) || [lyrics];

        const embed = new EmbedBuilder()
        .setTitle(`🎵 Lyrics for "${player.queue.current.title}"`)
        if (typeof current.displayThumbnail === "function") embed.setThumbnail(current.displayThumbnail("hqdefault"))
        .setColor(config.EMBED_COLORS.GREEN);
        for (let i = 0; i < chunks.length; i++) {
            const fieldName = `Part ${i + 1}`;
            const fieldValue = chunks[i];
            if (fieldValue.length > 1024) {
                const fieldChunks = fieldValue.match(/[\s\S]{1,1024}/g) || [fieldValue];
                for (let j = 0; j < fieldChunks.length; j++) {
                    const subFieldName = `${fieldName} (Cont. ${j + 1})`;
                    embed.addFields([{name: subFieldName, value: fieldChunks[j]}]);
                }
            } else {
                embed.addFields([{name: fieldName, value: fieldValue}]);
            }
        }
        embed.addFields([
            {name: '**⏲️Duration**', value: current.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(current.duration)}\``, inline: true},
            {name: '**🖋️Author**', value: "`" + current.author + "`", inline: true},
            {name: '**🌐Link**', value: "`" +current.uri+ "`", inline: false},
        ])
        return { embeds: [embed] };


    }catch(e){ console.log(e); return `❌ **| Something Went Wrong.**`}
}