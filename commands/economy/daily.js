const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldown = require("../../models/cooldowns.js")

module.exports.run = async (bot, message, args) => {

  const author = await message.author.id

  let moneyEmbed = new MessageEmbed()
    .setTitle("Money")
    .setThumbnail(message.author.displayAvatarURL)

  cooldown.findOne({serverID: message.guild.id, userID: message.author.id, command: 'daily'}, (err, data) => {
    if (err) console.log(err)

    if (!data) {

      Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {
        if (err) console.log(err);

        if(!res) {
          let newMoneyAcc = new Money({
            userID: message.author.id,
            username: author,
            serverID: message.guild.id,
            money: 100
          })
          message.channel.send("Congratulations, you have earned $100. Don't spend it all in one place!")
          let newCooldown = new cooldown({
            serverID: message.guild.id,
            userID: message.author.id,
            command: 'daily',
            cooldown: Date.now() + 86400000
          })
          newCooldown.save()
        } else if (res){

          res.money = res.money + 100
          res.save()
          message.channel.send("Congratulations, you have earned $100. Don't spend it all in one place!")
          let newCooldown = new cooldown({
            serverID: message.guild.id,
            userID: message.author.id,
            command: 'daily',
            cooldown: Date.now() + 86400000
          })
          newCooldown.save()
        }
      })
    } else if (data) {

        var remaining = humanizeDuration(data.cooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

        message.channel.send(`You can only use that command once a day! You have ${remaining} to wait before you can claim your daily reward!`)

    }
  })
}

module.exports.help = {
  name: "daily",
  description: "gives you a days worth of money",
  arguments: "",
  category: "Economy",
  aliases: ["daily"]
};
