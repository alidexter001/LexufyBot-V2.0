const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits} = require('discord.js')
const {filterScamlinks} = require('discord-automod');

const config = require(`${process.cwd()}/config.js`)
const invites = [
    'discord.gg',
    'dsc',
];
const links = [
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://'
];

const spamMap = new Map();
module.exports = async(message) => {
    if (message.author.bot || !message.guild) return;
    const prefix = await message.client.db.get(`${message.guild.id}.prefix`) || config.PREFIX;
    const client = message.client;

    const { members, roles, everyone } = message.mentions;

    const antiping = await client.db.get(`${message.guild.id}.automod.antiping.status`);
    const antiscam = await client.db.get(`${message.guild.id}.automod.antiscam.status`);
    const antipingmax = await client.db.get(`${message.guild.id}.automod.antiping.max`);
    const antilink = await client.db.get(`${message.guild.id}.automod.antilink.status`);
    const antiinvite = await client.db.get(`${message.guild.id}.automod.antiinvite.status`);
    if(antiping) {
        if(members.size >= antipingmax || roles.size >= antipingmax || everyone){
            return antipinging(message);
        }
    }
    if(antilink) {
        const containsBannedLink = links.some(link => message.content.includes(link));
        if(containsBannedLink){
            return antilinking(message);
        }
    }
    if(antiinvite){
        const containsBannedLink = invites.some(invite => message.content.includes(invite));
        if(containsBannedLink){
            return antiinviting(message);
        }
    }
    if(antiscam) {
        if (filterScamlinks(message.content) === true){
            return antiscaming(message);
        }
    }

    if(message.content.includes(`${client.user.id}`))
    {
        const embed = new EmbedBuilder()
        .setAuthor({name: `Greetings,I'm ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setColor('Random')
        .setDescription(`**[To See All The Commands Type: \`/help\`](${config.SUPPORT_SERVER})**
        >>> if you enjoy using **\`${client.user.username}\`**, please consider adding him to your server to keep it online and performing well.
        To Know More Information About The commands Type: \`/help\``)
        .addFields([
            {name: '**PREFIX:**', value: `**\`${prefix}\` or \`/\`**`}
        ])
        .setFooter({text: `Requested By: ${message.author.username}`})
        let components = [];
        const button = new ButtonBuilder()
	      .setLabel('✨ Support Server')
	      .setURL(config.SUPPORT_SERVER)
	      .setStyle(ButtonStyle.Link);
        

        const button2 = new ButtonBuilder()
	      .setLabel('💠 Invite Me')
	      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`)
	      .setStyle(ButtonStyle.Link);

        components.push(button, button2);
        if(config.DASHBOARD.ENABLED){
            const button3 = new ButtonBuilder()
            .setLabel('👑 Dashboard')
            .setURL(`${config.DASHBOARD.dashboardURL}:${config.DASHBOARD.PORT}`)
            .setStyle(ButtonStyle.Link);
            components.push(button3);
        }
        let buttonsRow = new ActionRowBuilder().addComponents(components);

        return message.reply({embeds: [embed], components: [buttonsRow]})
    }
     // Prefix Command Handling
    try{
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        cmd.run(client, message, args).then(async() => {
            await client.db.add(`command_used`, 1)
        });

    }catch(e){console.log(e)}

}
async function antipinging(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) return
    const client = message.client;
    const { members, roles, everyone } = message.mentions;
    message.delete();
    message.channel.send(`📌 **| Ping Detected: \`${message.author.username}\` you are not allowed to mass ping.**`)
    .then((m) =>{
        setTimeout(() =>{
            m.delete();
        }, 3000)
    })



}
async function antiinviting(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) return
    const client = message.client;
    const { members, roles, everyone } = message.mentions;
    message.delete();
    message.channel.send(`📩 **| invite Detected: \`${message.author.username}\` you are not allowed to send invite Links.**`)
    .then((m) =>{
        setTimeout(() =>{
            m.delete();
        }, 3000)
    })
}
async function antilinking(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) return
    const client = message.client;
    const { members, roles, everyone } = message.mentions;
    message.delete();
    message.channel.send(`🔗 **| Link Detected: \`${message.author.username}\` you are not allowed to send Links.**`)
    .then((m) =>{
        setTimeout(() =>{
            m.delete();
        }, 3000)
    })
}
async function antiscaming(message) {
    if (message.member.permissions.has('ADMINISTRATOR')) return
    const client = message.client;
    const { members, roles, everyone } = message.mentions;
    message.delete();
    message.channel.send(`🤣 **| Scam Detected: \`${message.author.username}\` you are not allowed to send scam Links.**`)
    .then((m) =>{
        setTimeout(() =>{
            m.delete();
        }, 3000)
    })
}