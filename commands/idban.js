const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

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
   if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);
    const target   = args[0];
    if (!target) return message.channel.send('Sorry, I couldn\'t find that ID.')
    const reason   = args.splice(1, args.length).join(' ');
    try {
      message.guild.ban(target, {reason: reason.length < 1 ? 'No reason supplied. | User was banned by ID.': reason});
      await message.channel.send('User has been successfully banned from this server.');
    } catch (error) {
      throw error;
    }
  }

module.exports.help = {
  name: 'idban',
  description: 'Ban a user from the server by their ID.',
    permission: 'BAN_MEMBERS',
  usage: 'idban [id] <reason>'
}