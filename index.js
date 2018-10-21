const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "!"

bot.on('ready', () => {
    bot.user.setGame('!help | The Lab', 'https://twitch.tv/thoseredlights') //, 'https://twitch.com/thoseredlights'
  });

  const responseObject = {
    "!hi": "hello!",
    "!talk": "sorry. I'm not very talkative.",
    "!love": "what?",
    "!ping": "pong",
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
    'Uh... I guess?', 'I\'d rather not say.', 'Who cares?', 'Yes!', "Yes. I'm probably not lying."];

    bot.on("message", (message) => {
      if (message.content.includes('!8ball')) {
        // stop the spam loop
        if(message.author.bot) return;
        message.reply(eightball[Math.floor(Math.random()*eightball.length)])
      }
    });

    //swear checker
    const swearWords = ["twat", "plebs", "pleb", "cunt", "nigga", "nigger", "faggot"];
        //THESE ARE NOT GOOD WORDs. I DO NOT AGREE WITH THEIR USE. THIS IS PURELY TO PREVENT PEOPLE USING THEM IN THE SERVER.
    const swearReply = ["Uh... Watch your language.", "Aaaand deleted.", "Could you say that again with grown-up language?", "I'm so glad you can communicate like an adult.",
                       "Want to try that again?", "...Ok.", "Ugh. I hate this job. Please stop swearing."];

    //swear checker
    const romance = ["Are you a magician? Because whenever I look at you, everyone else disappears!",
                    "I’m not a photographer, but I can picture me and you together.",
                    "They say Disneyland is the happiest place on earth. Well apparently, no one has ever been talking to you.",
                    "I’m lost. Can you give me directions to your heart?",
                    "I was wondering if you had an extra heart. Mine was just stolen.",
                    "Is your name Google? Because you have everything I’ve been searching for.",
                    "If nothing lasts forever, will you be my nothing?"];

    bot.on("message", (message) => {
      if (message.content.includes('!flirt')) {
        // stop the spam loop
        if(message.author.bot) return;
        message.reply(romance[Math.floor(Math.random()*romance.length)])
      }
    });
    
    bot.on("message", (message) => {
  if (swearWords.some(word => message.content.includes(word)) ) {
    message.reply(swearReply[Math.floor(Math.random()*swearReply.length)]);
    message.delete();
    // Or message.delete();
  }
  });

bot.on("message", (message) => {
      if (message.content.includes('Roxannebot')) {
      message.react("💙")
      }
    });

  //list of commands
  const commands = ["```!hi -- greets the user", "!ping -- a nice game of table tennis", 
  "!8ball -- ask a question, and you will learn", "!talk -- that one explains itself", "!love -- ahahaha what", "!flirt -- some of my finest pick-up lines", "!help -- find out more!```"];

  //Roxanne DM's the asker with help instructions
  bot.on('message', (message) => {
    if (message.content === PREFIX + 'help') {
        message.reply('Check your DMs for info. :)')
        message.author.sendMessage("Hey there! Here's a little list of things I can currently do."); 
        message.author.sendMessage(commands);
        message.author.sendMessage("Hope this helps!");
    }
  });

// auto adding role on join
   bot.on('guildMemberAdd', (guildMember) => {
          let role = message.guild.roles.find("name", "The Test Subjects");
         const guildMember = message.member;
         guildMember.addRole(role)
}

//assigning roles.wav
//bot.on("message", (message) => {
      //if (message.content === PREFIX + 'join') {
         //let role = message.guild.roles.find("name", "Permission to Talk?");
         //const guildMember = message.member;
         //guildMember.addRole(role)
         //message.reply('Thank you! You now can now talk in all channels (except for mod-only ones).')
      //}
    //});


bot.login(process.env.BOT_TOKEN);
