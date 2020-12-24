const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
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
  
  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noWarn(message);
  let logchannel = message.guild.channels.find(c => c.name === 'mod-logs');
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (!logchannel) return message.reply('I cannot find a logs channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const rembed = new Discord.RichEmbed()
  .setColor(config.blank)
  .setTitle("A member has been warned.")
  .addField('User Warned', `${user} (${user.username}#${user.discriminator})`)
  .addField('Moderator', `${message.author} (${message.author.username}#${message.author.discriminator})`)
  .addField('Reason', `${reason}`)
  .setFooter("The Condemned | c;help to view commands.", client.displayAvatarURL)
      logchannel.send(rembed);
  message.author.send(`:pencil: ${user} has been warned.`)

   let dmembed = new Discord.RichEmbed()
    .setTitle('You\'ve been warned.')
   .setFooter('If you believe this is a mistake, please DM a staff member in our Discord.')
   .setColor(config.blank)
    .addField('Reason', `${reason}`, true)
  user.send(dmembed);
};

module.exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  permission: 'MANAGE_MESSAGES',
  usage: 'warn [@user] [reason]'
};