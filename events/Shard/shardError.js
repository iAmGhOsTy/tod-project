module.exports = async (client,error) => {
    client.logger.log(`Shard ${error.id} error: ${error.error}`, "shard");

    
}