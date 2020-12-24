const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`Command Information for ${module.exports.help.name}`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .setColor(config.blank)
    message.channel.send(embed);
    return
  };

  let guild = message.guild;
  let large = message.guild.large ? "<:greencheck:508079195272904704>" : "<:redx:508079221814329364>";
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let textChannels = 0;
  let voiceChannels = 0;
  guild.channels.forEach(channel => {
    channel.type === "text" ? textChannels++ : voiceChannels++;
  });

    var region = {
    "brazi": "Brazil :flag_br:",
    "eu-central": "Central Europe :flag_eu:",
    "singapore": "Singapore :flag_sg:",
    "us-central": "U.S. Central :flag_us:",
    "sydney": "Sydney :flag_au:",
    "us-east": "U.S. East :flag_us:",
    "us-south": "U.S. South :flag_us:",
    "us-west": "U.S. West :flag_us:",
    "eu-west": "Western Europe :flag_eu:",
    "singapore": "Singapore :flag_sg:",
    "london": "London :flag_gb:",
    "japan": "Japan :flag_jp:",
    "russia": "Russia :flag_ru:",
    "hongkong": "Hong Kong :flag_hk:"
  }

    var verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻ (High)', '┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ (Extreme)'];
  const emojis = message.guild.emojis.map(e => e.toString()).join(" ");
  const roles = message.guild.roles.map(e => e.toString()).join(" ");
  const moment = require("moment");
  let embed = new Discord.RichEmbed()
    .setTitle(`Information about ${message.guild.name}`)
    .setColor(config.blank)
    .setThumbnail(icon)
    .addField('Guild Name', guild.name, false)
    .addField('Guild ID', guild.id, false)
    .addField('Guild Owner', guild.owner, true)
    .addField('Region',  `${region[message.guild.region]}`, true)
    .addField('Created At', `${moment(message.guild.createdAt).utcOffset('-0500').format("M/D/YY, h:m A")} EST`, true)
    .addField('Members', message.guild.members.filter(member => !member.user.bot).size, true)
    .addField('Bots', message.guild.members.filter(member => member.user.bot).size, true)
    .addField('Large Guild', large, true)
    .addField('Verification Level', `${verificationLevels[message.guild.verificationLevel]}`, true)
    .addField('Text Channels', textChannels, true)
    .addField('Voice Channels', voiceChannels, true)
    .setFooter("Version " + config.build + " | Info requested by " + message.author.username);

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the guild.',
  usage: 'serverinfo'
}