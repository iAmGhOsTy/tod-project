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
            .addFields({name:'IP',value: `\`${final.query}\``, inline:true},
            {name:'Country',value: `\`${final.country}\``, inline:true},
            {name:'City',value: `\`${final.city}\``, inline:true},
            {name:'Region',value: `\`${final.region}\``, inline:true},
            {name:'Latitude',value: `\`${final.lat}\``, inline:true},
            {name:'Longitude',value: `\`${final.lon}\``, inline:true},
            {name:'ISP',value: `\`${final.isp}\``, inline:true},
            {name:'Org',value: `\`${final.org}\``, inline:true},
            {name:"Timezone", value: `\`${final.timezone}\``, inline:true},
            )
            .setColor(client.embedColor)
            .setTimestamp()
            interaction.followUp({embeds: [embed]})
         } catch (err){
            console.log(err)
         }     
    }
}