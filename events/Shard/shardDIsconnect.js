module.exports = async (client,event,id) => {
    client.logger.log(`Shard ${id} disconnected (${event.code})`, "shard");

    
}