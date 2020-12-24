const Discord = require('discord.js');
const config = require('../config.json');

// Used if there is no #audit-log channel in the guild
module.exports.noLogChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, I could not find the `#mod-logs` channel. This notification was unable to be sent!');

  message.channel.send(embed);
};

// Used if there is no #reports channel in the guild
module.exports.noReportChannel = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, I could not find the `#reports` channel. This report was unable to be sent!');

  message.channel.send(embed);
};


// Used if member doesn't have permissions to do c;warn
module.exports.noWarn = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, you don\'t have permissions to warn people.');

  message.channel.send(embed);
};

module.exports.MANAGE_MESSAGES = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Sorry, but either you or I require the `MANAGE_MESSAGES` permission.');

  message.channel.send(embed);
};

module.exports.anotherNumber = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('Please provide a number less than 100')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if user has no permissions to execute the command
module.exports.noPermissions = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription(`You have insufficent permissions to run this command.\nYou require the permission flag of **${perm}**!`)
    .setColor(config.red)

  message.channel.send(embed);
};


// Used if no user has been provided or if user is invalid
module.exports.invalidUser = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('This user could not be found or does not exist!')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if no reason has been provided
module.exports.invalidReason = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('No reason has been provided.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used for users that cannot be punished
module.exports.cannotPunish = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('This user cannot be punished.')
    .setColor(config.red);

  message.channel.send(embed);
};


// Used if a user does not specify a number of messages to purge
module.exports.provideNumber = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('Please provide a number of messages you would like to delete.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user does not specify a number of messages to purge
module.exports.emptyMessage = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('Please specify the message you would like to send, you cannot send an empty message.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if no time is specified
module.exports.invalidTime = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('You have not specified a time, using d/h/m/s')
    .setColor(config.red);

  message.channel.send(embed);
};


// Used if no time is specified
module.exports.ownerOnly = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription(`that command can only be used by my owner.`)
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if the client ID is blank.
module.exports.invalidClientID = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('Please specify a client ID. It cannot be left blank.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user attempts to ban a user who is not banned.
module.exports.userNotBanned = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This user is not banned.');

  message.channel.send(embed);
};

// Used if a user attempts to mute a user who is not muted.
module.exports.userNotMuted = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('This user is not muted.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user attempts to mute a user who is already muted
module.exports.userAlreadyMuted = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('This user has already been muted.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user attempts to assign a role that does not exist
module.exports.noRoleExists = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('The specified role does not exist.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user is trying to be assigned a role that they already have
module.exports.userHasRole = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('The specified user already has this role.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user is trying to be assigned a role that they don't have
module.exports.userDoesNotHaveRole = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('The specified user does not have this role.')
    .setColor(config.red);

  message.channel.send(embed);
};

// Used if a user is trying to be assigned a role that they don't have
module.exports.specifyARole = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setDescription('Please specify a role to assign to the user.')
    .setColor(config.red);

  message.channel.send(embed);
};