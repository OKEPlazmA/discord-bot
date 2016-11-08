var Discord = require ('discord.js');
var http = require('http');
const bot = new Discord.Client();


// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message){
  let prefix = '!';
  // Convert the message to UpperCase because is Case sensitive
  let input = message.content.toUpperCase();

  if (input === 'FREE FOR KICKSTARTER BACKER') {
    //Message - is the channel that it will be sent to
    // String - Te content of the mesage that will be sent
    message.reply("Yes, it's free for Kickstarter backers!");
  
  //safety check so bot doesn't accidentally reply to non commands   
  if(!message.content.startsWith(prefix)) return;
  
  }
});

//Login using oauth
// oauth link
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwLZWw.ZtEx-ka6U68bm7EvwWKdctzTh9o');

// Node Js Server

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
