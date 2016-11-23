var Discord = require('discord.js'),
    stackexchange = require('stackexchange'),
    VerEx = require('verbal-expressions'),
    search = require('youtube-search'),
    // The HTTP module
    http = require('http'),
    // to make https request e.g get,post,put,delete
    request = require('request'),
    functionHelper = require('./functionHelpers.js'),
    cleverbot = require("cleverbot.io") ;

// bot client You can now use the bots features
const bot = new Discord.Client();
const msg = new Discord.Message();
const guild = new Discord.Guild();
var newUsers = new Discord.Collection();
var userLeave = new Discord.Collection();
var guilds = new Discord.Collection();

cvtBot = new cleverbot('t90jx8jz3mxLgrfV','rkT50tkrhReR78fruo3YHGZaJub9leXT');
cvtBot.setNick("devs-session");
cvtBot.create(function (err, session) {

});



var prefix = '!';



// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    var input = message.content.toUpperCase();
    var msgContent = message.content;
    var lastMessage = false;
    functionHelper.lastMessage = lastMessage = false ;
    console.log(functionHelper.lastMessage + " boleana del message ");
    var regEx = /<|>/g;
    var reg = /[0-9]/g;
    var req3 = 	/[@]+/ ;
    var str1 = msgContent.replace(reg,"");
    var str2 = str1.replace(regEx,"");
    var str3 = str2.replace(req3,"");
    var userBot = message.guild.members.array()[6]
    console.log(str3 + " this is message");

    //prevent the bot from issuing commands
    if (message.author.bot) {
        return;
    }else

    //This part is where we define the conditions
    var kickstarterCondition1 = (input.includes("KICKSTARTER BACKER") && input.includes("COURSE"));
    var kickstarterCondition2 = (input.includes("KICKSTARTER") && input.includes("COURSE"));
    var kickstarterCondition3 = (input.includes("BACKER") && input.includes("COURSE"));
    var lateEvent = (input.includes("LATE") && input.includes("PLEDGE"));
    var macApp = (input.includes("MAC") && ("APP") && input.includes("DEVSLOPE"));
    var tvApp = (input.includes("TV") && input.includes("APP") && input.includes("DEVSLOPE"));
    var devStickers = (input.includes("DEVSLOPE") && input.includes("STICKERS"));
    var devBook = (input.includes("DEVSLOPE") && input.includes("BOOK"));
    var loveBot = ((input.includes("LOVING") || input.includes("LIKE") || input.includes("LOVE")) && input.includes("BOT"));
    var whosBot = (input.includes("BOT WHO ARE YOU"));
    var iAmPretty = (input.includes("I AM PRETTY"));
    var howBot = (input.includes("HOW") && input.includes ("BOT"));

    // Google Search Function
    if ((msgContent).startsWith("!G")) {
        console.log("input: " + input);
        functionHelper.googleSearch(functionHelper.removeThatPhrase(message.content, "!G", ' '), message);
    }else

    // stackoverflow API
    if ((msgContent).startsWith("!S")) {
        console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, '!S', ' '), message);
        }
    }else

    // YouTube API
    if ((msgContent).startsWith("!Y")) {
        functionHelper.youtubeApiResults((functionHelper.removeThatPhrase(input, '!Y', '')), message);

    }

    //Conditional responses
    functionHelper.checkConditions([iAmPretty], message, "Yes. You are always pretty. Keep smiling.",lastMessage);
    functionHelper.checkConditions([loveBot], message, "Thank you. You are way cooler than me.",lastMessage);
    functionHelper.checkConditions([whosBot], message, "I'm here to help you to become a better developer. I am a work in progress.",lastMessage);
    functionHelper.checkConditions([howBot], message, "Enter '!help' for a list of commands.",lastMessage);
    functionHelper.checkConditions([kickstarterCondition1, kickstarterCondition2, kickstarterCondition3], message, "Kickstarter backers who pledged above $60 get lifetime access for FREE to any and all courses that Devslopes will ever release.In the Devslope app not in  udemy",lastMessage );
    functionHelper.checkConditions([lateEvent], message, "Email jason@devslope.com for more info.",lastMessage);
    functionHelper.checkConditions([macApp], message, "The Mac and Apple TV app will be out by the end of the year.",lastMessage);
    functionHelper.checkConditions([tvApp], message, "The Mac and Apple TV app will be out by the end of the year.",lastMessage);
    functionHelper.checkConditions([devStickers], message, "https://itunes.apple.com/us/app/hacker-pack-coding-nerd-stickers/id1154247796?mt=8",lastMessage);
    functionHelper.checkConditions([devBook], message, "The Devslopes Book should be out Nov 30th for digital copy, physcical copies shortly after.",lastMessage);

    //Unconditional responses
    functionHelper.response(message);

    // This function check for !Course and !help and !Coupon
    functionHelper.messageAuthor(message, prefix);

    console.log(functionHelper.lastMessage + " Booleana del bot ");
    //AI of the bot
    if (message.isMentioned(userBot) && !functionHelper.lastMessage){

      // Call to CleverBot Ai
      cvtBot.ask(str3, function (err, response) {
        var req1 = /[,]/;
        var str1 = response.replace(req1,"");
        var str2 = "\n (This is a Automated message from the Cleverbot API.This answer is not related to the devslope community. This is just for fun.) "
        message.reply(str1 + str2);

      });
      return;
    }

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    let guild = member.guild
    member.user.sendMessage("Hello, Welcome to the Devslopes community! Use '!help' for more commands.")
});

// /////// ********* Discord.js Events ******** //////////////
// //this event get trigered when a new member join the Server(guild)
// bot.on("guildMemberAdd", (member) => {
//     console.log("memeber "+ member.user.username);
//     newUsers.set(member.user.id, member.user);
//     var mention = "<@"+member.user.id+">";
//     if(newUsers.size >= 2) {
//       var userlist = newUsers.map(u => mention).join(" ");
//      member.guild.defaultChannel.sendMessage("Hello " + userlist + " Welcome to the Devslopes community! Use '!help' for more commands.")
//      newUsers = new Discord.Collection();
//   }
// });
//
// //This event get triggered when a user leave the server
// bot.on("guildMemberRemove",(member) => {
//   if(newUsers.exists("id", member.user.id )){
//     newUsers.delete(member.user.id);
//     userLeave.set(member.user.id,member.user);
//     var userName = member.user.username;
//     if(userLeave.size > 1){
//       var userList = userLeave.map(u => userName).join(" ");
//      member.guild.defaultChannel.sendMessage(userList + " Leave the Server.")
//      userLeave = new Discord.Collection();
//    }
//   }
//
// });

//This event get trigered when the bot is ready
bot.on("ready", () => {
      guilds = bot.guilds.first();
      if(guilds.available){
        if(guilds.channels.first().name === "general"){
          //  bot.guilds.first().channels.first().sendMessage("Hello,I'm your bot and I'm Back!! with new function to help you. Now I have an AI and you can chat with me.Try me! ")
      }
      }else { // if the server is unavailable
        console.log(" Server unavailable line 98 of the code");
      }
});

///////******* Events for Safety Check ************ //////////

// This event get trigered when the bot is offline
bot.on('disconnect',()=> {
  guilds = bot.guilds.first();
   if(guilds.channels.first().name === "general"){
      bot.guilds.first().channels.first().sendMessage("OHHH noo! I'm offline. ")
   }
});
// This event is for general debugging Information
bot.on('debug',(The)=>{
  console.log("Debug message: "+ The);
});
//
// // this event get triggered whenever the Client encounters a serious connection error.
bot.on('error',(error) =>{
  guilds = bot.guilds.first();
   if(guilds.channels.first().name === "general"){
      bot.guilds.first().channels.first().sendMessage("OHHH noo! I have an error: "+ error)
   }
});

// This event get Triggered for general warnings
bot.on('warn',(The) => {
  guilds = bot.guilds.first();
   if(guilds.channels.first().name === "general"){
      bot.guilds.first().channels.first().sendMessage("I received this warnings from my programm: "+ The)
    }
});

// This event get triggered when the Client tries to reconnect after beign disconnect
bot.on('reconnecting',()=>{
  guilds = bot.guilds.first();
   if(guilds.channels.first().name === "general"){
      bot.guilds.first().channels.first().sendMessage("Hold on I'm trying to reconnect ")
    }

});










//Login to Discord using oauth
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwLZWw.ZtEx-ka6U68bm7EvwWKdctzTh9o');

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
