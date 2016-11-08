const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', function(message) {
    var input = message.content.toUpperCase();

    if (input === 'IS THAT FREE FOR BACKERS') {
        message.reply('We repeated this way to much! This is making me mad. I am breaking the DRY principle!!! DO NOT MAKE ME CRASH');
    }
    if (input === 'IS IT FREE') {
        message.reply('Do I look like a charity?');
    }
});

client.login('the key');
