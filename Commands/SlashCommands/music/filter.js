const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'filter',
    category: '🎵 music',
    description: 'Apply a filter to the current Track',
    options: [
        {
            name: 'filters',
            type: 3,
            description: 'The filter to apply to the current Track',
            required: true,
            choices: [
                {
                    name: '8d',
                    value: '8d',
                },
                {
                    name: 'nightcore',
                    value: 'nightcore',
                },
                {
                    name: 'vaporwave',
                    value: 'vaporwave',
                },
                {
                    name: 'pop',
                    value: 'pop',
                },
                {
                    name: 'soft',
                    value: 'soft',
                },
                {
                    name: 'treblebass',
                    value: 'treblebass',
                },
                {
                    name: 'karaoke',
                    value: 'karaoke',
                },
                {
                    name: 'vibrato',
                    value: 'vibrato',
                },
                {
                    name: 'tremolo',
                    value: 'tremolo',
                },
                {
                    name: 'reset',
                    value: 'reset',
                }
            ]}
    ],
    run: async(interaction) => {
        const sub = interaction.options.getString('filters');
        await interaction.deferReply({fetchReply: true});
        let response;
        if(sub == "8d") response =  await eightD(interaction);
        else if(sub == "nightcore") response = await nightcore(interaction);
        else if(sub == "vaporwave") response = await vaporwave(interaction);
        else if(sub == "pop") response = await pop(interaction);
        else if(sub == "soft") response = await soft(interaction);
        else if(sub == "treblebass") response = await treblebass(interaction);
        else if(sub == "karaoke") response = await karaoke(interaction);
        else if(sub == "vibrato") response = await vibrato(interaction);
        else if(sub == "tremolo") response = await tremolo(interaction);
        else if(sub == "reset") response = await reset(interaction); 

        await interaction.followUp(response);
    }

}
async function eightD(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.eightD ? true : false;
    player.eightD = !player.eightD;
    return `💫 8D Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function nightcore(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.nightcore ? true : false;
    player.nightcore = !player.nightcore;
    return `💫 NightCore Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function vaporwave(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.vaporwave ? true : false;
    player.vaporwave = !player.vaporwave;
    return `💫 VaporWave Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function pop(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.pop ? true : false;
    player.pop = !player.pop;
    return `💫 Pop Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function soft(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.soft ? true : false;
    player.soft = !player.soft;
    return `💫 Soft Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function treblebass(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.treblebass ? true : false;
    player.treblebass = !player.treblebass;
    return `💫 TrebleBass Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function karaoke(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.karaoke ? true : false;
    player.karaoke = !player.karaoke;
    return `💫 Karaoke Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function vibrato(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.vibrato ? true : false;
    player.vibrato = !player.vibrato;
    return `💫 Vibrato Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function tremolo(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    const status = player.tremolo ? true : false;
    player.tremolo = !player.tremolo;
    return `💫 Tremolo Filter status has been set to **${status ? "OFF" : "ON"}** `
}
async function reset(interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return`❌ **| You have to be on the same voice channel as mine to use this command.**`

    player.reset();
    return `💫 All the the music filters have been **Disabled**`
}