'use strict';


var Alexa = require('alexa-sdk');



var stopResponse = ['OK - I will stop but I will not be responsible for anyone getting eaten!',
                     'I will stop but you had better check it yourself then',
                     ]

var cancelingResponse = ['OK - I will cancel but I will not be responsible for anyone getting eaten!',
                     'I will cancel but you had better check it yourself then'
                     ];


var helpResponse = 'Tell me where to check and I will go and see if there are any monsters there. For example, Alexa ask Monster Checker to look under the stairs'




var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]'; NOTE THIS IS A COMPLETELY OPTIONAL STEP WHICH MAY CAUSE MORE ISSUES THAN IT SOLVES IF YOU DON'T KNOW WHAT YOU ARE DOING



var handlers = {
    
    'LaunchRequest': function () {


       
       
        this.emit(':ask', "Where do you want me to look?");      
        
        
    },

    'SearchIntent': function (overrideText) {
        
        console.log('Starting Search Intent')
        
        var things = ['moths','old socks', 'unfashionable clothes', 'dusty objects']
        
        var randomNumber = Math.floor(Math.random() * things.length)
        
        var responses = ['Funnily enough I just looked PLACE a few minutes ago, and I did not see any monsters. I think you will be ok.',
                 'Hang on a second, I will go and check PLACE. <break time="3s"/> OK - there were some ' + things[randomNumber] + ' there but nothing scary.',
                 'It is a well known fact that monsters do not like to sleep PLACE. So all is good!',
                
                ]
        
                
        var PLACE = this.event.request.intent.slots.search.value;
        randomNumber = Math.floor(Math.random() * responses.length)
        var resp = responses[randomNumber];
        resp = resp.replace('PLACE',PLACE)
        //res = resp + 'Would you like to check anywhere else?'
        
        this.emit(':tell', resp);

    },
    
    'Unhandled': function() {
        console.log('Unhandled event');
        
        
    },
    
    'AMAZON.StopIntent' : function () {
        console.log('Stop Intent')
        var randomNumber = Math.floor(Math.random() * stopResponse.length)
        this.emit(':tell', stopResponse[randomNumber]);
    
    },
    'AMAZON.CancelIntent' : function () {
        console.log('Cancel Intent')
        var randomNumber = Math.floor(Math.random() * cancelingResponse.length)
        this.emit(':tell', cancelingResponse[randomNumber]);
        
    },
    
    'AMAZON.HelpIntent' : function () {
        console.log('Help Intent')
        this.emit(':tell',  helpResponse);
        
    },
        
    
    'SessionEndedRequest': function () {
        console.log('Session ended request');
        console.log(`Session has ended with reason ${this.event.request.reason}`)

    }
};


exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    // Create DynamoDB Table
    //alexa.dynamoDBTableName = 'AlexaAssistantSettings';
    alexa.execute();
};



