
//Import the required Libraries\\
//All the Twitter API requests would be implemented using Twit NodeJs Library available at https://github.com/ttezel/twit\\

var Twit=require('twit');
var R=require('prompt');
var JSon=require('jsonfile');
var fs=require('fs');
var prompt = require('prompt-sync')();
var keydown = require('keydown');
var NLP=require('natural');

//The API key to access the Twitter Account. I am obviously not putting mine public :P \\

var T=new Twit({
                 consumer_key: 
				 ,consumer_secret: 
				 ,access_token: 
				 ,access_token_secret: 
				 });
				 

Status=0;
function CheckExists(FileName)
{

//Check if tbe JSON file the user wants to store the data in already exists\\

       fs.stat(FileName+'.json',function(err,stat){
	   
	      if(err==null)
		  {
		  
		     return true;
		  
		  }
		  else if(err.code=='ENOENT')
		  {
		  
		     return false;
		  }
		  	   
	   })

}

function Search() 
{

//Search the Tweets over Twitter\\

      prompts.question('What tweets do you want to search?',function(Topic){
	  
		  prompts.question('How many Tweets?',function(Count){
		  
		  T.get('search/tweets',{q:Topic,count:Count},function(err,data,response)
		  {
	
			     
				   ViewTweets(data,Topic);
               			
			 
		  })
			 
		  })
		  
		  
		})

}	


function WriteData(Data){

//When function is called , it allows users to write data as JSON file\\
       
       prompts.question('What do you want to name the file?',function(Name)
	   {
	   
	   if(CheckExists(Name)==true)
	   {
	   
	      prompts.question("File by the name exists , do you want to Overwrite to the file? (Y/N)",function(ch)
		  {
		  
		    if(ch=="Y")
			{
			   		  JSon.writeFile(Name+'.json',Data, function (err) {
                        
						
						
						})
			
			}
		  
		  })
	   
	   }
	   else{
	  
		  JSon.writeFile(Name+'.json',Data, function (err) {
                        
						
						
						})	   
	   }

       console.log("\n");
	   console.log("\n");
	   console.log("Press Enter to Continue");
	   console.log("\n");
	   console.log("\n");


})
}
				 
function ViewTweets(data,topic) {


// Returns a Tweet Viewing Menu when function when called. Provides users a option of saving the relevant data as JSON file.\\

			 console.log("\n");
			 console.log("\n");
			 
			 console.log("What do you want to do?")
             console.log("1.View all Data");
             console.log("2.View only Tweets");
		     console.log("\n");
             
			 prompts.question('',function(ch){

			 if(ch==2)
			 {
			   
			   var tweets=data.statuses;
			   var Texts=[];
			   
			   for(var i=0;i<tweets.length;i++){
			   
			      console.log(tweets[i].text);
				  Texts[i]=tweets[i].text;
				  console.log('\n');
		   
			   }
			   
			   console.log("\n");
			   console.log("\n");
			   prompts.question("Do you want to write it to a JSON file? (Y/N)",function(D)
			   {
			   
			      if(D=="Y")
				  {
				      
					   WriteData(Texts);
				  
				  }
			   
			   })

			   console.log("\n");
			   console.log("\n");
			 
			 }
			 else if(ch==1)
			 {
			   
			   console.log(data);
			   
			   prompts.question("Do you want to write it to a JSON file? (Y/N)",function(D)
			   {
			   
			      if(D=="Y")
				  {
				      
					   WriteData(data);
				  
				  }
			   
			   }
			   )
			   
			   console.log("\n");
			   console.log("\n");
			 
			 
			 }
			 
		  })

}				 

function Stream()
{         

//Allows users to stream data on particular Topics continiously and store data as JSON when required\\

          var N=prompt("Enter number of Topics you want to Stream ");
		  
		  var Data=[];
		  
		  DataOnly=true;
		  
		  
		  var Topics=[];
		  
		  for(var i=0;i<N;i++)
		  {
		           var Topic=prompt("Enter Topic ")
		           Topics.push(Topic);
		 
		  }
		  
          var stream = T.stream('statuses/filter', { track: Topics })
		  console.log("\n");
		  console.log("\n");
		  console.log("STREAMING TOPICS");
		  console.log("\n");
		  console.log("\n");
		  console.log("1. Save current Tweets to JSON file");
		  console.log("2. To View Tweets only");
		  console.log("3. Quit Steaming");
 
          var choice=prompt("Enter Command");
		  
		  if(choice==1)
		  {
		  
		     WriteData(Data);
		  
		  
		  }
		  else if(choice==2)
		  {
		  
		     DataOnly=false;
		  
		  }
		  else if(choice==3)
		  {
		  
		     stream.stop();
		  
		  }
		  
		 
		  stream.on('tweet', function (tweet) {
		  
		  if(DataOnly=true)
		  {
		  console.log(tweet);
		  Data.push(tweet);
		  }
		  else{
		  console.log(tweet.statuses);
		  Data.push(tweet.statuses);
		  }
		  })

}

function ScheduleTweets()
{


    Tweets=[];
	Delay=[];
	
	var Number=prompt("How many tweets do you want to schedule?");
	
	for(var i=0;i<Number;i++)
	{
	
	  console.log("\n");
	  var tweet=prompt("Enter Tweet");
	  console.log("\n");
	  var delay=prompt("Delay of? (in seconds)");
	  console.log("\n");
	  Tweets.push(tweet);
	  Delay.push(delay*1000);
	
	}
    
	Tweet=""
    for(var i=0;i<Tweets.length;i++)
	{
	    
		Tweet=Tweets[i];
	    setTimeout(PostSchedule,Delay[i]);
		if(i==(Tweets.length-1))
		{
		   Main_Menu();
		}
	
	}
	
	function PostSchedule()
    {

       T.post('statuses/update', { status: Tweet}, function(err, data, response) {console.log("Tweet posted sucessfully!")})

    }
	

}


function Autoreply()
{

//Allows users to automatically retweet to new Followers or retweet to posts\\

       Reply="";
	   Msg="Thank You for following";
	   
       function Thank_User(event)
       {
       
	   var name=event.source.name;
	   var screenName=event.source.screen_name;
	   console.log("\n");
	   console.log("Followed by "+name+" "+screenName);
	   T.post('statuses/update', { status: '@'+screenName+' '+Msg}, function(err, data, response) {})
	   console.log("\n");
	   
       }
	   
      function followed(event)
      {

       var name=event.source.name;
	   var screenName=event.source.screen_name;
	   T.post('statuses/update', { status: '@'+screenName+" "+Reply}, function(err, data, response) {})
	   console.log("\n");

      }

       console.log("Do you want to thank followers (T) for following , send Custom message to new Followers (C) or set auto reply for new tweets ? (A)");
	   
	   var Re=prompt("Answer T , C or A");
	   
	   if(Re=="T")
	   {
	   
	      console.log("\n");
	      console.log("Waiting for followers...");
		  console.log("\n");
	      var stream = T.stream('user');
		  stream.on('follow',Thank_User);
	   
	   }
	   else if(Re=="A")
	   {
	   
	      console.log("\n");
	      console.log("Waiting for followers...");
	      console.log("\n");
	      var stream=T.stream('user');
	      Reply=prompt("What auto reply message would you like to set?");
	      stream.on('follow',followed);
	   
	   }
	   else if(Re=="C")
	   {
	   
	      console.log("\n");
	      console.log("Waiting for followers...");
		  console.log("\n");
	      var stream=T.stream('user');
	      Msg=prompt("What custom message would you like to send your new followers");
	      stream.on('follow',followed);
	   
	   }	   
	   else{
	   
	      Main_Menu();
	   
	   }
}


function Post()
{

//Allows users to post tweets immediately or after a desired time\\

    var Tweet=prompt("What do you want to post?");
	
	var Now=prompt("Do you want to post it now? (Y/N)");
	
	var Delay=0;
	
	if(Now=="Y")
	{
	
	       Delay=0;
	
	}
	else 
	{
	
	       Delay=prompt("After how many seconds?");
           Delay=Delay*1000;		   
	
	}

	
    setTimeout(PutTweet,Delay);
		   
    function PutTweet(){    
	       
		   
		   T.post('statuses/update', { status: Tweet }, function(err, data, response) {})
		   Main_Menu();
		   
	}
	
	
}

				 
				 
var rl = require("readline");
var prompts = rl.createInterface(process.stdin, process.stdout);

    console.log("\n");
	console.log("\n");
	console.log("Welcome to Twitter Dashbaord");
	console.log("\n");
	console.log("\n");
	console.log("Press Enter to Continue")
	console.log("\n");
	console.log("\n");
	prompts.prompt();
	Main_Menu();
	

function Main_Menu()
{	
	prompts.on('line',function(choice){
	
	       console.log("\n");
		   console.log("\n");
	       console.log("What do you want to do?")
           console.log("1.Search Tweets");
           console.log("2.Post a Tweet");
		   console.log("3.Stream Tweets");
		   console.log("4.Autoreply Mode");
	       console.log("5.Exit");
		   console.log("\n");
	       console.log("\n");
	
		  if(choice==1)
		  {
		  
		    Search();
		
		}
		  else if(choice==2)
		  {
		  
		    Post();
		  
		  }
		  else if(choice==3)
		  {
		    
		    Stream();
		  
		  }
		  else if(choice==4)
		  {
		  
		    console.log("\n");
			Autoreply();
			console.log("\n");
		  
		  }
		  else if(choice==5)
		  {
		    
			console.log("\n");
			console.log("EXIT");
			console.log("\n");
		    prompts.close();
		  
		  }
		  })

}