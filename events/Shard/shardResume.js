module.exports = async (client,id, replayedEvents) => {
    client.logger.log(`Shard ${id} resumed with ${replayedEvents} replayed events`, "shard");
    
}