const Discord = require('discord.js');
const client = new Discord.Client();

var songBot = client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', function(message) {
    var input = message.content.toUpperCase();

    if (input == 'IS THAT FREE FOR BACKERS') {
        message.reply('We repeated this way to much! This is making me mad. I am breaking the DRY principle!!! DO NOT MAKE ME CRASH');
    }
    if (input.indexOf('IS IT FREE') > -1) {
        message.reply('Do I look like a charity?');
    }
    if (input.indexOf('GIT' && 'TIP') > -1) {
        message.reply('https://hackernoon.com/5-git-fundamentals-ded819a34cfe#.cpv7tf7v0');
    }
    if (input.indexOf('PHYSICS') > -1) {
        message.reply('Check out our cool tutorial in Unity 3D https://youtu.be/u3BnN2oioLA?list=PLpZBns8dFbgz7BWwgq1Hkaazu0hLg9xHg');
    }
    if (input.indexOf('STACKS' && 'WORK') > -1) {
        message.reply('This is my favorite article on stacks https://medium.freecodecamp.com/data-structures-stacks-on-stacks-c25f2633c529#.1v6qphlzr');
    }
    if (input.indexOf('SWIFT' && ('OBJECTIVEC' || 'OBJC') && 'OR') > -1) {
        message.reply('This is my true reason for love https://medium.com/@bobleesj/5-reasons-why-i-fell-in-love-with-swift-23e5eea5dad8#.yhurl5wdi');
    }
    if (input.indexOf('JOB' && 'DEVSLOPES') > -1) {
        message.reply('Here you go http://devslopes.com/jobs');
    }
    if (input.indexOf('ASK' && 'MARK') > -1) {
        message.reply('Check out these great tips https://www.youtube.com/playlist?list=PLpZBns8dFbgxSG5U953qZHQ7Q0DHdM8dm');
    }
});

client.login('MjQ1NjUwODIzMzk5NDczMTUy.CwPLqw.6bz4yFh8LC-p9V54X8-z7GryVaI');
