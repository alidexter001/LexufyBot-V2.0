require('dotenv').config();
const {Manager} = require('erela.js');
const Spotify = require('better-erela.js-spotify').default;
const Facebook = require('erela.js-facebook');
const Deezer = require('erela.js-deezer');
const {EmbedBuilder} = require('discord.js');
const msToHms = require('ms-to-hms')
const config = require('../config.js');
const filter  = require("erela.js-filters");

const express = require('express');
const app = express();

module.exports = async(client) => {
    const plugins = [
        new Facebook(),
        new Deezer(),
        new filter(),
    ];
    if(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_ID_SECRET){
        plugins.push(new Spotify({
            clientID: config.SPOTIFY.CLIENT_ID,
            clientSecret: config.SPOTIFY.CLIENT_SECRET,
            albumPageLimit: config.SPOTIFY.ALBUM_LIMIT,
            playlistPageLimit: config.SPOTIFY.PLAYLIST_LIMIT,
            convertUnresolved: true,
        }));
    }
    client.manager = new Manager({
        nodes: config.NODES,
        defaultSearchPlatform: "youtube",
        autoPlay: true,
        plugins,


        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    });
};
