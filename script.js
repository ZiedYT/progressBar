
var element
var bags
var current = 0

document.addEventListener("DOMContentLoaded", function() {
    element = document.querySelector('#bar');
    
    // Check if the element is found
    if (element) {
        // Change the width of the element to 50%
        element.style.width = '0%';
    
        // Change the text content of the element
        element.textContent = '0%';
    } else {
        // If the element is not found, log an error message
        console.error("Element not found!");
    }
        
    var urlParams = new URLSearchParams(window.location.search);
    const channelname = urlParams.get('channel'); 
    const oauthToken =urlParams.get('key');  
    bags =urlParams.get('bags');  

    // Define configuration options
    const opts = {
      identity: {
        username: 'botreading',
        password: oauthToken
      },
      channels: [
        channelname
      ]
    };
    
    // Create a client with our options
    const client = new tmi.client(opts);
    
    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);
    
    // Connect to Twitch:
    client.connect();
    
    // Called every time a message comes in
    function onMessageHandler (target, context, msg, self) {
      if (self) { return; } // Ignore messages from the bot
      var text = msg.trim();
      if( context.username.toLowerCase() == channelname.toLowerCase() || context.mod){
        if(text.split(" ")[0] == "!bag"){
            var bagnumb = parseInt(text.split(" ")[1]);
            if( !isNaN(bagnumb) ){
                current = bagnumb;
            }
            else if(text.split(" ")[1]=="next") {
                current=current + 1;
            }
            var pcent = Math.floor((current*100)/bags)
            if(pcent>=100){
              pcent=100;
              element.style.width = "99%"
              element.textContent = "100%" 
            }
            else{
              element.style.width = pcent+"%"
              element.textContent = pcent+"%"              
            }

        }
      }
    //   console.log(context)
    //   console.log(msg)
    //   console.log("---------")
    }
    
    function onConnectedHandler (addr, port) {
      console.log(`* Connected to ${addr}:${port}`);
    }
});

