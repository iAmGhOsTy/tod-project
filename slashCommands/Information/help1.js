const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, CommandInteraction, Client,ApplicationCommandOptionType } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help1",
  description: "To get information of all commands.",
  options: [
    {
      name: "command",
      description: "Enter The Command Name.",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
        
    });
    let categories = [];
    let prefix = "/"
    let cots = [];
    let color =  client.config.embedColor;
  let args = interaction.options.getString("command");

        if (!args) {

           let helpmenu = new EmbedBuilder()
         .setDescription(`My current prefix in this server is \`/\` Type \`/help <command name>\` to get information about a specific command.`)
         .addFields({name: `**Links**`, value:`**[Truth Or Dare](https://discord.com/api/oauth2/authorize?client_id=977584064808767518&permissions=378944&scope=applications.commands%20bot)\n[Support Server](https://discord.gg/sb2TMUsJQH)**`})
        .addFields({name:`**Command Category**`, value:`<a:disco_cat:780425798950715392>  \`:\` **All Commands**\n<a:disco_cat:780425798950715392>  \`:\` **Public**\n<a:disco_cat:780425798950715392>  \`:\` **Info** \`\n\n\`Choose A Category To Get All Commands List\``})
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setColor(color)
        .setFooter({text: `© Total Commands: ${client.slashCommands.size}`})

        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('helpop')
                .setPlaceholder('❯ ToD Help Menu!')
                .addOptions([
                {
                    label: ' All Commands',
                    description: 'Get All Command List',
                    value: 'seventh',
                    emoji: '<a:disco_cat:780425798950715392> ',
                },
                {
                    label: ' Publlic',
                    description: 'Get All Public Command List',
                    value: 'first',
                    emoji: '<a:disco_cat:780425798950715392> ',
                },
                {
                    label: ' Info',
                    description: 'Get All Info Command List',
                    value: 'second',
                    emoji: '<a:disco_cat:780425798950715392> ',
                }
            ])
        )
        interaction.editReply({ embeds: [helpmenu], components: [row] })
        }
        else {
            let catts = [];

            readdirSync("./slashCommands/").forEach((dir) => {
                if (dir.toLowerCase() !== args.toLowerCase()) return;
                const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../slashCommands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    if (client.slashCommands.get(name).hidden) return;


                    let des = client.slashCommands.get(name).description;
                    let emo = client.slashCommands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.slashCommands.get(args.toLowerCase()) 

            if (cots.includes(args.toLowerCase())) {
                const combed = new EmbedBuilder()
                    .setDescription(`Use \`/help\` followed by a command name to get more information on a command.\nFor example: \`/help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return await interaction.editReply({
                    embeds: [combed]
                })
            };

            if (!command || command.category === "Owner") {
                const embed = new EmbedBuilder()
                    .setDescription(`No command called "${args}" found.`)
                    .setColor("#ff1010");
                return await interaction.editReply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }
            const embed = new EmbedBuilder()
              .setDescription(command.description)
              .addFields({name: "Usage:", value: command.usage ? `\`/${command.name} ${command.usage}\`` : `\`/${command.name}\``})
              .addFields({name: "Command Description:", value: command.description ? command.description : "No description for this command."})
              .addFields({name : "Command:", value : command.name ? `\`${command.name}\`` : "No name for this command."})  
              .setThumbnail(interaction.guild.iconURL({dynamic: true}))
              .setColor(color);
            return await interaction.editReply({
                embeds: [embed]
            });
        }
  }
}
