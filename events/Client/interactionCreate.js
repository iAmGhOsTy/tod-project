const { InteractionType,Client,CommandInteraction } = require("discord.js")
module.exports = async (client, interaction) => {
     /**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
      
     
     if(interaction.type === InteractionType.ApplicationCommand) {

      const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.member.id !== `${client.owner}`) {
          await interaction.reply({
          content: `Only <@798245188413816833> can use this command!`
        }).catch(() => {});
        }

                
        try {
            client.commandsran ++
            await SlashCommands.run(client, interaction);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An error occured while running the command, please contact the support server`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An error occured while running the command, please contact the support server`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
}

