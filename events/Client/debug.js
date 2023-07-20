const{WebhookClient} = require('discord.js')
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/997926918588473475/hCQMGuwLJOGEHQMVjFP-3NJc1NyXaz7YVjbOy8oA3OiAh8JuqEYbLY5bphDsp8u6NKAs' });
module.exports = async (client, info) => {

    client.logger.log(`${info}`, "debug")

//    webhookClient.send(`\`\`\`js\n${info}\`\`\``)
}