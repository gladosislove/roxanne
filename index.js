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
                'https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif',
                'https://media1.tenor.com/images/42922e87b3ec288b11f59ba7f3cc6393/tenor.gif?itemid=5634630',
                'https://media1.tenor.com/images/b4b95730d9967a97bc54457f928f1181/tenor.gif?itemid=7274071',
                'https://media1.tenor.com/images/ee95b90c9461219ff77136d6534d1f6b/tenor.gif?itemid=11050300'
];

const pat = ['https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif',
                'https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif',
                'https://media.giphy.com/media/109ltuoSQT212w/giphy.gif',
                'https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif',
                'https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif',
                'https://media1.tenor.com/images/667d8a04d2390a8c6bf33caca9bfb9a6/tenor.gif?itemid=5352915',
                'https://media1.tenor.com/images/c0c1c5d15f8ad65a9f0aaf6c91a3811e/tenor.gif?itemid=13410974',
                'https://media1.tenor.com/images/54722063c802bac30d928db3bf3cc3b4/tenor.gif?itemid=8841561',
                'https://media1.tenor.com/images/cd670d11c8ee567585208c5437f88f36/tenor.gif?itemid=12907914'
];

const flip = ['you flipped a coin, it landed on heads.', 'you flipped a coin, it landed on tails.'];

const eightball = [
    'maybe.', 'nah.', 'I hope so.', 'not today, friend.',
    'perhaps.', 'I think so.', 'I hope not.',
    'I hope so.', 'never!', 'forget about it.', 'really?',
    'sorry, friend.', 'hell yeah.', 'hell no.', 'don\'t get your hopes up',
    'uh... I guess?', 'maybe? Maybe not. It\'s hard to tell.', 'yes..? Maybe?'
];

bot.on('ready', () => {
    bot.user.setGame('The Lab | !help for info', 'https://twitch.tv/thoseredlights')
    console.log('Roxannebot is online.')
});

// add role

bot.on('guildMemberAdd', member => {
    var joinRole = member.guild.roles.find('name', 'The Test Subjects');
    member.addRole(joinRole)
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
        message.reply('check your DMs for info.');
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
                value: '`!help` `!purge` `!kick`'
             }
            ],
           footer: {
            text: 'Use !help at any time to get a new list of commands!'
            }
        }});
                             
        message.author.send('Hope this helps!');

        console.log(`${member.user.tag} has requested a command list.`)

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
            message.reply('please mention a user.')
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
            message.reply('please mention a user.')
        }
    }

    // kick command

    if(message.content.startsWith(PREFIX + 'kick')) {
        if (!message.member.roles.find('name', 'The Mods')) {
            message.channel.send('You don\'t have permission to use this command.');
            return;
        }

        let member = message.mentions.members.first()
        if(!member) {
            message.channel.send('Please mention a valid user.');
            return;
        }
        if(!member.bannable) {
            message.channel.send('I can\'t kick this user. Do they have a higher role?');
            return;
        }

        let cont = message.content.slice(PREFIX.length).split(' ');
        let args = cont.slice(1);
        let reason = args.slice(1).join(' ');

        if(!reason) reason = 'No reason provided';

        await member.kick(reason)
            .catch(error => message.reply(`Error: ${error}`));
            
        let embed = new Discord.RichEmbed()
            .setTitle('Roxannebot Logs')
            .setDescription(`**${member.user.tag} Kicked**`)
            .setColor('#6df9d3')
            .addField('User', `${member.user.tag} (${member.id})`, true)
            .addField('Action By', `@${message.author.tag}`, true)
            .addField('Kicked For', reason)
            .setTimestamp();
        
        bot.channels.get('530728851194642442').send({embed});

        message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} for ${reason}.`)

    }

    if (message.content === PREFIX + 'gamenight') {
        let role = message.guild.roles.find("name", "Game Night");
        const guildMember = message.member;
        guildMember.addRole(role)
        message.delete()
    }


    if (message.content === PREFIX + 'removegamenight') {
        let role = message.guild.roles.find("name", "Game Night");
        const guildMember = message.member;
        guildMember.removeRole(role)
        message.delete()
    }


});

bot.login(process.env.BOT_TOKEN);
