const { InteractionType,Client,CommandInteraction,ButtonBuilder,ActionRowBuilder,EmbedBuilder } = require("discord.js")
module.exports = async (client, interaction) => {
     /**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
      
// ADDING BUTTONS
if (interaction.customId === "dare") {
    await interaction.deferUpdate();
    const dares = require('../../raw/dares.json');
    const dareBut = new ButtonBuilder().setCustomId("dare").setLabel("Dare").setStyle("Primary")
    const truthBut = new ButtonBuilder().setCustomId("truth").setLabel("Truth").setStyle("Secondary")
    const nhieBut = new ButtonBuilder().setCustomId("nhie").setLabel("Never Have I Ever").setStyle("Success")
    const row = new ActionRowBuilder().addComponents([dareBut,truthBut,nhieBut])
    const tembed = new EmbedBuilder()
    .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
    .setColor(client.embedColor)    
    .setDescription(`**${dares[Math.floor(Math.random() * dares.length)]}**`)
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    await interaction.channel.send({embeds: [tembed], components: [row]});
    await interaction.editReply({components: []});
}

if (interaction.customId === "truth") {
    await interaction.deferUpdate();
    const truths = require('../../raw/truths.json');
    const dareBut = new ButtonBuilder().setCustomId("dare").setLabel("Dare").setStyle("Primary")
    const truthBut = new ButtonBuilder().setCustomId("truth").setLabel("Truth").setStyle("Secondary")
    const nhieBut = new ButtonBuilder().setCustomId("nhie").setLabel("Never Have I Ever").setStyle("Success")
    const row = new ActionRowBuilder().addComponents([dareBut,truthBut,nhieBut])
    const tembed = new EmbedBuilder()
    .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
    .setColor(client.embedColor)    
    .setDescription(`**${truths[Math.floor(Math.random() * truths.length)]}**`)
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    await interaction.channel.send({embeds: [tembed], components: [row]});
    await interaction.editReply({components: []});
}

if (interaction.customId === "nhie") {
    await interaction.deferUpdate();
    const nhies = require('../../raw/nhie.json');
    
    const dareBut = new ButtonBuilder().setCustomId("dare").setLabel("Dare").setStyle("Primary")
    const truthBut = new ButtonBuilder().setCustomId("truth").setLabel("Truth").setStyle("Secondary")
    const nhieBut = new ButtonBuilder().setCustomId("nhie").setLabel("Never Have I Ever").setStyle("Success")
    const row = new ActionRowBuilder().addComponents([dareBut,truthBut,nhieBut])
    const tembed = new EmbedBuilder()
    .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
    .setColor(client.embedColor)    
    .setDescription(`**${nhies[2].item[Math.floor(Math.random() * nhies[2].item.length)]}**`)
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    await interaction.channel.send({embeds: [tembed], components: [row]});
    await interaction.editReply({components: []});
}


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

