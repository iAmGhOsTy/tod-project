const { InteractionType, Client, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
    const createButtons = () => {
        return new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId("dare").setLabel("Dare").setStyle("Primary"),
            new ButtonBuilder().setCustomId("truth").setLabel("Truth").setStyle("Danger"),
            new ButtonBuilder().setCustomId("nhie").setLabel("Never Have I Ever").setStyle("Success")
        ]);
    };

    const sendEmbed = async (interaction, item, type) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `YOU ASKED FOR IT!!`, iconURL: client.user.displayAvatarURL() })
            .setColor(client.embedColor)
            .setDescription(`**${item}**`)
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        const row = createButtons();
        const message = await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.editReply({ components: [] });
        client.commandsran++;
        return message;
    };

    const editMessage = async (interaction, embed, buttonId = "meme") => {
        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setCustomId(buttonId).setLabel("Meme").setStyle("Success")
        ]);
        await interaction.message.edit({ embeds: [embed], components: [row] });
    };

    const fetchMeme = async () => {
        try {
            const response = await fetch('https://meme-api.com/gimme');
            const json = await response.json();
            return json;
        } catch (error) {
            console.error("Error fetching meme:", error);
            throw new Error("Failed to fetch meme");
        }
    };

    if (interaction.customId === "dare" || interaction.customId === "truth" || interaction.customId === "nhie") {
        await interaction.deferUpdate();
        let item;
        if (interaction.customId === "dare") {
            const dares = require('../../raw/dares.json');
            item = dares[Math.floor(Math.random() * dares.length)];
        } else if (interaction.customId === "truth") {
            const truths = require('../../raw/truths.json');
            item = truths[Math.floor(Math.random() * truths.length)];
        } else if (interaction.customId === "nhie") {
            const nhies = require('../../raw/nhie.json');
            item = nhies[2].item[Math.floor(Math.random() * nhies[2].item.length)];
        }
        await sendEmbed(interaction, item, interaction.customId);
    }

    if (interaction.customId === "DELETE_BUT") {
        await interaction.message.delete();
    }

    if (interaction.customId === "meme") {
        await interaction.deferUpdate();
        const tempEmbed = new EmbedBuilder()
            .setTitle("Fetching a new meme...")
            .setColor(client.embedColor)
            .setFooter({ text: "Please wait..." });

        await editMessage(interaction, tempEmbed);

        try {
            const json = await fetchMeme();

            const newEmbed = new EmbedBuilder()
                .setTitle(json.title)
                .setImage(json.url)
                .setColor(client.embedColor)
                .setFooter({ text: `Upvotes: ${json.ups}` });

            await editMessage(interaction, newEmbed);
            client.commandsran++;
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle("Oops! Something went wrong.")
                .setColor('#FF0000')
                .setDescription("We couldn't fetch a meme at this time. Please try again later.");

            await editMessage(interaction, errorEmbed, "meme");
        }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if (!SlashCommands) return;

        // Check for owner-only commands
        if (SlashCommands.owner && interaction.member.id !== `${client.owner}`) {
            await interaction.reply({
                content: `Only <@798245188413816833> can use this command!`
            }).catch(() => {});
            return;
        }

        try {
            client.commandsran++;
            await SlashCommands.run(client, interaction);
        } catch (error) {
            const errorMessage = `An error occurred while running the command, please contact the support server`;
            if (interaction.replied) {
                await interaction.editReply({ content: errorMessage }).catch(() => {});
            } else {
                await interaction.followUp({ ephemeral: true, content: errorMessage }).catch(() => {});
            }
            console.error(error);
        }
    }
};
