const { ClusterManager } = require('discord-hybrid-sharding');

require('dotenv').config();

const manager = new ClusterManager(`${__dirname}/bot.js`, {
    totalShards: 3 || "auto", // or 'auto'
    // Check below for more options
    //shardsPerClusters: 3,
    totalClusters: 1,
    mode: 'process', // you can also choose "worker"
    token: process.env.DISCORD_TOKEN,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
// manager.on("debug" , (message) => console.log(message))
// manager.on("clientRequest",(r)=>{console.log(r)})
manager.on("clusterReady",(c)=>console.log(`Cluster ${c.id} is ready.`))
manager.spawn({ timeout: -1 });
