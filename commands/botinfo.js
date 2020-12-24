const Discord = require('discord.js');
const {
  version
} = require('discord.js');
const config = require('../config.json');
module.exports.run = async (client, message, args, commandLang) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`Command Information for ${module.exports.help.name}`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .setColor(config.blank)
    message.channel.send(embed);
    return
  };

  function time(milliseconds) {
     let day, hour, minute, seconds;

    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    let string = `${day} %day%, ${hour} %hour%, ${minute} %minute% and ${seconds}\ %seconds%`;
     string = string.replace("%day%", "day" + (day === 1 ? "" : "s"));
     string = string.replace("%hour%", "hour" + (hour === 1 ? "" : "s"));
     string = string.replace("%minute%", "minute" + (minute === 1 ? "" : "s"));
     string = string.replace("%seconds%", "second" + (seconds === 1 ? "" : "s"));

     return string;
  };  
  let embed = new Discord.RichEmbed()
    .setDescription("Information about this bot.")
    .setAuthor("Jim's Bot", client.user.avatarURL)
    .setColor(config.blank)
    .addField('Discord Library', "Discord.js", true)
    .addField('Discord.js Version', `v${version}`, true)
    .addField('Node Version', `${process.version}`, true)
   .setThumbnail(message.client.user.displayAvatarURL)
  .setFooter("Jim's Bot | Uptime: " +  time(client.uptime) + " | v" + config.build, "https://smiley.js.org/assets/outlines/alert.png");
  return message.channel.send(embed);
};

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
};