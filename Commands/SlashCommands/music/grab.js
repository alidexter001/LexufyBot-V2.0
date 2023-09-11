const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
const msToHms = require('ms-to-hms')

module.exports = {
    name: 'grab',
    category: '🎵 music',
    description: 'Grab the current played song to your DMs',

    run: async(interaction) =>{
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player || !player.playing) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        try{
            const current = player.queue.current;
            const embed = new EmbedBuilder()
            .setTitle(`✅ Saved.`)
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`***[${current.title}](${current.uri})***`)
            .addFields([
                {name: '**⏲️Duration**', value: current.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(current.duration)}\``, inline: true},
                {name: '**🖋️Author**', value: "`" + current.author + "`", inline: true},
                {name: '**🌐Link**', value: "`" +current.uri+ "`", inline: false},
            ])
            .setColor(config.EMBED_COLORS.GREEN)
            if (typeof current.displayThumbnail === "function") embed.setThumbnail(current.displayThumbnail("hqdefault"))

            await interaction.reply({content: "📩 **| *Check Your DMs...***", ephemeral: true})
            interaction.member.send({embeds: [embed]}).catch((() => interaction.editReply({content: '❌ **| Your DMs Are Closed...**', ephemeral: true})))
        }catch(e){console.log(e)}
    }
}