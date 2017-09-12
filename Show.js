var Twit=require('twit');
var R=require('prompt');
var JSon=require('jsonfile');
var fs=require('fs');


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
				 
function Search() {

      prompts.question('What tweets do you want to search?',function(Topic){
	  
		  prompts.question('How many Tweets?',function(Count){
		  
		  T.get('search/tweets',{q:Topic,count:Count},function(err,data,response)
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
		  
		  
		})


})		
})

}				 

function Post()
{

    prompts.question('What do you want to post?',function(Post){
    T.post('statuses/update', { status: Post }, function(err, data, response) {
    prompts.question('Do you want view Post Data? (Y/N)',function(Choice){
	
	  if(Choice=='Y')
	  {
	    
	       console.log(data);
		   console.log("\n");
		   console.log("Press Enter to Continue");
		   console.log("\n");
	  
	  }
	  else{
	  
	       console.log("\n");
	       console.log("Press Enter to Continue");
	       console.log("\n");
		   
	  }
	
	})
	
   })


   })

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
	
	
	prompts.on('line',function(choice){
	
	       console.log("\n");
		   console.log("\n");
	       console.log("What do you want to do?")
           console.log("1.Search Tweets");
           console.log("2.Post a Tweet");
	       console.log("3.Post Random Tweet");
	       console.log("4.Exit");
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