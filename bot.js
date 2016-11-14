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
var prefix = '!';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
  var input = message.content.toUpperCase();

  //This part is where we define the conditions
  var kickstarterCondition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
  var kickstarterCondition2 = input.includes("KICKSTARTER") && input.includes("COURSE");
  var kickstarterCondition3 = input.includes("BACKER") && input.includes("COURSE");
  var lateEvent = input.includes("LATE") && input.includes("PLEDGE");

  // stackoverflow API
  if (input.includes('?')) {
       console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, prefix, ' '),message);
            }
   }

  //Conditional responses
  functionHelper.checkConditions([input === "I AM PRETTY" || input === "I AM PRETTY?" || input === "I AM PRETTY ?"],
                                  message,
                                  "Yes. You are always Pretty. Keep Smiling.");
  functionHelper.checkConditions([input.includes("LOVING"), input.includes("LIKE") && input.includes("BOT")],
                                  message,
                                  "Thank you. You are way cooler than me.");
  functionHelper.checkConditions([input === "BOT WHO ARE YOU"],
                                  message,
                                  "I'm here to help you to become a better developer. I am a work in progress.");
  functionHelper.checkConditions([kickstarterCondition1, kickstarterCondition2, kickstarterCondition3],
                                  message,
                                  "Kickstarter backers who pledged above $100 get lifetime access for FREE to any and all courses that Devslopes will ever release.");
  functionHelper.checkConditions([lateEvent],
                                  message,
                                  "Email jason@devslope.com for more info.");


  //Unconditional responses
  functionHelper.response(message);


  // This function check for !Course and !help and !Coupon
  functionHelper.messageAuthor(message,prefix);

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage("Hello " + member.user + " Welcome to the Devslopes community!")
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
    console.log("Server listening on: http://localhost:%s", process.env.npm_package_config_port);
});
