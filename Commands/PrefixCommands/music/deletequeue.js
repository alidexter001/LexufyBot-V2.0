module.exports = {
    name: 'deletequeue',
    category: '🎵 music',
    description: 'delete the queue from your database',
    options: [{
        name: 'name',
        description: 'the name to save the queue as',
        required: true,
        type: 3
    }],
    run: async (client, message, args) => {
        const response = await savequeue(client, message, args);
        message.reply(response);
    }
}
async function savequeue(client, message, args) {
    const name = args.join(' ');
    if(!name) return `❌ **| You have to provide a name to delete from you saved list.**`
    const queuename = await client.db.get(`${message.member.user.id}_savedQueue.${name}`)
    if(!queuename) return `❌ **| There is no queue registred on this name.**`


    await client.db.delete(`${message.member.user.id}_savedQueue.${name}`);
    return `✅ **| Successfully deleted ${name} from your saved queue database.**.`
}