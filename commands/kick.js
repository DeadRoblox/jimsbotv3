const Discord = require('discord.js');
const config = require('../config.json');
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

  let reason = args.slice(1).join(" ");
  if (!reason) return errors.invalidReason(message);

  if (user.hasPermission(`${module.exports.help.permission}`)) return errors.cannotPunish(message);

  let createdAtRaw = message.createdAt.toDateString();
  let createdAt = createdAtRaw.split(' ');

  let embed = new Discord.RichEmbed()
    .setTitle('User has been Kicked')
    .setColor(config.blank)
    .addField('Kicked User:', `${user}`)
    .addField('Kicked By:', `${message.author} (${message.author.username}#${message.author.discriminator})`)
    .addField('Kicked in Channel:', message.channel)
    .addField('Time', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`)
    .addField('Reason:', reason);

  let auditlogchannel = message.guild.channels.find(c => c.name === 'mod-logs');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  
  let kickembed = new Discord.RichEmbed()
  .setTitle('You\'ve been kicked.')
  .setColor(config.blank)
  .addField('Kicked by', `${message.author} (${message.author.username}#${message.author.discriminator})`)
  .addField('Reason', `${reason}`)

  await user.send(kickembed)
  
  message.guild.member(user).kick(reason);
  console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} has kicked ${user.user.username} from ${message.guild} for ${reason}.`);
  return
};

module.exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user from the guild with the reason provided.',
  permission: 'MANAGE_MESSAGES',
  usage: 'kick [@user] [reason]'
};