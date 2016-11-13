var bot = require("./bot.js"),
    VerEx = require('verbal-expressions'),
    stackexchange = require('stackexchange');

//this is use in the line 44 of this code - do not remove
// is an object that contains one function
 fun = {
   replyToMessageWith: function (replyMessage,message) {
     message.reply(replyMessage);
   }
}


//Call this function if you want to remove something from a sentence
// Sentence: is the sentence you want to edit
// PHRASETOREPLACE: is the part of the sentence you want to change
// REPLACEPHRASEWITH: is what you want to replace the phrase with!
  exports.removeThatPhrase = function (sentence, phraseToReplace, replacePhraseWith) {
      var phrase = sentence;
      var newSentence = VerEx().find(phraseToReplace).replace(sentence, replacePhraseWith);
      console.log(newSentence);
      return newSentence
  }

  //Use this function to reply to a message! Just put your reply in as the variable;)
  exports.replyToMessageWith = function (replyMessage,message) {
      message.reply(replyMessage);
 }

  //////////////**************Message Author function ***************/////////////////
  // Move this function to is own file
 exports.messageAuthor = function(message,prefix){
   if (!message.content.startsWith(prefix))
       return;

   //prevent the bot from issuing commands
   if (message.author.bot) {
       return;
   }
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

 } ////////// end Message Author function


       //////////// ************* STACKOVERFLOW *************/////////////////////
   // Move this function to is own file      
  // This Functions do the search on stackoverflow
  exports.stackOverflowApiResults = function (question,message) {
       var options = {
           version: 2.2
       };
      var context = new stackexchange(options);
      var filter = {
           key: 'lSCrDdqvXp3Bru)3satyHw((', //PUT THE KEY TO STACKEXCHANGE HERE!!!!!!!!!!
          sort: 'relevance',
          answers: '1',
          q: question,
          order: 'asc'
      };
      context.search.advanced(filter, function(err, results) {
         if (results) {
             if (results.items[0].link) {
                 fun.replyToMessageWith(' Checkout these Links I found for you. If it is not what You are looking for ask me the same question in a different way, or add more detail(ex: !How do I shuffle an array in Swift?) :grinning: ' + (results.items[0].link) + ' ' + (results.items[1].link),message);
             }
         }
     });
  } ////////// End StackOverFlow function ////////////
