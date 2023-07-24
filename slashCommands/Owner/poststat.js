const { EmbedBuilder, CommandInteraction, Client, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "poststat",
    description: "stats to topgg",
    options:[{
        name: "shards",
        description: "no of shards",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "guilds",
        description: "no of guilds",
        type: ApplicationCommandOptionType.String,
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
                  interaction.followUp({embeds:[new EmbedBuilder().setDescription(`[Posted To Top.gg](https://top.gg/bot/977584064808767518)`)]})
                
            } catch {(console.error)}                 
        
    }
}