const axios = require('axios');
const config = require('../config.json')
const Discord = require('discord.js')
const errors = require('../util/errors.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(`${module.exports.help.permission}`)) return errors.noPermissions(message, `${module.exports.help.permission}`);
 const msg = await message.channel.send(`Changing slowmode...`);
 function slowmode(s, m) {
   axios({
     method: 'patch',
     url: `https://discordapp.com/api/v6/channels/${message.channel.id}`,
     headers: {
       'Authorization' : `Bot ${config.token}`
     },
     data: {
       rate_limit_per_user: s,
       reason: args.slice(1).join(' ')
     }
   }).then(msg.edit(m))
     .catch(() =>{
       msg.edit('An error has occurred. Do you or I have the correct permissions?');
     });
 }
       
 if (args[0] === 'off') {
   message.delete();
   slowmode(0, `**Slowmode has been disabled in this channel.**`);
   msg.delete(8000)
 } else if (isNaN(args[0]) || parseInt(args[0]) > 21600 || parseInt(args[0]) < 1) {
   msg.edit('**Error:** Please use a number between 1 and 21600 (6 hours)');
 } else {
   message.delete();
   slowmode(args[0], `**Slowmode enabled. Users can send messages every ${args[0]} seconds.**`);
   msg.delete(8000);
 }
};
  
module.exports.help = {
  name: 'slowmode',
  description: 'Enable or disable slowmode in a channel.',
  permission: 'MANAGE_MESSAGES',
  usage: 'slowmode <0-120 | off>'
};