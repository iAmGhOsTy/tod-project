const { CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require("discord.js")
const { post } = require("node-superfetch");

module.exports = {
    name: "eval",
    description: "codeeeeeeeee",
    options:[{
        name: "code",
        description: "type code",
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
        const row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
 .setLabel("DELETE")
 .setCustomId('DELETE_BUT')
 .setStyle(ButtonStyle.Danger));

if (!client.owner.includes(interaction.member.id)) {
return interaction.editReply({content:"nu", ephemeral:true});
};

    let a = "";

     try {
         const code = interaction.options.getString("code");
         if (!code) return  interaction.editReply({content: `\`\`\`js\nundefined\`\`\``, components: [row]});
         let evaled;

         if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
             evaled = "No, shut up, what will you do it with the token?";
         } else {
             evaled = await eval(code);
         }

         if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

         let output = clean(evaled);
         if (output.length > 1024) {
            
             const { body } = await post("https://hastebin.com/documents").send(output);
             a += `https://hastebin.com/${body.key}.js`;
           
         } else {
             a += "```js\n" + output + "```";
         }

         interaction.editReply({content: `${a}`, components: [row]});

     } catch (error) {
         let err = clean(error);
         if (err.length > 1024) {
            
             const { body } = await post("https://hastebin.com/documents").send(err);
             a += `https://hastebin.com/${body.key}.js`;
         } else {
             a += "```js\n" + err + "```";
         }

          interaction.editReply({content: `${a}`, components: [row]});
     }

    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}