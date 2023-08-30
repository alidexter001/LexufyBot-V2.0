const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'filter',
    category: '🎵 music',
    description: 'Apply a filter to the current Track',
    
    run: async(client, message, args) => {
        const sub = args.join(' ');
        let response;
        const filters = [
            '8d', 'nightcore', 'vaporwave', 'pop', 'soft', 
            'treblebass', 'karaoke', 'vibrato', 'tremolo', 'reset'
        ]
        if(sub == "8d") response =  await eightD(client, message, args);
        else if(sub == "nightcore") response = await nightcore(client, message, args);
        else if(sub == "vaporwave") response = await vaporwave(client, message, args);
        else if(sub == "pop") response = await pop(client, message, args);
        else if(sub == "soft") response = await soft(client, message, args);
        else if(sub == "treblebass") response = await treblebass(client, message, args);
        else if(sub == "karaoke") response = await karaoke(client, message, args);
        else if(sub == "vibrato") response = await vibrato(client, message, args);
        else if(sub == "tremolo") response = await tremolo(client, message, args);
        else if(sub == "reset") response = await reset(client, message, args); 
        else if(!filters.includes(sub)) response = await reset(client, message, args); 

        await message.reply(response);
    }

}
async function eightD(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.eightD ? true : false;
    player.eightD = !player.eightD;
    return `💫 8D Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function nightcore(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.nightcore ? true : false;
    player.nightcore = !player.nightcore;
    return `💫 NightCore Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function vaporwave(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.vaporwave ? true : false;
    player.vaporwave = !player.vaporwave;
    return `💫 VaporWave Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function pop(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.pop ? true : false;
    player.pop = !player.pop;
    return `💫 Pop Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function soft(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.soft ? true : false;
    player.soft = !player.soft;
    return `💫 Soft Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function treblebass(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.treblebass ? true : false;
    player.treblebass = !player.treblebass;
    return `💫 TrebleBass Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function karaoke(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.karaoke ? true : false;
    player.karaoke = !player.karaoke;
    return `💫 Karaoke Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function vibrato(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.vibrato ? true : false;
    player.vibrato = !player.vibrato;
    return `💫 Vibrato Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function tremolo(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.tremolo ? true : false;
    player.tremolo = !player.tremolo;
    return `💫 Tremolo Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function reset(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    player.reset();
    return `💫 All the the music filters have been **Disabled**`
}