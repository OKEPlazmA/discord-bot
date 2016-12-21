var Discord = require('discord.js'),
    stackexchange = require('stackexchange'),
    VerEx = require('verbal-expressions'),
    search = require('youtube-search'),
    // The HTTP module
    http = require('http'),
    // to make https request e.g get,post,put,delete
    request = require('request'),
    functionHelper = require('./functionHelpers.js');

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

    //This part is where we define the conditions
    //let kickstarterCondition1 = (input.includes("KICKSTARTER BACKER") && input.includes("COURSE"));
    //let kickstarterCondition2 = (input.includes("KICKSTARTER") && input.includes("COURSE"));
    //let kickstarterCondition3 = (input.includes("BACKER") && input.includes("COURSE"));
    let macApp = (input.includes("MAC") && ("APP"));
    let tvApp = (input.includes("TV") && input.includes("APP") && input.includes("DEVSLOPE"));
    let devStickers = (input.includes("DEVSLOPE") && input.includes("STICKERS"));
    let devBook = (input.includes("DEVSLOPE") && input.includes("BOOK"));
    let whosBot = (input.includes("BOT WHO ARE YOU"));
    let howBot = (input.includes("HOW") && input.includes ("BOT"));

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

    //Conditional responses
    functionHelper.checkConditions([whosBot], message, "I'm here to help you to become a better developer. I am a work in progress.");
    functionHelper.checkConditions([howBot], message, "Enter '!help' for a list of commands.");
    //Needs Updated
    //functionHelper.checkConditions([kickstarterCondition1, kickstarterCondition2, kickstarterCondition3], message, "Kickstarter backers who pledged above $60 get lifetime access for FREE to any and all courses that Devslopes will ever release.");
    functionHelper.checkConditions([macApp], message, "The Mac App is planned to be out Jan 1st.");
    //Needs Updated
    //functionHelper.checkConditions([tvApp], message, "The Mac and Apple TV app will be out by the end of the year.");
    functionHelper.checkConditions([devStickers], message, "https://itunes.apple.com/us/app/hacker-pack-coding-nerd-stickers/id1154247796?mt=8");
    functionHelper.checkConditions([devBook], message, "Get Devslopes Pre-Release eBook here: http://coderswag.com/products/devslopes-e-book-pre-release?utm_content=buffer7b962&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer");

    //Unconditional responses
    functionHelper.response(message);

    // This function check for !Course and !help and !Coupon
    functionHelper.messageAuthor(message, prefix);

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage("Hello " + member.user + " Welcome to the Devslopes community! Use '!help' for more commands.")
});

//Login to Discord using oauth
bot.login('TOKEN_KEY');

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
