var Discord = require('discord.js');
var stackexchange = require('stackexchange');
var keyword_extractor = require("keyword-extractor");
var Discord = require('discord.js');

//Lets require/import the HTTP module
var http = require('http');
var bodyParser = require('body-parser');
// to make https request e.g get,post,put,delete
var request = require('request');

//Use Body parser
//app.use(bodyParser.json());

// Get method with the tittle of the variable question

var StackOverflowSearchUrl = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=' + tags + '&nottagged=' + nontagged + '&intitle=' + question + '&site=stackoverflow';

// search by tittle in the question
// this check the titlle of the question. Any tittle that have the breakpoint string will show in the response as an posible answer to the question. The bot will response the link of three of the best voted answer.
var question = "breakpoint";
// search the question with this tag
var tags = "swift";
// dont search a question with this tag
var nontagged = "objective%20c"
//
// bot client
const bot = new Discord.Client();

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    let prefix = '!';
    // Convert the message to UpperCase because is Case sensitive
    var input = message.content.toUpperCase();

    //making a call to stackoverflow
    //
    if (input.indexOf('?') > -1) {
        var sentence = message.content;
        if (sentence != "?") {
            var channelTags = [];
            var extraction_result = keyword_extractor.extract(sentence, {
                language: "english",
                remove_digits: true,
                return_changed_case: false,
                return_chained_words: false,
                remove_duplicates: true
            });
            //
            //Additional support for getting channels better search resutls
            if (Discord.Channel.id === 245373360215818240) { //DEVBOT CHANNEL116404983234035716
                channelTags === extraction_result.concat("bot", "node.js", "javascript", "discord");
            } else if (Discord.Channel.id === 207559045530255360) { //iOS 10 course CHANNEL
                channelTags === extraction_result.concat("iOS", "swift", "iphone", "xcode", "iOS10");
            } else if (Discord.Channel.id === 129421763439230977) { //ANDROID course CHANNEL
                channelTags === extraction_result.concat("Android", "java", "xml", "android studio");
            } else if (Discord.Channel.id === 116408187288027141) { //iOS course CHANNEL
                channelTags === extraction_result.concat("ios", "ios10", "iphone", "xcode", "swift");
            } else if (Discord.Channel.id === 236187750900957194) { //Unity 3D course CHANNEL
                channelTags = extraction_result.concat("unity3d", "c#", "iphone", "c++");
            } else if (Discord.Channel.id === 116408213208825864) { //TV OS course CHANNEL
                channelTags = extraction_result.concat("javascript", "tvos", "swift", "apple-tv");
            } else if (Discord.Channel.id === 116408248675991554) { //WATCH OS course CHANNEL
                channelTags = extraction_result.concat("swift", "watchos", "xcode", "iphone", "ios10");
            } else if (Discord.Channel.id === 116410895155986437) { //SWIFT CHANNEL
                channelTags = extraction_result.concat("swift", "xcode", "iphone", "ios10");
            } else if (Discord.Channel.id === 116410953079324673) { //OBJC course CHANNEL
                channelTags = extraction_result.concat("objc", "xcode", "iphone", "ios10", "objectivec", "objective-c");
            } else if (Discord.Channel.id === 123923261326229504) { //WEB DEV course CHANNEL
                channelTags = extraction_result.concat("react", "javascript", "react.js", "html", "css", "jquery", "sql", "mysql", "python");
            } else if (Discord.Channel.id === 131116113001054208) { //ANDROID CHANNEL
                channelTags = extraction_result.concat("Android", "java", "xml", "Android Studio");
            } else if (Discord.Channel.id === 116413405199466503) { //iOS 9 course CHANNEL
                channelTags = extraction_result.concat("iOS", "swift", "iphone", "xcode", "ios9");
            } else if (Discord.Channel.id === 187915743998771200) { //FIREBASE CHANNEL
                channelTags = extraction_result.concat("firebase");
            } else if (Discord.Channel.id === 162230646578741249) { //COURSE INTERMEDIATE CHANNEL
                channelTags = extraction_result.concat("ios", "ios9", "iphone");
            }

            console.log(channelTags);
            var options = {
                version: 2.2
            };
            var context = new stackexchange(options);

            var filter = {
                key: 'lSCrDdqvXp3Bru)3satyHw((', //PUT THE KEY TO STACKEXCHANGE HERE!!!!!!!!!!
                tagged: extraction_result,
                sort: 'relevance',
                order: 'desc'
            };

            // Get all the questions (http://api.stackexchange.com/docs/questions)
            //search.search
            context.questions.questions(filter, function(err, results) {
                console.log(results.items);
            })
            /*context.questions.answers(filter, function(err, results) {
                if (results) {
                    if (results.items) {

                        if (results.items[0].link) {
                            message.reply('Checkout this link ' + (results.items[1].link));
                        }
                        //console.log(results.items);

                    }
                    //message.reply('Checkout this link ' + (results.items[1].link));
                    if (results.has_more) {
                        console.log('The bot will say please do some research on your own there are alot of articles on this subject');
                    }
                }
            });*/
        }
    }
    //Making call to Stackexchange

    //** TODO Change this code to a Method that pass input via a Parameter
    var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
    var condition2 = input.includes("KICKSTARTER BACKER") && input.includes("FREE");

    var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
    var condition4 = input.includes("KICKSTARTER") && input.includes("COURSE");
    var condition5 = input.includes("BACKER") && input.includes("COURSE");

    var lateEvent = input.includes("LATE") && input.includes("PLEDGE");

    if (condition4 || condition3 || condition5) {
        //Message - is the channel that it will be sent to
        // String - Te content of the mesage that will be sent
        message.reply("yes it's free for Kickstarter backer who pledge above $100");
    }

    if (lateEvent) {
        message.reply("yeah email jason@devslope.com for more info");
    }

    if (input === "I AM PRETTY" || input === "I AM PRETTY ?") {
        message.reply("Yes. You are always Pretty. Keep Smiling. ");
    }

    if (input === "BOT WHO ARE YOU") {
        message.reply("I'm here to help you to become a better developer. I am a work in progress");
    }

    if ((input.includes("LOVING") || input.includes("LIKE")) && input.includes("BOT")) {
        message.reply("Thank you. You are way cooler than me");
    }

    if ((input.includes("Hello"))) {}

    // TODO: Search a Question in Google
    if (input.includes("Question")) {}

    //safety check so bot doesn't accidentally reply to non commands
    if (!message.content.startsWith(prefix))
        return;

    //prevent the bot from issuing commands
    if (message.author.bot)
        return;

    //!help displays all available commands
    let help = ["courses", "coupon"];

    if (message.content.startsWith(prefix + 'help')) {
        message.author.sendMessage("Here is a list of available commands:");

        for (var i in help) {
            message.author.sendMessage(prefix + help[i]);
        }
    }

    //!courses lists all courses in a message
    if (message.content.startsWith(prefix + 'courses')) {
        message.author.sendMessage("Here is a list of Devslopes courses:");
        message.author.sendMessage("https://www.udemy.com/devslopes-ios10/");
        message.author.sendMessage("https://www.udemy.com/sketch-design/");
        message.author.sendMessage("https://www.udemy.com/objectivec/");
        message.author.sendMessage("https://www.udemy.com/intermediate-ios/");
        message.author.sendMessage("https://www.udemy.com/learn-android/");
        message.author.sendMessage("https://www.udemy.com/apple-tv/");
        message.author.sendMessage("https://www.udemy.com/ios9-swift/");
    }

    //!coupon to display coupon for courses
    if (message.content.startsWith(prefix + 'coupon')) {
        message.author.sendMessage("iOS: http://bit.ly/2eu6XGC");
        message.author.sendMessage("Android: http://bit.ly/2flDQFk");
    }

    // TODO Event that store in a file when people give a new Suggestion that they want the bot to have. e.g condition = Bot it will be nice if you have -- some function--. Proccess - Store the function in a file for future implementation to the bot.

    // TODO Condition = Hi I can still get the -devslope- -iOS- -Kickstarter- book  . where I can buy the -devslope- book. Response = "Yes you can buy the book email jason@devslope.com"

    //TODO Create a void method to separate the code from here

    // TODO Condition = How to use the boot. Response = Step by step on how to use the bot

    // TODO Condition = What the bot can do. Create a Response for this

    //TODO Condition = I can get all the course that I paid in Udmey within the Desvlope app. Proccess = str.includes("COURSE") && str.includes("UDEMY") && str.includes("DEVSLOPE APP"). Response = No --Custom Response--

    //TODO Make a Grahical User Interface to add condition and Response an validate the input instead of adding each condition and Response in code.

    //TODO condition = when the --mac app-- --devslope mac app-- will be ready. response = the mac app will be ready in december 31

});

//Login to Discord using oauth
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwQefg.p2rkiB8vIb5WHjbCyfCE3K1DA4s');
//*************  Node Js Server  ************************//

//Lets define a port we want to listen to
//const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {

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
        console.log("Server listening on: http://localhost:%s", PORT);
    })
}
