var Twit=require('twit');
var R=require('prompt');
var JSon=require('jsonfile');
var fs=require('fs');
var prompt = require('prompt-sync')();


var T=new Twit({
                 consumer_key: 
				 ,consumer_secret: 
				 ,access_token: 
				 ,access_token_secret: 
				 });
				 

Status=0;
function CheckExists(FileName)
{

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
      prompts.question('What tweets do you want to search?',function(Topic){
	  
		  prompts.question('How many Tweets?',function(Count){
		  
		  T.get('search/tweets',{q:Topic,count:Count},function(err,data,response)
		  {
	
			     
				   ViewTweets(data,Topic);
               			
			 
		  })
			 
		  })
		  
		  
		})

}	

function Frequency(Tokens)
{

              for(var i=0;i<Tokens.length;i++)
              {
                  for(var j=0;j<Tokens.length;j++)
				    {
					      Corpus=Insert_Corpus(Tokens[i][j],Corpus);
					 
					}

              }

              console.log(Corpus.entries());              

}


function ViewTweets(data)
{

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
			   
               //Concurrent_Matrix(tweets);
			   			   
			   prompts.question("Do you want to write it to a JSON file? (Y/N)",function(D)
			   {
			   
			      if(D=="Y")
				  {
				      
					   WriteData(Texts);
					   Menu(data,Topic);
				  
				  }
                  else
				  {
				  
				       Menu(data,Topic);
				     
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
					   Menu(data,Topic);
				  
				  }
				  else
				  {
				  
				       Menu(data,Topic);
				  
				  }
			   
			   }
			   )
			   
			   console.log("\n");
			   console.log("\n");
            


              }
			  
              })
			  
}


function Menu(Data,Name)
{

              console.log("TWEETS");
			  console.log("ON");
			  console.log("\n");
			  console.log(Name);
			  console.log("\n");
			  console.log("1. View Tweets");
			  console.log("2. Word Frequency");
			 
              



}

function WriteData(Data){

       
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


          








}


function Post()
{

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
	       console.log("3.Post Random Tweet");
		   console.log("4. Stream Account");
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
		  else if(choice==4)
		  {
		    
			console.log("\n");
			console.log("EXIT");
			console.log("\n");
		    prompts.close();
		  
		  }
		  
		  })

}