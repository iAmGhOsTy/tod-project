const { WebhookClient } = require("discord.js");
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/977787105243701338/wCFXoqfBgnwpbcoReg1HgCr38MSspArgXZb_twirIqaCFukR84ntjHutSEppMonDY7OK' });
module.exports = async (client, data) => {
    client.logger.log(`Bot Being Ratelimited Check LOGS`, "ratelimit");
    webhookClient.send(`\`\`\`js\n
    Timeout for: ${data.timeout}\n
    Limit: ${data.limit}\n
    Methods: ${data.method}\n
    Path: ${data.path}\n
    Route: ${data.route}\n
    Global: ${data.global}\`\`\``)
}