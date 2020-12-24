const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const moment = require('moment');
const errors = require('../util/errors.js');
const chalk = require('chalk');


module.exports.run = async (client, message, args) => {
  if (args[0] == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`Command Information for ${module.exports.help.name}`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .addField('Permission', `${module.exports.help.permission}`, true)
      .setColor(config.holiday)
    message.channel.send(embed);
    return
  };

  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);
  if (user.hasPermission(`${module.exports.help.permission}`)) return errors.cannotPunish(message);

  let reason = args.slice(2).join(" ");
  if (!reason) return errors.invalidReason(message);

  let muterole = message.guild.roles.find(c => c.name === 'Muted');
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: 'Muted',
        color: "#000000",
        permissions: []
      }, "Mute role not found. Creating one for you.")
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  };
  if (user.roles.has(muterole.id)) return errors.userAlreadyMuted(message);

  let time = args[1];
  if (!time) return errors.invalidTime(message);

  let embed = new Discord.RichEmbed()
    .setTitle('User has been Temporarily Muted')
    .setColor(config.holiday)
    .addField('Muted User', `${user}`, true)
    .addField('Muted By', `${message.author}`, true)
    .addField('Muted For', time)
    .addField('Time', `${moment(message.createdAt).utcOffset('-0400').format("MMMM Do YYYY, hh:mm A")} EDT`)
    .addField('Reason', reason);

  console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} has muted ${user.user.username} in ${message.guild} for ${time} for ${reason}.`);

  let auditlogchannel = message.guild.channels.find(c => c.name === 'mod-logs');
     auditlogchannel.send(embed);
  if (!auditlogchannel) return errors.noLogChannel(message);

  message.delete().catch(O_o => {});
   let dmembed = new Discord.RichEmbed()
    .setTitle('You\'ve been muted.')
    .setColor(config.blank)
    .addField('Muted By', `${message.author}`, true)
    .addField('Muted For', time)
    .addField('Muted On', `${moment().utcOffset('-0400').format("MMMM Do YYYY, hh:mm A")}`)
    .addField('Reason', reason);
  user.send(dmembed);

  await (user.addRole(muterole.id));

  setTimeout(() => {
    if (user.roles.has(muterole.id)) {
      user.removeRole(muterole.id);
      let embed = new Discord.RichEmbed()
        .setTitle('User has been Unmuted')
        .setColor(config.holiday)
        .addField('Unmuted User', `${user}`)
      auditlogchannel.send(embed);
    }
  }, ms(time));
};

module.exports.help = {
  name: 'mute',
  description: 'Temporarily mutes a user. Requires permission : "MANAGE_MESSAGES"',
  permission: 'MANAGE_MESSAGES',
  usage: 'mute [@user] [h/m/s] [reason]'
};