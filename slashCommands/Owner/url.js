const { EmbedBuilder, CommandInteraction, Client,ApplicationCommandOptionType } = require("discord.js")
const fetch = require('node-fetch')

module.exports = {
    name: "url",
    description: "shows website information",
    options:[{
        name: "url",
        description: "the url to get information of",
        type: ApplicationCommandOptionType.String,
        required: true
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
        if (!client.owner.includes(interaction.member.id)) {
            return interaction.editReply({content:"nu", ephemeral:true});
            };
        const url = interaction.options.getString("url")
        if(!url.startsWith(`www`)) return interaction.editReply({embeds:[new EmbedBuilder().setDescription(`Please provide a url starting with www`).setColor(client.embedColor)]})
        try {
            async function getUrlGeolocation(url) {
            let res = await fetch(`http://ip-api.com/json/${url}`);
            let json = await res.json();
          
            return json;
          }
          
          let final = await getUrlGeolocation(url)
         let embed = new EmbedBuilder()
            .setTitle(`Geolocation for ${url}`)
            .addField('IP', `${final.query}`)
            .addField('Country', `${final.country}`)
            .addField('City', `${final.city}`)
            .addField('Region', `${final.region}`)
            .addField('Latitude', `${final.lat}`)
            .addField('Longitude', `${final.lon}`)
            .setColor(client.embedColor)
            .setTimestamp()
            interaction.followUp({embeds: [embed]})
         } catch (err){
            console.log(err)
         }     
    }
}