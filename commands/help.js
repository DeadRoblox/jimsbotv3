const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  const commandNames = Array.from(client.commands.keys());
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  message.author.sendCode('asciidoc', `= Command List =\n\n\ NOTE: You can use '${config.prefix}<COMMAND> help' to get help with the command. \n\n${client.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} - ${c.help.description}`).join('\n')}`);
};

module.exports.help = {
  name: 'help',
  description: 'Displays all of the commands and descriptions.',
  usage: 'help'
};