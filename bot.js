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
const bot = new Discord.Client();
var prefix = '.';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    var input = message.content.toUpperCase();
    var msgContent = message.content;

    //prevent the bot from issuing commands
    if (message.author.bot) {
        return;
    }

    //This part is where we define the conditions
    var kickstarterCondition1 = (input.includes("KICKSTARTER BACKER"));
    var kickstarterCondition2 = (input.includes("KICKSTARTER"));
    //var kickstarterCondition3 = (input.includes("BACKER") && input.includes("COURSE")); Commented out due to annoying commands
    var devslopesHelp = (input.includes("BUGS") && input.includes("APP"));
    var macApp = (input.includes("MAC") && ("APP") && input.includes("DEVSLOPE"));
    var tvApp = (input.includes("TV") && input.includes("APP") && input.includes("DEVSLOPE"));
    var iosApp = (input.includes("IOS") && input.includes("APP") && input.includes("DEVSLOPE"));
    var devStickers = (input.includes("STICKERS")); // && input.includes("STICKERS")); No Longer Needed
    var devBook = (input.includes("BOOK"));  // && input.includes("BOOK")); No Longer Needed
    var loveBot = (input.includes("LOVING") && input.includes("BOT"));
    var whosBot = (input.includes("BOT WHO ARE YOU"));
    var iAmPretty = (input.includes("I AM PRETTY"));
    var howBot = (input.includes("HOW") && input.includes ("BOT"));
    var devslopesSubscription = (input.includes("SUBSCRIPTION"));
    var devslopesCourses = (input.includes("COURSES"));

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
    functionHelper.checkConditions([iAmPretty], message, "Yes. You are always pretty. Keep smiling.");
    functionHelper.checkConditions([loveBot], message, "Thank you. You are way cooler than me.");
    functionHelper.checkConditions([whosBot], message, "I'm here to help you to become a better developer. I am a work in progress.");
    functionHelper.checkConditions([howBot], message, "Enter '!help' for a list of commands.");
    functionHelper.checkConditions([kickstarterCondition1, kickstarterCondition2], message, "Kickstarter backers who pledged above $60 get lifetime access for FREE to any and all courses that Devslopes will ever release.");
    functionHelper.checkConditions([devslopesHelp], message, "Email jason@devslope.com for help or queries.");
    functionHelper.checkConditions([macApp], message, "The Mac app is currently out and can be found at https://itunes.apple.com/app/id1183088305#");
    functionHelper.checkConditions([tvApp], message, "The IOS app is current out and can be found at https://itunes.apple.com/app/id1087131850#");
    functionHelper.checkConditions([iosApp], message, "The Apple TV app is current out and can be found by search 'Devslopes' within the store");
    functionHelper.checkConditions([devStickers], message, "https://itunes.apple.com/us/app/hacker-pack-coding-nerd-stickers/id1154247796?mt=8");
    functionHelper.checkConditions([devBook], message, "The Devslopes Book is now OUT! For more details please see https://devslopes.com/book.");
    functionHelper.checkConditions([devslopesSubscription], message, "For more information on Devslopes Subscription please see https://devslopes.com/subscribe.");
    functionHelper.checkConditions([devslopesCourses], message, "For more details on Devslopes Courses please see https://devslopes.com/courses.");
    //Unconditional responses
    functionHelper.response(message);

    // This function check for !Course and !help and !Coupon
    functionHelper.messageAuthor(message, prefix);

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    let guild = member.guild
    member.user.sendMessage("Welcome, please check out the Devslopes amazing app. Its available on Mac https://itunes.apple.com/app/id1183088305#, IOS https://itunes.apple.com/app/id1087131850# & you can also search Devslopes on the Tv App Store !! You can even redeem your course from Udemy to the platform ! You can see more detail from https://devslopes.com/platforms. If you have any questions please message JakeAttard or go to https://devslopes.com/ for more details! You can also use '!help' for more commands.")
});

//Login to Discord using oauth
bot.login('Token Key');

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
