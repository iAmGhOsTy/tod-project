const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "poststat",
    description: "stats to topgg",
    options:[{
        name: "shards",
        description: "no of shards",
        type: "STRING",
        required: true,
    },
    {
        name: "guilds",
        description: "no of guilds",
        type: "STRING",
        required: true,
    }],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        const servers =parseInt(interaction.options.getString("guilds"));
        const shards = parseInt(interaction.options.getString("shards"));
        if (!client.owner.includes(interaction.member.id)) {
            return interaction.editReply({content:"nu", ephemeral:true});
            };
            try {
                await client.topgg.postStats({
                    serverCount: servers,
                    shardCount: shards
                  })
                  interaction.followUp({embeds:[new MessageEmbed().setDescription(`[Posted To Top.gg](https://top.gg/bot/977584064808767518)`)]})
                
            } catch {(console.error)}                 
        
    }
}