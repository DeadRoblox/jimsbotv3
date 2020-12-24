const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({
  disableEveryone: true
});
const fs = require("fs");
const chalk = require("chalk");
const prefix = config.prefix;
client.commands = new Discord.Collection();
require("./util/eventLoader.js")(client);

// Reads all commands and loads them in
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log(chalk.red("Couldn't find commands."));
    return;
  }
  console.log("Loading commands to memory...");
  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(
      chalk.yellow("[Jim's Bot] ") + chalk.cyan(files) + ` has been loaded.`
    );
    client.commands.set(props.help.name, props);
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!cmd.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.setInterval(() => {
  let Status = [
    'you'
  ];
  client.user.setActivity(Status[Math.floor(Math.random() * Status.length)], { "type": "WATCHING" });
  client.user.setStatus('online');
  console.log(chalk.yellow('[Server]') + ` Activity set to (${Status})`);
}, 60 * 1000);

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0]
  command = command.slice(prefix.length)
  console.log(command);

  let args = message.content.split(" ").slice(1);

  if (command === "say") {
    if (message.author.id == config.ownerid) {
      const sayMessage = args.join(` `);
      message.delete().catch();
      message.channel.send(sayMessage);
    } else {
      message.reply("That's an owner-only command.");
    }
  }

  if (command === "help") {
    const embed = {
      "color": "16572539",
      "timestamp": new Date(),
      "footer": {
        "icon_url": message.author.avatarURL,
        "text": message.author.username
      },
      "fields": [
        {
          "name": "Please check your DMs",
          "value": "I've sent you the command list."
        }
      ]
    }
    message.channel.send({ embed });
  }

  if (command === "ping") {
    const msg = await message.channel.send(`Testing ping...`);
    msg.edit(`:information_source: Pong! | Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API ping is ${Math.round(client.ping)}ms`);
  }

  if (command === "pong") {
    const msg = await message.channel.send(`Testing pong...`);
    msg.edit(`:information_source: Ping! | Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API pong is ${Math.round(client.ping)}ms`);
  }

  if (command == "eval") {
    if (message.author.id !== config.ownerid) return message.reply("You do not have the correct permission level to use this command");
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util")
          .inspect(evaled);
      message.channel.sendCode("xl", clean(evaled));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

client.login(config.token); // Log in with the token provided in config.json