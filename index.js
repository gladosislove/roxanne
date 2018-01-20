const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!"

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'Portal', type: 0 } });  //bot.user.setGame
  });

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


bot.login(process.env.BOT_TOKEN);
