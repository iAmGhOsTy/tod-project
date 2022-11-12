


module.exports = async (client) => {

  //  client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers`, "ready");

    let statuses = ['/truth', `/help`];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "WATCHING"});
  	}, 10000)
}