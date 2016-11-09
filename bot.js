var Discord = require ('discord.js');
//Lets require/import the HTTP module
var http = require('http');
// to make https request e.g get,post,put,delete
var request = require('request');

// Get method with the tittle of the variable question
var StackOverflowSearchUrl = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged='+ tags +'&nottagged='+ nontagged + '&intitle='+ question + '&site=stackoverflow';

// search by tittle in the question
// this check the titlle of the question. Any tittle that have the breakpoint string will show in the response as an posible answer to the question. The bot will response the link of three of the best voted answer.
var question = "breakpoint";
// search the question with this tag
var tags = "swift";
// dont search a question with this tag
var nontagged = "objective%20c"

// bot client
const bot = new Discord.Client();


 // TODO Parse JSON From StackOverflowSearchUrl
request(StackOverflowSearchUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("Parse Json Here");
    //  console.log(body) // Show the HTML for the Google homepage.
    // var info = JSON.parse(body);
    // console.log(info.items[0])

  }
})

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message){

// Convert the message to UpperCase because is Case sensitive
var input = message.content.toUpperCase();


//** TODO Change this code to a Method that pass input via a Parameter
var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
var condition2 = input.includes("KICKSTARTER BACKER") && input.includes("FREE");
var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
var condition4 = input.includes("KICKSTARTER")&& input.includes("COURSE");
var condition5 = input.includes("BACKER") && input.includes("COURSE");
var lateEvent = input.includes("LATE") && input.includes("PLEDGE");

if (condition4 || condition3 || condition5){
  message.reply("Yes it's free for Kickstarter backer who pledge above $100.");
}

if(lateEvent){
   message.reply("Yeah email jason@devslope.com for more info.");
}

if(input === "I AM PRETTY" || input === "I AM PRETTY ?"){
    message.reply("Yes,You are always Pretty. Keep Smiling.");
}

if (input === "BOT WHO ARE YOU"){
    message.reply("I'm here to help you to became a better developer. I am a work in progress");
}

if( (input.includes("LOVING") || input.includes("LIKE")) && input.includes("BOT") ){
    message.reply("Thank you. You are way more cool than me");
 }

//Mac and Apple TV App Questeion -Cassidy
var macTVApp = input.includes("MAC APP") || input.includes("APPLE TV APP") || input.includes("APPLE TV") || input.includes("MAC");
var devSlope = input.includes("DEVSLOPE")|| input.includes("DEVSLOPES");
if (macTVApp && devSlope){
     message.reply("The Mac & Apple TV App will be ready by December 31st.");
 }

//Hello -Cassidy
 if ( input.includes("HELLO") || input.includes("HI") ){
   message.reply("Hello, how are you?");
 }

// TODO: Search a Question in Google -Cassidy


// TODO: Dev Book -Cassidy
var devBook = input.includes("BOOK");
if (devBook && devSlope){
    message.reply("Yes you can buy the book email jason@devslope.com")
}

// TODO How to use the bot -Cassidy
if ( input.includes("HOW") && input.includes("USE") && input.includes("BOT") ){
  message.reply("All you do is ask me a question and I will answer you.");
}

// TODO What the bot can do  -Cassidy
if ( (input.includes("WHAT") || input.includes("CAN")) && input.includes("BOT") ){
  message.reply("I can answer questions about programing or about Devslopes.")
}


// TODO Event that store in a file when people give a new Suggestion that they want the bot to have. e.g condition = Bot it will be nice if you have -- some function--. Proccess - Store the function in a file for future implementation to the bot.

//TODO Create a void method to separate the code from here

//TODO Condition = I can get all the course that I paid in Udmey within the Desvlope app. Proccess = str.includes("COURSE") && str.includes("UDEMY") && str.includes("DEVSLOPE APP"). Response = No --Custom Response--

//TODO Make a Grahical User Interface to add condition and Response an validate the input instead of adding each condition and Response in code.





});


//Login to Discord using auth
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
    console.log("Server listening on: http://localhost:%s", PORT);
});
