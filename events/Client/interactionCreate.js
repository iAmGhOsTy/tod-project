const { MessageEmbed, Client, MessageActionRow, MessageButton } = require("discord.js")
module.exports = async (client, interaction) => {
	 let prefix = client.prefix;
      
 let color = client.embedColor;
 if(interaction.isButton()){
     if(interaction.customId == 'DELETE_BUT' && interaction.user.id == `${client.owner}`) {
            interaction.message.delete();
     } else {
        return interaction.reply({embeds:[new MessageEmbed().setDescription("Cant Use This Man!").setColor("RED")], ephemeral: true})
     };
     

 }
     
     if(interaction.isCommand()) {

      const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.reply({
          content: `Only <@798245188413816833> can use this command!`
        }).catch(() => {});
        }
        if(SlashCommands.voteonly && interaction.user.id !== `${client.owner}`) {

            let vote = await client.topgg.hasVoted(interaction.user.id)
            if(!vote){
                const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setEmoji("<a:Snowflake:918072225192620052>")
            .setLabel("VOTE")
            .setStyle("LINK")
            .setURL("https://top.gg/bot/977584064808767518/vote"),
          )
                return interaction.reply({embeds:[new MessageEmbed().setDescription("**Vote Me To Use This Command** ").setColor(client.config.embedColor)],components:[row]})
            }
        }
                
        try {
            client.commandsran ++
            await SlashCommands.run(client, interaction, prefix);
            client.c
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
    // if (interaction.isAutocomplete()) {
    //     if (interaction.commandName === "nhie") {
    //         const to = interaction.options.getString("type");
    
    //         let filter = Langauges.filter((x) => x.name.toLowerCase()?.includes(to.toLowerCase())).sort()
    
    //         interaction.respond(filter.map((x) => ({ name: x.name, value: x.value })).slice(0, 25))
    //     }
    // }
    
        
}

