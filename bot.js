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
  var kickstarterCondition1 = sentenceContains("KICKSTARTER BACKER") && ("COURSE");
  var kickstarterCondition2 = sentenceContains("KICKSTARTER") && ("COURSE");
  var kickstarterCondition3 = sentenceContains("BACKER") && ("COURSE");
  var lateEvent = sentenceContains("LATE") && ("PLEDGE");
  var macApp = sentenceContains("MAC") && ("APP") && ("DEVSLOPE");
  var tvApp = sentenceContains("TV") && ("APP") && ("DEVSLOPE");
  var devStickers = sentenceContains("DEVSLOPE") && ("STICKERS");
  var devBook = sentenceContains("DEVSLOPE") && ("BOOK");
  var loveBot = sentenceContains("LOVING") || ("LIKE") && ("BOT");
  var whosBot = sentenceContains("BOT WHO ARE YOU");
  var iAmPretty = sentenceContains("I AM PRETTY");

  // stackoverflow API
  if (input.includes('?')) {
       console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, prefix, ' '),message);
            }
   }

  //Conditional responses
  functionHelper.checkConditions([iAmPretty],
                                  message,
                                  "Yes. You are always Pretty. Keep Smiling.");
  functionHelper.checkConditions([loveBot],
                                  message,
                                  "Thank you. You are way cooler than me.");
  functionHelper.checkConditions([whosBot],
                                  message,
                                  "I'm here to help you to become a better developer. I am a work in progress.");
  functionHelper.checkConditions([kickstarterCondition1, kickstarterCondition2, kickstarterCondition3],
                                  message,
                                  "Kickstarter backers who pledged above $60 get lifetime access for FREE to any and all courses that Devslopes will ever release.");
  functionHelper.checkConditions([lateEvent],
                                  message,
                                  "Email jason@devslope.com for more info.");
  functionHelper.checkConditions([macApp],
                                  message,
                                  "The Mac and Apple TV app will be out by the end of the year.");
  functionHelper.checkConditions([tvApp],
                                  message,
                                  "The Mac and Apple TV app will be out by the end of the year.");
  functionHelper.checkConditions([devStickers],
                                  message,
                                  "https://itunes.apple.com/us/app/hacker-pack-coding-nerd-stickers/id1154247796?mt=8");
  functionHelper.checkConditions([devBook],
                                  message,
                                  "The Devslopes Book should be out Nov 30th for digital copy, physcical copies shortly after.");


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
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwQefg.p2rkiB8vIb5WHjbCyfCE3K1DA4s');


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
