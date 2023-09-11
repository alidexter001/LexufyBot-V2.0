const { Client ,GatewayIntentBits, Partials, ApplicationCommandType } = require("discord.js");

module.exports = class extends Client {
    constructor(config) {
        super({
            intents: [GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildScheduledEvents],
            partials: [Partials.User,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.ThreadMember,
                Partials.Reaction],
            allowedMentions: {
                repliedUser: false,
            },
        });
        this.config = config;
    }
}