var Discord = require('discord.js'),
    stackexchange = require('stackexchange'),
    VerEx = require('verbal-expressions'),
    // The HTTP module
    http = require('http'),
// to make https request e.g get,post,put,delete
    request = require('request'),
    functionHelper = require('./functionHelpers.js');

// bot client You can now use the bots features
const bot = new Discord.Client();
let prefix = '!';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
  var input = message.content.toUpperCase();

  //This part is where we define the conditions
  var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
  var condition2 = input.includes("KICKSTARTER BACKER") && input.includes("FREE");
  var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
  var condition4 = input.includes("KICKSTARTER") && input.includes("COURSE");
  var condition5 = input.includes("BACKER") && input.includes("COURSE");
  var lateEvent = input.includes("LATE") && input.includes("PLEDGE");


   if (input === "I AM PRETTY" || input === "I AM PRETTY ?") {
       functionHelper.replyToMessageWith("Yes. You are always Pretty. Keep Smiling. ",message);
   }
   if (input.includes("HOW USE BOT") ) {
       functionHelper.replyToMessageWith("If you want to search stackoverflow.com for your question type ! in the beginning of your question and dont forget the question mark",message);

   }
     // stackoverflow API
   if (input.includes('?')) {
       console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, prefix, ' '),message);
            }
   }
     if (condition4 || condition3 || condition5) {
        //Message - is the channel that it will be sent to
        // String - Te content of the mesage that will be sent
        functionHelper.replyToMessageWith("yes it's free for Kickstarter backer who pledge above $100",message);
    }

     if (lateEvent) {
        functionHelper.replyToMessageWith("yeah email jason@devslope.com for more info",message);
    }

     if ((input.includes("LOVING") || input.includes("LIKE")) && input.includes("BOT")) {
        functionHelper.replyToMessageWith("Thank you. You are way cooler than me",message);
    }
     // This function check for !Course and !help and !Coupon
     functionHelper.messageAuthor(message,prefix);

});

//Login to Discord using oauth
bot.login('MjQ1NjI0NzI4NDMyMTQ4NDgy.CwOzaQ.yB4TBGLmU9QMZcQrYt1aed3xZ20');


//*************  Node Js Server  ************************//
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
