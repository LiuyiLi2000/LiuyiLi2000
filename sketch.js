

let dataServer;
let pubKey = "pub-c-92700ad9-3dc9-4dbd-8a25-bc4cb3dafe7c";
let subKey = "sub-c-6ddec004-2e0e-4a43-a4db-d27f56b314cd";
let secretKey = "sec-c-ZDc3YjAyNjctYmNmOC00MjhlLWFjMjUtNTQ1MTBiZTBkNTAy";

let occupancy = 0; 

let channelName = "presenceTest";

let allowMessage = false;

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Liuyi",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
 


 if (occupancy > 10) {
  background(255);
  text("wait for someone", windowWidth/2, windowHeight/2);

  allowMessage = false;

 } else if (occupancy > 1) {

  sendTheMessage();
  allowMessage = true;
  
 } else {
  background(255);
  text("wait for someone again", windowWidth/2, windowHeight/2); 
  allowmessage = false;

  }
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseY,
      y: mouseX
    },
  });
}

function readIncoming(inMessage) {

  if (allowMessage == true) { // if there is less than 10 people on the page draw circles then show the messages that are sent. 
 
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }

    noStroke();
    fill(random(0,255), random(0,255), random(0,255));
    ellipse(inMessage.message.x, inMessage.message.y, 50, 50);

  } 
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

}
