const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!"

bot.user.setGame('Portal 2');  //bot.user.setGame

  const responseObject = {
    "!hi": "hello!",
    "!talk": "sorry. I'm not very talkative.",
    "!love": "what?",
    "!ping": "pong"
  };

  //reply to one word commands

  bot.on("message", (message) => {
    if(responseObject[message.content]) {
      message.reply(responseObject[message.content]);
    }
  });

  //the fun stuff
  const eightball = [
    'Maybe.', 'Nah.', 'I hope so.', 'Not today, friend.',
    'Perhaps.', 'May luck find you well.', 'I think so.', 'Ha. I hope not.',
    'I hope so.', 'Never!', 'Forget about it.', 'Ahahaha! Really?!?', 'Pffft.',
    'Sorry, friend.', 'Hell yeah.', 'Hell no.', 'Psh... Don\'t get your hopes up',
    'Uh... I guess?', 'I\'d rather not say.', 'Who cares?', 'Yes!'];

    bot.on("message", (message) => {
      if (message.content.includes('!8ball')) {
        // stop the spam loop
        if(message.author.bot) return;
        message.reply(eightball[Math.floor(Math.random()*eightball.length)])
      }
    });

    //swear checker
    const swearWords = ["fuck", "shit", "twat"];
    
    bot.on("message", (message) => {
  if (swearWords.some(word => message.content.includes(word)) ) {
    message.reply("Oi, watch your language.");
    // Or message.delete();
  }
  });

  bot.on('message', function() {
    if (message.content === "$loop") { 
      var interval = setInterval (function () {
        message.channel.send("#chat-with-bots", "Hey! Welcome to #chat-with-bots! Here, you can ask any of us bots to do things without clogging up #general. Each bot has their own prefix and help command, myself included. So, converse away!")
      }, 86400000); 
    }
});

  //list of commands
  const commands = ["```!hi -- greets the user", "!ping -- a nice game of table tennis", 
  "!8ball -- ask a question, and you will learn", "!help -- find out more!```"];

  //Roxanne DM's the asker with help instructions
  bot.on('message', (message) => {
    if (message.content === PREFIX + 'help') {
        message.reply('Check your DMs for info. :)')
        message.author.sendMessage("Hey there! Here's a little list of things I can do."); 
        message.author.sendMessage(commands);
        message.author.sendMessage("Hope this helps!");
    }
  });

  // Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    'message', (message) => {
    message.send(`Hi there, ${member}! My name is Roxanne, and I'm the best bot on this server! (Don't tell qtChan)`);
    message.send(`What do I do? That's debatable, but you can always type '!help' at any time to find out!`);
    }
  });

bot.login(process.env.BOT_TOKEN);
