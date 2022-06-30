const { MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");

module.exports = async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;

   let prefix = client.prefix;
      
      let datab = ['798245188413816833'];
      
    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
    const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`)

    if (message.content.match(mentionRegex)) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**› My prefix in this server is \`${prefix}\`**\n**› You can see my all commands type \`${prefix}\`help**`);
      message.channel.send({embeds: [embed]})
    };

    const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;

    if(!datab.includes(message.author.id)){
                if (!message.content.startsWith(prefix1)) return;
            } 

    const args = datab.includes(message.author.id) == false ? message.content.slice(prefix1.length).trim().split(/ +/) :  message.content.startsWith(prefix1) == true ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.trim().split(/ +/);
    
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    const embed = new MessageEmbed()
        .setColor("RED");


    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        

        if (command.usage) {
            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command.");
        return message.channel.send({embeds: [embed]});
    }

    if(command.voteonly){
        let vote = await client.topgg.hasVoted(message.author.id)
        if(!vote){
            const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji("<a:Snowflake:918072225192620052>")
        .setLabel("VOTE")
        .setStyle("LINK")
        .setURL("https://top.gg/bot/977584064808767518/vote"),
      )
            return message.channel.send({embeds:[new MessageEmbed().setDescription("**Vote Me To Use This Command** ")],components:[row]})
        }
    }

    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Only <@798245188413816833> can use this command!");
        return message.channel.send({embeds: [embed]});
    }


    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
    const embed2 = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`Enjoying the bot, [Consider upvoting me](https://top.gg/bot/977584064808767518/vote)<:excited:900459364568137748>`);
    if(Math.random() > 0.9) message.channel.send({embeds: [embed2]}).catch(o_0 => {});
  }
