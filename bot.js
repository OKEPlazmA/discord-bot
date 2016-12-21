var Discord = require('discord.js'),
    http = require('http'),
    request = require('request');

// bot client You can now use the bots features
var bot = new Discord.Client();

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    let input = message.content;

   //prevent the bot from issuing commands
   if (message.author.bot) {
       return;
   }

////////////////
//API.AI START//
////////////////

    var apiai = require('apiai');
    // Api.ai Token DO NOT SHARE THIS. Make sure to put in your discord bot token in at the bottem.
    var app = apiai("API_AI_CLIENT_TOKEN_KEY");

    var request = app.textRequest(`${input}`, {
      sessionId: '123TEST123'
    });

    // Log all responses.
    request.on('response', function(response) {
        let responseText = response.result.fulfillment.speech;
        message.reply(`${responseText}`);
        console.log(response);
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end()

    request.on('error', function(error) {
        console.log(error);
    });

//////////////
//API.AI END//
//////////////

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage("Hello " + member.user + " Welcome to the Devslopes community!")
});

//Login to Discord using oauth
bot.login('DISCORD_TOKEN_KEY');

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
