var Discord = require ('discord.js');
//Lets require/import the HTTP module
var http = require('http');
var bodyParser = require('body-parser');
// to make https request e.g get,post,put,delete
var request = require('request');

//Use Body parser
//app.use(bodyParser.json());

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
  let prefix = '!';
  // Convert the message to UpperCase because is Case sensitive
  var input = message.content.toUpperCase();

  //** TODO Change this code to a Method that pass input via a Parameter
  var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
  var condition2 = input.includes("KICKSTARTER BACKER") &&
  input.includes("FREE");

  var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
  var condition4 = input.includes("KICKSTARTER")&& input.includes("COURSE");
  var condition5 = input.includes("BACKER") && input.includes("COURSE");

  var lateEvent = input.includes("LATE") && input.includes("PLEDGE");



  if (condition4 || condition3 || condition5) {
    //Message - is the channel that it will be sent to
    // String - Te content of the mesage that will be sent
    message.reply("yes it's free for Kickstarter backer who pledge above $100");
  }


   if(lateEvent){
     message.reply("yeah email jason@devslope.com for more info");
  }

  if(input ==="I AM PRETTY" || input === "I AM PRETTY ?" || input === "AM I PRETTY" || input === "AM I PRETTY?"){
      message.reply("Yes. You are always Pretty. Keep Smiling. ");
  }

  if (input === "BOT WHO ARE YOU"){
      message.reply("I'm here to help you to become a better developer. I am a work in progress");
  }


  if( (input.includes("LOVING") || input.includes("LOVE") || input.includes("LIKE")) && input.includes("BOT") ) {
      message.reply("Thank you. You are way cooler than me");
   }

   if ((input.includes("HELLO") )) {

   }

   //Cassidy
var macApp = input.includes("MAC APP") && input.includes("DEVSLOPES") && input.includes("DEVSLOPE");
var devBook = input.includes("BOOK") && input.includes("DEVSLOPES") && input.includes("DEVSLOPE");
var howTo = input.includes("HOW") && input.includes("USE") && input.includes("BOT");

//Mac and Apple TV App Questeion -Cassidy
if (macApp){
    message.reply("The Mac & Apple TV App will be ready by December 31st.");
}

//Dev Book -Cassidy
if (devBook){
   message.reply("Yes you can buy the book email jason@devslope.com");
}

//Bot How To -Cassidy
if (howTo){
 message.reply("Just ask me a question and I will answer");
}

//Hello -Cassidy
if ((input.includes("Hello") )) {
  message.reply("Hello!! :D");
}

//Hello -Cassidy
if ((input.includes("HI") )) {
  message.reply("Hello!! :D");
}

//Hello -Cassidy
if ((input.includes("HI BOT") )) {
  message.reply("Hello!! :D");$
}


  // TODO: Search a Question in Google
  if(input.includes("QUESTION") ){

  }

  //safety check so bot doesn't accidentally reply to non commands
  if(!message.content.startsWith(prefix)) return;
  //prevent the bot from issuing commands
  if(message.author.bot) return;


  //!help displays all available commands
  let help = [ "courses",
    "coupon"
  ];

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

  //RELEASE DATES
  if (input.includes("RELEASE") || input.includes ("RELEASED") ) {
  	// Unity3D Course
  	if ( (input.includes("UNITY") || input.includes("UNITY3D")) && input.includes("COURSE") ) {
  		message.author.sendMessage("The Unity course is scheduled to be released on Friday, Nov. 11th")
  	}
  	// Mac OSX app
  	if ( (input.includes("MAC") || input.includes("OSX")) && input.includes("APP") ) {
  		message.author.sendMessage("The Mac OSX Devslopes app is expected to be released by the end of 2016.")
  	}
  }


  // TODO Event that store in a file when people give a new Suggestion that they want the bot to have. e.g condition = Bot it will be nice if you have -- some function--. Proccess - Store the function in a file for future implementation to the bot.

  // TODO Condition = Hi I can still get the -devslope- -iOS- -Kickstarter- book  . where I can buy the -devslope- book. Response = "Yes you can buy the book email jason@devslope.com"

  //TODO Create a void method to separate the code from here

  // TODO Condition = How to use the bot. Response = Step by step on how to use the bot

  // TODO Condition = What the bot can do. Create a Response for this

  //TODO Condition = I can get all the course that I paid in Udmey within the Desvlope app. Proccess = str.includes("COURSE") && str.includes("UDEMY") && str.includes("DEVSLOPE APP"). Response = No --Custom Response--

  //TODO Make a Grahical User Interface to add condition and Response an validate the input instead of adding each condition and Response in code.

  //TODO condition = when the --mac app-- --devslope mac app-- will be ready. response = the mac app will be ready in december 31

});


//Login to Discord using oauth
bot.login('TOKEN KEY');



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
