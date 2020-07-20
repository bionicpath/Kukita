const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
    let member = message.guild.member(message.mentions.users.first());
    let moderator = message.author;
    let guildname = message.guild;

    if (args[2] === "") {
      var reason = "Not Specified"
    } else {
      var reason = args[2];
    }

    const kickEmbed = new MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .addFields(
        {name: "**Moderator**", value: moderator},
        {name: "**Action**", value: 'Kick'},
        {name: "**Guild**", value: guildname},
        {name: "**Reason**", value: reason}
      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

    member.send(kickEmbed).then(() => {
      member.kick().then((member) => {
        message.channel.send(":slight_smile: " + member.displayName + " has been kicked!");
      });
    });
  } else {
    message.reply("You have to have the KICK_MEMBERS, MANAGE_GUILD, or ADMINISTRATOR permission to use this command!😞");
  }
};

module.exports.help = {
  name: "kick",
  description: "kicks a specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: [""]
};
