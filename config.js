require('dotenv').config();
module.exports = {
    SUPPORT_SERVER: 'https://discord.gg/c4-clan-community-917454141087965244',
    OWNER_ID: "",// Your discord id
    CLIENT_ID: '',// Your Bot id
    PREFIX: '!',// Your general prefix
    PERMISSIONS: '8',
    BOT_PRESENCE: {
        ENABLED: true, // Whether or not the bot should update its status
        STATUS: "idle", // The bot's status [online, idle, dnd, invisible]
        TYPE: 2, // Status type for the bot [PLAYING = 0 | STREAMING = 1 | LISTENING = 2 | WATCHING = 3 | CUSTOM = 4 | COMPETING = 5 ]
        MESSAGE: "/play | On {servers} Guilds", // Your bot status message, {users} = users size on all the servers | {servers} = servers size that are available
    },
    DASHBOARD: {
        ENABLED: true, // true, if you want the dashboard to be shown, false otherwise [disabled]
        CLIENT_ID: process.env.CLIENT_ID || "", // your bot client ID
        CLIENT_SECRET: process.env.CLIENT_SECRET || "", // your bot client secret
        PASSWORD: process.env.TOP_SECRET_PASSWORD || "mypassword", // your top secret password, you can change it to anything you want
        PORT: process.env.PORT || 80, // your dashboard port number
        dashboardURL: "http://localhost",
        callbackURL: "/auth", //don't change this
    },
    MUSIC: {
        IDLE_TIME: 10,//time in seconds before the client disconnects from the voice channel.
        A24: false, // true = continue playing 24/7H, false = stop playing when no one listens to the bot
    },
    NODES: [  
        {
            host: "lava.link",
            identifier: 'main1',
            port: 80,
            password: "anypassword",
            secure:  false,
            retryAmount: 30,
            retryDelay: 10000
        },
    ],
    SPOTIFY:{
        CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        CLIENT_SECRET: process.env.SPOTIFY_CLIENT_ID_SECRET,
        ALBUM_LIMIT: 1,
        PLAYLIST_LIMIT: 1,

    },
    GENIUS: {
       TOP_SECRET_API_KEY: process.env.TOP_SECRET_API_GENIUS
    },
    EMBED_COLORS: {
        RED: '#ff0000',
        BLUE: '#0000ff',
        GREEN: '#00ff00',
        BLACK: '#000000',
        YELLOW: '#ffdf00',
        PINK: '#cd919e',
        PURPLE: '#86608e',
    },
    webhookURL: {
        JOIN: '',// Your join webhook URL
        LEAVE: ''// Your leave Webhook URL
    }
}