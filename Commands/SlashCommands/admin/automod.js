const { Permissions} = require('discord.js')
module.exports = {
    name: 'automod',
    description: 'add the automod system to your server',
    category: '⚙️ admin',
    options: [
        {
            name: 'anti-invite',
            description: '<activate/desactivate> anti-invite system',
            type: 1,
            options: [{
                name: 'status',
                description: 'anti-invite system status <ON/OFF>',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'ON',
                        value: 'ON',
                    },
                    {
                        name: 'OFF',
                        value: 'OFF',
                    }
                ]
            }]
        },
        {
            name: 'anti-link',
            description: '<activate/desactivate> anti-link system',
            type: 1,
            options: [{
                name: 'status',
                description: 'anti-link system status <ON/OFF>',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'ON',
                        value: 'ON',
                    },
                    {
                        name: 'OFF',
                        value: 'OFF',
                    }
                ]
            }]
        },
        {
            name: 'anti-ping',
            description: '<activate/desactivate> anti-ping system',
            type: 1,
            options: [{
                name: 'status',
                description: 'anti-ping system status <ON/OFF>',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'ON',
                        value: 'ON',
                    },
                    {
                        name: 'OFF',
                        value: 'OFF',
                    }
                ]
            },
            {
                name: 'number',
                description: 'max number of mention per message <default: 2>',
                required: true,
                type: 4,
            }]
        },
        {
            name: 'anti-scam',
            description: '<activate/desactivate> anti-scam system',
            type: 1,
            options: [{
                name: 'status',
                description: 'anti-scam system status <ON/OFF>',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'ON',
                        value: 'ON',
                    },
                    {
                        name: 'OFF',
                        value: 'OFF',
                    }
                ]
            }]
        },
        {
            name: 'anti-ghost-ping',
            description: '<activate/desactivate> anti-ghost-ping system',
            type: 1,
            options: [{
                name: 'status',
                description: 'anti-ghost-ping system status <ON/OFF>',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'ON',
                        value: 'ON',
                    },
                    {
                        name: 'OFF',
                        value: 'OFF',
                    }
                ]
            }]
        }, 
    ],
    run: async (interaction) => {
        await interaction.deferReply({fetchReply: true});
        const sub = interaction.options.getSubcommand();
        let response;
        if(sub === 'anti-invite') response = await antiinvite(interaction, interaction.options.getString('status'));
        if(sub === 'anti-scam') response = await antiscam(interaction, interaction.options.getString('status'));
        if(sub === 'anti-ghost-ping') response = await antighost(interaction, interaction.options.getString('status'));
        if(sub === 'anti-link') response = await antilink(interaction, interaction.options.getString('status'));
        if(sub === 'anti-ping') response = await antiping(interaction, interaction.options.getString('status'), interaction.options.getInteger('number'));
        
        await interaction.followUp(response);

    }
}
async function antiinvite(interaction, input){
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
    const db = interaction.client.db;
    const guildId = interaction.guild.id;
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiinvite`, {status:status})
    return `✅ **| Automod \`Anti Invite\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antilink(interaction, input){
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
    const db = interaction.client.db;
    const guildId = interaction.guild.id;
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antilink`, {status:status})
    return `✅ **| Automod \`Anti Link\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antiscam(interaction, input){
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
    const db = interaction.client.db;
    const guildId = interaction.guild.id;
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiscam`, {status:status})
    return `✅ **| Automod \`Anti Scam\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antighost(interaction, input){
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
    const db = interaction.client.db;
    const guildId = interaction.guild.id;
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antighost`, {status:status})
    return `✅ **| Automod \`Anti GhostPing\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}
async function antiping(interaction, input, number) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
    if(!number || number <= 0) number = 2
    const db = interaction.client.db;
    const guildId = interaction.guild.id;
    const status = input.toUpperCase() === "ON" ? true : false;
    await db.set(`${guildId}.automod.antiping`, {status:status, max:number})
    return `✅ **| Automod \`Anti Ping\` system: <\`${status ? 'Activated' : 'Desactivated'}\`>**`
}