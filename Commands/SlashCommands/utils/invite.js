const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'invite',
    category: '🛠️ utils',
    description: 'Invite me to you discord server',

    run: async(interaction) =>{
        
        try{
            const member = interaction.member
            const client = interaction.client

            const embed = new EmbedBuilder()
            .setTitle('✅ Invite.')
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(config.EMBED_COLORS.RED)
            .setDescription(`> ** We thank you for considering that *\`${client.user.tag}\`* is useful for you.** 
            
            > ** We always invite you to join our Community also to inform us of any type of bugs or issues**
            
            > ** This bot is totally free, so you can enjoy all type of his utilities without wasting your money.**`)

            let components = [];

            const button = new ButtonBuilder()
                .setLabel('💠 Invite Me')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`)
                .setStyle(ButtonStyle.Link);
            const button2 = new ButtonBuilder()
                .setLabel('✨ Support Server')
                .setURL(config.SUPPORT_SERVER)
                .setStyle(ButtonStyle.Link);
            components.push(button, button2);

            if (config.DASHBOARD.ENABLED) {
                const button3 = new ButtonBuilder()
                    .setLabel('👑 Dashboard')
                    .setURL(`${config.DASHBOARD.dashboardURL}:${config.DASHBOARD.PORT}`)
                    .setStyle(ButtonStyle.Link);
                components.push(button3);
            }

            let buttonsRow = new ActionRowBuilder().addComponents(components);


            await interaction.reply({content: "📩 **| *Check Your DMs...***", ephemeral: true})
            member.send({embeds: [embed], components: [buttonsRow]}).catch((() => interaction.editReply({content: '❌ **| Your DMs Are Closed...**', ephemeral: true})))
        }catch(e){console.log(e)}
    }
}