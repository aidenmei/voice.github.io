

var recognizer = new webkitSpeechRecognition(); //get new instance;

  function recognize()
  {

recognizer.start(); //start it
recognizer.onend = function() { //a function to restart it when it stops
               recognizer.start();
}

 
recognizer.onresult = function(event) { 
    var whatWasHeard = event.results[0][0].transcript; //get what was heard    
    document.body.innerHTML = whatWasHeard; //write it to the body
};

  //speechRecognization interface is the heart of recognization API
window.speechRecognition = window.speechRecognition ||window.webkitSpeechRecognition || window.mozSpeechRecognition ||window.webkitSpeechRecognition;

  if(window.speechRecognition == undefined)
  {
  alert("Speech Recogniztion API Not Supported");
  }
  else
  {
  //create a speechRecognization object
recognizer = new speechRecognition();

  //If set to "false" then recognizer stops listening automatically when user stops speaking the first sentence.
recognizer.continuous = true;

  //specify the language of speech. langauge must be in BCP 47 standard.
recognizer.lang = "en-US";

  //it set to true then onresult callback is fired after every word spoken by the user. Otherwise after end of sentence.
recognizer.interimResults = true;


  //fired when speech recognization starts listening.
recognizer.onstart = function(){
  alert("Recogniztion API started");
  }

  //fired everytime user stops speaking.
recognizer.onresult = function(event){  
  //event.resultIndex returns the index of first word spoken in the currently stoped sentence.
  //event.results.length is the total number of words spoken in this session.
  for(var count = event.resultIndex; count <event.results.length; count++)
  {
  //event.results array contains a array of word objects.
  //event.results[count][number], here 2D represents the most probable work for the spoken word.
  //event.result[count][number].transscript returns word string of the most probable word of the select word index.
document.getElementById("output").innerHTML += event.results[count][0].transcript;
  }
  }

  //fired when recognization is stopped manually or automatically.
recognizer.onend = function(){
recognizer = null;
  alert("Recogniztion API stopped");
  }

recognizer.start();
  }
  }

  function stop()
  {
  if(recognizer != null)
  {
  //stop it manually
recognizer.stop();
  alert("Recognization API stopped");
  }
  }