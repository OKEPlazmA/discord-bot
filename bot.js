var Discord = require ('discord.js');
const bot = new Discord.Client();

// this is the prefix - what is this
var prefix = '>';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message){

// Convert the message to UpperCase because is Case sensitive
var input = message.content.toUpperCase();

if (input === prefix + 'FREE FOR KICKSTARTER BACKER') {
  //Message - is the channel that it will be sent to
  // String - Te content of the mesage that will be sent
  message.reply("yes it's free for Kickstarter backer");
}





});

//Login using oauth
// oauth link
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwLZWw.ZtEx-ka6U68bm7EvwWKdctzTh9o');

// Node Js Server

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
