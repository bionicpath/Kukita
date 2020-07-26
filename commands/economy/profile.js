const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let profileEmbed = new MessageEmbed()
    .setAuthor(`${message.author.username}'s Profile'`, message.author.displayAvatarURL())

  mainSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      profileEmbed.setColor("#fc0404");
      profileEmbed.addField("❌ Error", `You don't have any money! Use ${bot.prefix}createaccount to start an account!`);

      return message.channel.send(profileEmbed)
    } else {

      profileEmbed.setDescription(`**Rank**: ${res.rank}\n**Is Voter**: ${res.isVoter}\n**Passive**: ${res.isPassive}\n**Money**: $${res.money}\n**Level**: ${res.level}\n**XP**: ${res.currentXP}/${res.nextLevel}`)

      return message.channel.send(profileEmbed)

    }
  })
}

module.exports.help = {
  name: "profile",
  description: "sends you your stats or those of another user",
  arguments: "[user]",
  category: "Economy",
  aliases: ["profile"]
};