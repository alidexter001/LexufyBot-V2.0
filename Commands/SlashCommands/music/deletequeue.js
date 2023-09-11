module.exports = {
    name: 'deletequeue',
    category: '🎵 music',
    description: 'delete the queue from your database',
    options: [{
        name: 'name',
        description: 'the name that you saved the queue as',
        required: true,
        type: 3
    }],
    run: async (interaction) => {
        await interaction.deferReply({fetchReply: true});
        const response = await savequeue(interaction);
        interaction.followUp(response);
    }
}
async function savequeue(interaction) {
    const name = interaction.options.getString('name');
    if(!name) return `❌ **| You have to provide a name to delete from you saved list.**`
    const queuename = await interaction.client.db.get(`${interaction.member.user.id}_savedQueue.${name}`)
    if(!queuename) return `❌ **| There is no queue registred on this name.**`


    await interaction.client.db.delete(`${interaction.member.user.id}_savedQueue.${name}`);
    return `✅ **| Successfully deleted ${name} from your saved queue database.**.`
}