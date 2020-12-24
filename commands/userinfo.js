const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const moment = require('moment');

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

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let kickable = user.kickable ? "✅" : "❌";
  let bannable = user.bannable ? "✅" : "❌";
  let icon = user.user.displayAvatarURL;

  let nickname = user.nickname;
  if (nickname) {
    nickname = user.nickname;
  } else {
    nickname = 'None'
  };

  let createdAtRaw = user.user.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");
  let joinedAtRaw = user.joinedAt.toDateString();
  let joinedAt = joinedAtRaw.split(" ");

  let playingStatus = user.presence.game;
  if (playingStatus) {
    playingStatus = user.presence.game.name;
  } else {
    playingStatus = 'None'
  }
  const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
    const member = message.guild.member(user);
    let bot;
  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "No";
  }
  let embed = new Discord.RichEmbed()
    .setTitle(`Information about ${user.user.tag}`)
    .setColor(config.blank)
    .setThumbnail(icon)
    .addField('Username', user.user.tag, true)
    .addField('Nickname', nickname, true)
    .addField('User ID', user.id, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField('Playing Status', playingStatus, true)
    .addField("Bot", `${bot}`, true)
    .addField('Bannable', bannable, true)
    .addField('Kickable', kickable, true)
    .addField("Joined At", `${moment.utc(member.joinedAt).utcOffset('-0500').format("dddd, MMMM Do YYYY, hh:mm A")} EST`, true) // Formats time to EST
    .addField("Created At", `${moment.utc(member.user.createdAt).utcOffset('-0500').format("dddd, MMMM Do YYYY, hh:mm A")} EST`, true)
    .addField("Roles", user.roles.map(roles => `${roles.name}`).join(', '), false);
  message.channel.send(embed);
  return
};
module.exports.help = {
  name: 'userinfo',
  description: 'Displays information about the mentioned user.',
  usage: 'userinfo [@user]'
}