var element
var bags
var current = 0

document.addEventListener("DOMContentLoaded", function() {
    element = document.querySelector('#bar');
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
});        

var urlParams = new URLSearchParams(window.location.search);
const channelname = urlParams.get('channel'); 
const oauthToken =urlParams.get('key');  
bags =urlParams.get('bags');  

current = parseInt( localStorage.getItem("current-progress-bar-"+channelname) || 0) ;
console.log(current)

if(current==NaN)
  current=0;
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
        localStorage.setItem("current-progress-bar-"+channelname, current)
    }
  }
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}