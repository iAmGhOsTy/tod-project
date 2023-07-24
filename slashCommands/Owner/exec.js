const { CommandInteraction, Client, ApplicationCommandOptionType } = require("discord.js")
const { exec } = require('child_process');
module.exports = {
    name: "exec",
    description: "in terminal",
    options:[{
        name: "exec",
        description: "executes code",
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
        const args = interaction.options.getString("exec");

        if (!client.owner.includes(interaction.member.id)) {
            return interaction.editReply({content:"nu", ephemeral:true});
            };
            exec(args, (error, stdout) => {
                if (error) {
                    interaction.followUp(`\`ERROR\`\n\`\`\`js\n${error}\n\`\`\``);
                } else {
                    interaction.followUp(`\`OUTPUT\`\n\`\`\`js\n${stdout}\n\`\`\``);
                }
            });
                        
        
    }
}