var Discord = require('discord.js'),
    stackexchange = require('stackexchange'),
    VerEx = require('verbal-expressions'),
    search = require('youtube-search'),
    // The HTTP module
    http = require('http'),
    // to make https request e.g get,post,put,delete
    request = require('request'),
    functionHelper = require('./functionHelpers.js'),
    apiai = require('apiai');

// bot client You can now use the bots features
var bot = new Discord.Client();
const prefix = '!';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    let input = message.content.toUpperCase();
    let msgContent = message.content;

    //prevent the bot from issuing commands
    if (message.author.bot) {
        return;
    }

    // Google Search Function
    if ((msgContent).startsWith("!G")) {
        console.log("input: " + input);
        functionHelper.googleSearch(functionHelper.removeThatPhrase(message.content, "!G", ' '), message);
    }

    // stackoverflow API
    if ((msgContent).startsWith("!S")) {
        console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, '!S', ' '), message);
        }
    }

    // YouTube API
    if ((msgContent).startsWith("!Y")) {
        functionHelper.youtubeApiResults((functionHelper.removeThatPhrase(input, '!Y', '')), message);
    }

    //Unconditional responses
    functionHelper.response(message);

    // This function check for !Course and !help and !Coupon
    functionHelper.messageAuthor(message, prefix);

//API.AI START

    var apiai = require('apiai');
    // Api.ai Token DO NOT SHARE THIS. Make sure to put in your discord bot token in at the bottem.
    var app = apiai("53c515f369144ff09d095c6602049b25");

    var request = app.textRequest(`${input}`, {
      sessionId: '123TEST123'
    });

    // Log all responses.
    request.on('response', function(response) {
        let responseText = response.result.fulfillment.speech;
        console.log(response);
        message.reply(`${responseText}`);
    });

    request.on('error', function(error) {
        console.log(error);
    });


    request.end()

        // if the message equals the prefix + something, run what's inside.
       if (input.startsWith(prefix + "")) {

           // Sends a request to discord with the message content. Also removes the prefix. Change the number depending on the length of your prefix.
           app.textRequest(`${input}`);
           // Get that response
           request.on('response', function(response) {
           // I did this to make it easier to read. Set's response text equal to the output speech.
           let responseText = response.result.fulfillment.speech;
           // Send the message to discord.
           bot.sendMessage(msg, `${responseText}`);
        });

      }

    // Pretty self explanitory but it logs errors.
    request.on('error', function(error) {
        console.log(error);
    });

//API.AI END

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage("Hello " + member.user + " Welcome to the Devslopes community! Use '!help' for more commands.")
});

//Login to Discord using oauth
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwQefg.p2rkiB8vIb5WHjbCyfCE3K1DA4s');

//*************  Node Js Server  ************************//
//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", process.env.npm_package_config_port);
});
