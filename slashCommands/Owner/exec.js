const { CommandInteraction, Client,MessageActionRow, MessageButton } = require("discord.js")
const { exec } = require('child_process');
module.exports = {
    name: "exec",
    description: "in terminal",
    options:[{
        name: "exec",
        description: "executes code",
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
        const row = new MessageActionRow()
        .addComponents(new MessageButton()
 .setLabel("DELETE")
 .setCustomId('DELETE_BUT')
 .setStyle("DANGER"));
        const args = interaction.options.getString("exec");

        if (!client.owner.includes(interaction.member.id)) {
            return interaction.editReply({content:"nu", ephemeral:true});
            };
            exec(args, (error, stdout) => {
                if (error) {
                    interaction.followUp({content:`\`ERROR\`\n\`\`\`js\n${error}\n\`\`\``,components: [row]});
                } else {
                    interaction.followUp({content:`\`OUTPUT\`\n\`\`\`js\n${stdout}\n\`\`\``,components: [row]});
                }
            });
                        
        
    }
}