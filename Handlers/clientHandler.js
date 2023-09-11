const fs = require('fs');
const path = require('path');
var colors = require('colors');
module.exports = async(client) => {
    // Loading Events
    console.log(`[${colors.green('HANDLERS')}] Loading ${colors.cyan('Client Events...')}`);
    fs.readdirSync(`${process.cwd()}/Events/client`)
    .filter(files => files.endsWith('.js'))
    .forEach(file => {
        const pull = require(`${process.cwd()}/Events/client/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, pull);
    });
    // Loading SlashCommands
    const slashCommandsArray = [];
    console.log(`[${colors.green('HANDLERS')}] Loading ${colors.cyan('Slash Commands...')}`);
    fs.readdirSync(`${process.cwd()}/Commands/SlashCommands`)
    .forEach(directory => {
        fs.readdirSync(`${process.cwd()}/Commands/SlashCommands/${directory}`)
        .filter(files => files.endsWith('.js'))
        .forEach(file => {
            const pull = require(`${process.cwd()}/Commands/SlashCommands/${directory}/${file}`)
            client.slashCommands.set(pull.name, pull);
            slashCommandsArray.push(pull);
        })
    })
    // Loading PrefixCommands
    console.log(`${colors.green('HANDLERS')}] Loading ${colors.cyan('Prefix Commands...')}`)
    const commands = [];
    fs.readdirSync(`${process.cwd()}/Commands/PrefixCommands`)
    .forEach(directory => {
        const files = fs.readdirSync(`${process.cwd()}/Commands/PrefixCommands/${directory}/`)
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
            let pull = require(`${process.cwd()}/Commands/PrefixCommands/${directory}/${file}`);
            client.commands.set(pull.name, pull);
            commands.push(pull);
        })

    })
    //
    client.on(`ready`, async () => {
        if(client.deploySlash.enabled) {
            if(client.deploySlash.guild) {
                client.guilds.cache.get(client.deploySlash.guild).commands.set(slashCommandsArray); 
            } else {
                client.application.commands.set(slashCommandsArray);
            }
        } 
    });

    // AntiCrash
    process.on('unhandledRejection', (reason, p) => {
        console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase());
        console.log('Reason: ', reason.stack ? String(reason.stack) : String(reason));
        console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase());
    });
    process.on("uncaughtException", (err, origin) => {
        console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase());
        console.log('Exception: ', err.stack ? err.stack : err)
        console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase());
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase());
    });
}