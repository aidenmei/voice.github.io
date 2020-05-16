

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', ' green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', ' purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'


var col = "";


var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('#circle');
var bg = document.querySelector('#circle');
var hints = document.querySelector('.hints');


var diameter = window.prompt("Enter the diameter of the circle");

if(diameter > 600 || diameter < 2 ){


  alert("Diameter should be in range 2 to 600");

  diameter = 300;

}else{

draw();

}

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
//hints.innerHTML = 'Tap/click then say a "color" to change the background color';

var but = document.querySelector(".btn")

but.onclick = function() {
  recognition.start();
 // console.log('Ready to receive a color command.');

  but.innerHTML = "Stop"
 // alert("this was not working")


}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;
  //diagnostic.textContent = 'Result received: ' + color + '.';
 // bg.style.backgroundColor = color;
 but.innerHTML = "Stop";



    var mColor = "";
  
     if(color.includes("background")){
  /// set background
    
   
     mColor = color.substring(10, color.length)
     //alert(mColor)
      diagnostic.style.backgroundColor = mColor;
  
      
  
     }else if(color.includes("size")){
  // set size
  //alert("Size")
   mColor = color.substring(4, color.length)
  
     diameter = mColor;
  
     draw();
  
     }else if(color.includes("color")){
  /// set color of circle
  //alert("Color")
   mColor = color.substring(5, color.length)
  
  
  col = mColor;
  
      draw();
  
     }else if(color.includes("help")){
  
  /// user needs help
  //alert("help")
   mColor = color.substring(4, color.length)
  /// i will show options here.. 
       
  
  
     }
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
  but.innerHTML = "Stop";
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
  but.innerHTML = "Stop";
}

recognition.onerror = function(event) {
  but.innerHTML = "Stop";
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


















function draw() {
var canvas = document.getElementById('circle');

var ctx = canvas.getContext('2d'); 
var X = canvas.width / 2;
var Y = canvas.height / 2;
var R = diameter/2;
ctx.beginPath();
ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
ctx.lineWidth = 3;
ctx.strokeStyle = "#ccdddd";
ctx.fillStyle = col;
ctx.stroke()
ctx.fill();

  }


