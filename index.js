const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!'

// misc arrays

const romance = ['Are you a magician? Because whenever I look at you, everyone else disappears!',
                    'I\'m not a photographer, but I can picture me and you together.',
                    'They say Disneyland is the happiest place on earth. Well apparently, no one has ever been talking to you.',
                    'Hey, I\'m lost. Can you give me directions to your heart?',
                    'I was wondering if you had an extra heart. Mine was just stolen.',
                    'Is your name Google? Because you have everything I’ve been searching for.',
                    'Don\'t forget to tie your shoes! I don’t want you falling for anyone else.',
                    'On a scale from 1 to 10, you\'re a 9... And I\'m the 1 you need.',
                    'Are you my appendix? Because I don\'t understand how you work, but this feeling in my stomach makes me want to take you out.',
                    'Are you my Wi-fi? Because I\'m really feeling a connection.',
                    'Are you a keyboard ? Because you\'re my type.',
                    'Hey, my name\'s Microsoft. Can I crash at your place tonight?',
                    'I\'m no electrician, but I can light up your day.',
                    'If I had a heart, it\'d beat for you.',
                    'If nothing lasts forever, will you be my nothing?'
];

const hug = ['https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
                'https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif',
                'https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif',
                'https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif',
                'https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif',
                'https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif'
];

const pat = ['https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif',
                'https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif',
                'https://media.giphy.com/media/109ltuoSQT212w/giphy.gif',
                'https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif',
                'https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif'
];

const flip = ['You flipped a coin, it landed on heads.', 'You flipped a coin, it landed on tails.'];

const eightball = [
    'Maybe.', 'Nah.', 'I hope so.', 'Not today, friend.',
    'Perhaps.',, 'I think so.', 'I hope not.',
    'I hope so.', 'Never!', 'Forget about it.', 'Really?',
    'Sorry, friend.', 'Hell yeah.', 'Hell no.', 'Don\'t get your hopes up',
    'Uh... I guess?', 'Maybe? Maybe not. It\'s hard to tell.', 'Yes..? Maybe?'
];

bot.on('ready', () => {
    bot.user.setGame('The Lab | !help for info', 'https://twitch.tv/thoseredlights') //, 'https://twitch.com/thoseredlights'
    console.log('Roxannebot is online.')
});

bot.on('message', async message => {

    // avoiding bot spam

    if(message.author.bot) return;

    // reacting with a heart if name is mentioned

    if (message.content.includes('Roxannebot')) {
        message.react("💙")
    };

    // help command + embed

    if (message.content === PREFIX + 'help') {
        message.reply('Check your DMs for info.');
        message.author.send('Hey there! Here\'s a little list of things I can currently do.');
        message.author.send({embed: {
            color: 0x6df9d3,
            title: 'Roxannebot Command List',
            description: 'A list of commands for Roxanne. If anything here isn\'t working as intended, feel free to ping ThoseRedLights.',
            fields: [{
                name: 'Fun Commands',
                value: '`!flirt` `!hug` `!pat` `!coinflip` `!8ball`'
             },
            {
                name: 'Music Commands',
                value: 'Under construction'
              },
             {
                name: 'Useful Commands (moderation commands cannot be used by @everyone)',
                value: '`!help` `!purge`'
             }
            ],
           footer: {
            text: 'Use !help at any time to get a new list of commands!'
            }
        }});
                             
        message.author.send('Hope this helps!');

        console.log('${member.user.tag} has requested a command list.')

    };

    // purge command

    if (message.content.startsWith(PREFIX + 'purge')) {
        
        let cont = message.content.slice(PREFIX.length).split(' ');
        let args = cont.slice(1);
        
        async function purge() {
            message.delete();
            
            if (!message.member.roles.find('name', 'The Supreme Overlord')) {
                message.channel.send('You don\'t have permission to use this command.');
                return;
            }
            
            
            if (isNaN(args[0])) {
                // cends a message to the channel
                message.channel.send('Please specify a number of messages to delete! \n Try: ' + PREFIX + 'purge <amount>');
                // prevents the rest from running
                return;
            }
            
            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages found, deleting...');
            
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); 
            
            message.channel.send('Channel purged. ' + fetched.size + ' messages removed.');

        }
        
        purge();

    }

    // flirt command

    if (message.content.startsWith(PREFIX + 'flirt')) {
        message.reply(romance[Math.floor(Math.random()*romance.length)])
    }

    // coin flip command

    if (message.content.startsWith(PREFIX + 'coinflip')) {
        message.reply(flip[Math.floor(Math.random()*flip.length)])
    }

    // 8ball command

    if (message.content.startsWith(PREFIX + '8ball')) {
        let cont = message.content.slice(PREFIX.length).split(' ');
        let args = cont.slice(1);

        if(!args[0]) return message.reply('please ask a full question.');

        message.reply(eightball[Math.floor(Math.random()*eightball.length)])
    }


    // hug command

    if(message.content.startsWith(PREFIX + 'hug')) {
        if(message.mentions.members.size == 1) {
            let member = message.mentions.members.first()
            message.channel.send(`${message.author} gave ${member} a hug!`, {
                file: hug[Math.floor(Math.random() * hug.length)]
            });
        } else {
            message.reply('Please mention a user.')
        }
    }

    // pat command

    if(message.content.startsWith(PREFIX + 'pat')) {
        if(message.mentions.members.size == 1) {
            let member = message.mentions.members.first()
            message.channel.send(`${message.author} pats ${member} on the head with love!`, {
                file: pat[Math.floor(Math.random() * pat.length)]
            });
        } else {
            message.reply('Please mention a user.')
        }
    }

});

bot.login(process.env.BOT_TOKEN);
