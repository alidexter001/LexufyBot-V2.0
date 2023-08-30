const {Permissions} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'automod',
    description: 'add the automod system to your server',
    category: '⚙️ admin',

    run: async(client, message, args) => {
        const sub = args.shift();

        let response;
        switch (sub) {
            case 'anti-invite':
                response = await antiinvite(message, args[0]);
                break;
            case 'anti-scam':
                response = await antiscam(message, args[0]);
                break;
            case 'anti-ghost-ping':
                response = await antighost(message, args[0]);
                break;
            case 'anti-link':
                response = await antilink(message, args[0]);
                break;
            case 'anti-ping':
                response = await antiping(message, args[0], args[1]);
                break;
            default:
                response = '❌ **| Invalid automod command.**';
        }
        await message.reply(response);
    }
}
async function antiinvite(message, input) {
    const db = message.client.db;
    const guildId = message.guild.id;
    const prefix = await db.get(`${guildId}.prefix`) || config.PREFIX
    if (!message.member.permissions.has('Administrator')) return '⛔ **| You should be an administrator to use this command.**'; 
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiinvite`, {status:status})
    return `✅ **| Automod \`Anti Invite\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antiscam(message, input) {
    const db = message.client.db;
    const guildId = message.guild.id;
    const prefix = await db.get(`${guildId}.prefix`) || config.PREFIX
    if (!message.member.permissions.has('Administrator')) return '⛔ **| You should be an administrator to use this command.**'; 
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiscam`, {status:status})
    return `✅ **| Automod \`Anti Scam\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antighost(message, input) {
    const db = message.client.db;
    const guildId = message.guild.id;
    const prefix = await db.get(`${guildId}.prefix`) || config.PREFIX
    if (!message.member.permissions.has('Administrator')) return '⛔ **| You should be an administrator to use this command.**'; 
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antighost`, {status:status})
    return `✅ **| Automod \`Anti GhostPing\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antilink(message, input) {
    const db = message.client.db;
    const guildId = message.guild.id;
    const prefix = await db.get(`${guildId}.prefix`) || config.PREFIX
    if (!message.member.permissions.has('Administrator')) return '⛔ **| You should be an administrator to use this command.**'; 
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antilink`, {status:status})
    return `✅ **| Automod \`Anti Link\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antiping(message, input, number) {
    const db = message.client.db;
    const guildId = message.guild.id;
    const prefix = await db.get(`${guildId}.prefix`) || config.PREFIX
    if (!message.member.permissions.has('Administrator')) return '⛔ **| You should be an administrator to use this command.**';
    let maxNumber;
    if (number && !isNaN(number) && number > 0) {
        maxNumber = parseInt(number);
    } else {
        maxNumber = 2; // Default value
    } 
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiping`, {status:status, max:maxNumber})
    return `✅ **| Automod \`Anti Ping\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}