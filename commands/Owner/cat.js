const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "cat",
    category: "Owner",
    description: "show cat",
    args: false,
    usage: "cat",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        fetch('https://some-random-api.ml/animal/cat')
        .then(res => res.json())
        .then(json => {
          message.channel.send({
            files: [{
                attachment: json.image,
                name: 'cat.jpg',
                description: `fact:` + json.fact
              }]
          })
        });
    }
}