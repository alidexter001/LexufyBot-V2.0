const { EmbedBuilder } = require('discord.js')
const client = require(`${process.cwd()}/bot.js`).client;
const config = require(`${process.cwd()}/config.js`)
module.exports = async(oldState, newState) => {

    client.manager.updateVoiceState(oldState, newState)
    let guildId = newState.guild.id;
    const player = client.manager.get(guildId);
    if(!config.MUSIC.A24){
        if (!player || player.state !== "CONNECTED") return;
        const stateChange = {};

        if (oldState.channel === null && newState.channel !== null)
        stateChange.type = "JOIN";
        if (oldState.channel !== null && newState.channel === null)
        stateChange.type = "LEAVE";
        if (oldState.channel !== null && newState.channel !== null)
        stateChange.type = "MOVE";
        if (oldState.channel === null && newState.channel === null) return; // you never know, right
        if (newState.serverMute == true && oldState.serverMute == false)
            return player.pause(true);
        if (newState.serverMute == false && oldState.serverMute == true)
            return player.pause(false);

        if (stateChange.type === "MOVE") {
            if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
            if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
        }
        if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
        if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;
  
        if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
            return;
  
        stateChange.members = stateChange.channel.members.filter((member) => !member.user.bot);
  
        switch (stateChange.type) {
            case "JOIN":
                if (stateChange.members.size === 1 && player.paused && player) {
                let emb = new EmbedBuilder()
                .setTitle(`Resuming paused queue`)
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
                .setColor(config.EMBED_COLORS.GREEN)
                .setDescription(`> ▶️ **Resuming playback because *\`I Was Alone On This Voice Channel\`* **`);
                await client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
  
                player.pause(false);
                }
            break;
            case "LEAVE":
                if (stateChange.members.size === 0 && !player.paused && player.playing && player) {
                    player.pause(true);
  
                    let emb = new EmbedBuilder()
                    .setTitle('PAUSED!')
                    .setColor(config.EMBED_COLORS.RED)
                    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
                    .setDescription(`> ⏸️ **The player has been paused because *\`I Am Alone On This Voice Channel\`* **`);
                    await client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
                }
            break;
        }
    }
}