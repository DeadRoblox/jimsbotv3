const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const errors = require('../util/errors.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`Command Information for ${module.exports.help.name}`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .addField('Permission', `${module.exports.help.permission}`, true)
      .setColor(config.blank)
    message.channel.send(embed);
    return
  };

  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let muterole = message.guild.roles.find(c => c.name === 'Muted');
  if (!user.roles.has(muterole.id)) return errors.userNotMuted(message);

  message.delete().catch(O_o => {});
  let auditlogchannel = message.guild.channels.find(c => c.name === 'mod-logs');
  if (!auditlogchannel) return errors.noLogChannel(message);

  await (user.removeRole(muterole.id))
  let embed = new Discord.RichEmbed()
    .setTitle('User has been Unmuted')
    .setColor(config.blank)
    .addField('Muted User', `${user}`)
  auditlogchannel.send(embed);
  console.log(chalk.yellow(`[${message.guild}]`) + ` ${user.user.username} has been unmuted in ${message.guild}.`);
};

module.exports.help = {
  name: 'unmute',
  description: 'Unmutes a user.',
  permission: 'MANAGE_MESSAGES',
  usage: 'unmute [@user]'
};