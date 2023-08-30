module.exports = {
    name: 'set-prefix',
    description: 'Sets a custom prefix for the bot.',
    category: '⚙️ admin',
    run: async (client, message, args) => {
        const response = await setPrefix(client, message, args);
        message.reply(response)

    }

}
async function setPrefix(client, message, args) {
    const prefix = args.join(' ');
    if (!message.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
        
    await client.db.set(`${message.guild.id}.prefix`, prefix);
    return `✅ **| Successfully set the prefix of this server to: \`${prefix}\`**`
}