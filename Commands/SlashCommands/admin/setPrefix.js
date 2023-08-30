module.exports = {
    name: 'set-prefix',
    description: 'Sets a custom prefix for the bot.',
    category: '⚙️ admin',
    options: [{
        name: 'prefix',
        description: 'The new prefix for the bot on the server.',
        type: 3,
        required: true
    }],
    run: async (interaction) => {
        
        await interaction.deferReply({fetchReply: true});
        const response = await setPrefix(interaction);
        interaction.followUp(response)


    }

}
async function setPrefix(interaction) {
    const prefix = interaction.options.getString('prefix');
    if (!interaction.member.permissions.has('ADMINISTRATOR')) 
        return '⛔ **| You Should be an administrator to use this command.**'
        
    await interaction.client.db.set(`${interaction.guild.id}.prefix`, prefix);
    return `✅ **| Successfully set the prefix of this server to: \`${prefix}\`**`
}