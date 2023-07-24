const { ClusterManager } = require('discord-hybrid-sharding');
require('dotenv').config();

const manager = new ClusterManager(`${__dirname}/bot.js`, {
    totalShards: process.env.CLUSTER_NUMBER || "auto", // or 'auto'
    /// Check below for more options
    //shardsPerClusters: 3,
    //totalClusters: 3,
    mode: 'process', // you can also choose "worker"
    token: process.env.DISCORD_TOKEN,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
