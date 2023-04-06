const { ShardingManager } = require('discord.js');
require('dotenv').config();

const manager = new ShardingManager('./bot.js', {
	totalShards: parseInt(process.env.SHARD_NUMBER) || "auto",
	token: process.env.DISCORD_TOKEN,
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn()
.then(() => console.log('Shards have been spawned successfully.'))
  .catch((err) => console.error(`Error while spawning shards: ${err}`));
	

