const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
const msToHms = require('ms-to-hms')

module.exports = {
    name: 'grab',
    category: '🎵 music',
    description: 'Grab the current played song to your DMs',

    run: async(client, message, args) =>{
        const player = client.manager.get(message.guild.id);

        if(!player || !player.playing) return message.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = message.member.voice.channel;
        const botChannel = message.guild.members.me.voice.channel;

        if(!channel) return message.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return message.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        try{
            const current = player.queue.current;
            const embed = new EmbedBuilder()
            .setTitle(`✅ Saved.`)
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`***[${current.title}](${current.uri})***`)
            .addFields([
                {name: '**⏲️Duration**', value: current.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(current.duration)}\``, inline: true},
                {name: '**🖋️Author**', value: "`" + current.author + "`", inline: true},
                {name: '**🌐Link**', value: "`" +current.uri+ "`", inline: false},
            ])
            .setColor(config.EMBED_COLORS.GREEN)
            if (typeof current.displayThumbnail === "function") embed.setThumbnail(current.displayThumbnail("hqdefault"))

            message.member.send({embeds: [embed]}).catch(((m) => message.edit({content: '❌ **| Your DMs Are Closed...**', ephemeral: true})))
            .then(() => {
                message.reply(`📩 **| *Check Your DMs...***`)
            })
            .catch(() => {
                message.reply('❌ **| Your DMs Are Closed...**');
            });
        }catch(e){console.log(e)}
    }
}