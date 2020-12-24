const build = process.env.BUILD;
const config = require('../config.json');
const superagent = require('superagent');
const chalk = require('chalk');

module.exports = async client => {
 client.user.setActivity("Booting...");
   client.user.setStatus('dnd'); 
  
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

  console.log(`\n\n${client.user.username} is online.\nOperating on ${client.guilds.size} ${pluralnonpluralservers}.\nOperating for ${client.users.size} ${pluralnonpluralusers}.\n`);
};