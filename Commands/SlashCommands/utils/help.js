const {EmbedBuilder, ButtonBuilder, ButtonComponent, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ComponentType} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);
const openMenus = new Map();
module.exports = {
    name: 'help',
    description: 'Show the list of all the available commands.',
    category: '🛠️ utils',
    run: async(interaction) => {

        try{
            if (openMenus.has(interaction.member.id)) {
                interaction.reply(`❌ **| You can't open more than 1 menu at the time.**`)
                .then((m) => {
                    setTimeout(() =>m.delete(), 3000)
                })
                return;
            }
            openMenus.set(interaction.member.id, true);
            const componentDisplayDuration = 30 * 1000;
            let componentTimer;

            const emojis = {
            music: '🎵',
            utils: '🛠️',
            admin: '⚙️'
            }
            const directory = [
                ...new Set(interaction.client.slashCommands.map(cmd => cmd.category))
            ];

            const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    
            const categories = directory.map(dir => {
                const getCommands = interaction.client.slashCommands.filter(cmd => cmd.category === dir)
                .map(cmd => {
                    return {
                        name: cmd.name,
                        description: cmd.description || `This command don't have a description.`
                    };
                });
                return {
                    directory: formatString(dir),
                    commands: getCommands
                };
            });

            let componentss = [];
            const button = new ButtonBuilder()
                .setLabel('💠 Invite Me')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`)
                .setStyle(ButtonStyle.Link);
            const button2 = new ButtonBuilder()
                .setLabel('✨ Support Server')
                .setURL(config.SUPPORT_SERVER)
                .setStyle(ButtonStyle.Link);
            componentss.push(button, button2);

            if (config.DASHBOARD.ENABLED) {
                const button3 = new ButtonBuilder()
                    .setLabel('👑 Dashboard')
                    .setURL(`${config.DASHBOARD.dashboardURL}:${config.DASHBOARD.PORT}`)
                    .setStyle(ButtonStyle.Link);
                componentss.push(button3);
            }
            let buttonsRow = new ActionRowBuilder().addComponents(componentss);
    
            const embed = new EmbedBuilder()
            .setAuthor({ name: `🗒️ All the available commands of ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
            .setColor('Random')
            .setFooter({ text: `Requested by: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription('**Select a category to display from the DropDown Menu**.');
        
            const components = (state) => [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('help menu')
                    .setPlaceholder('Select a command category.')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLocaleLowerCase(),
                                description: `commands from ${cmd.directory} category.`,
                                emoji: emojis[cmd.directory.toLocaleLowerCase() || null]
    
                            };
                        })
                    )
                ),
            ];
            const initialMessage = await interaction.reply({
                embeds: [embed],
                components: components(false),
            });

            const setComponentTimer = () => {
                clearTimeout(componentTimer);
                componentTimer = setTimeout(async () => {
                    await initialMessage.edit({ components: [buttonsRow] });
                    openMenus.delete(interaction.member.id);
                }, componentDisplayDuration);
            };

            setComponentTimer();
    
            const filter = (interaction) => interaction.user.id === interaction.member.id;

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                componentType: ComponentType.SelectMenu,
            });

            collector.on("collect", (interaction) => {
                const [directory] = interaction.values;
                const category = categories.find((x) => 
                    x.directory.toLocaleLowerCase() === directory

                );

                const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(directory)} Commands`)
                .setDescription(`List of all the commands under **\`${category.directory}\`** category`)
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .setColor('Random')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`/${cmd.name}\``,
                            value: `**${cmd.description}**`,
                            inline: false,
                        }
                    })
                );
                interaction.update({embeds: [categoryEmbed]});

                setComponentTimer();
            })
            collector.on("end", () => {
                initialMessage.edit({components: [components(true)]})
            })
        }catch{}
    }
}