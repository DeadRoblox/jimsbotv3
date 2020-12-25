const Discord = require('discord.js'); 
const config = require('../config.json');

module.exports.run = (client, message) => {
 
  let pages = [`** | General Info**\n\nThis bot was designed for Jim Bobs servers. It features many things hand created by Jim Bob. If you would like to view the command list, please allow DMs from bots and then type \`-help\`.\n\nThere are currently \`19\`commands loaded.\n\nWould you like to know more? Please [click here](hyspeed.cloud).\n You can find the source code [here](https://github.com/DeadRoblox/jimsbotv3/).`,`** | How to Use the Bot**\n\nThe bot's prefix is \`-\`, so you can view the command list by typing \`-help\`. While you can access most commands listed on the [website](https://github.com/DeadRoblox/jimsbotv3/), some may require elevated permission levels or role(s). If you believe that you should have access to a certain command, please messsage Jim Bob#0846.`, `** | Things to Note**\n\nStaff members cannot assist you in finding out why a command is not working. Logs are kept private for security reasons. Errors are automatically reported, but if a serious issue occurs, please notify Jim Bob#0846.`];  // just add more to the array to have more pages.
  let page = 1; 

  const embed = new Discord.RichEmbed() 
    .setColor(1609980)
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(`Page ${page} of ${pages.length}.`) 
    .setDescription(pages[page-1])
 
  message.channel.send(embed).then(msg => { 
   
    msg.react('⬅️').then( r => { 
      msg.react('➡️')
      
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id; 
     
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 }); 
     
      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
    setTimeout(function() {
  r.remove(message.author.id)
}, 250)
        embed.setDescription(pages[page-1]); 
        embed.setThumbnail(msg.author.displayAvatarURL)
        embed.setColor(1609980)
        embed.setFooter(`Page ${page} of ${pages.length}.`); 
        msg.edit(embed) 
      })
     
      forwards.on('collect', r => { 
        if (page === pages.length) return;
        page++;
    setTimeout(function() {
  r.remove(message.author.id)
}, 250)
        embed.setDescription(pages[page-1]);
        embed.setThumbnail(msg.author.displayAvatarURL) 
        embed.setColor(1609980)
        embed.setFooter(`Page ${page} of ${pages.length}.`); 
        msg.edit(embed)
      })  
    })
  }) 
};

module.exports.help = {
  name: 'about',
  description: 'Displays information about this bot.',
  usage: 'about'
};
