//Template taken from https://youtu.be/kwcillcWOg0?si=sUalgBXiPEsZxIZe and adjusted to work with my webpage

 // video controls
 const videoPlayback = document.getElementById("videoTwo");
 const indicator = document.body;

 videoPlayback.addEventListener("play", function() {

    indicator.style.backgroundColor = "#00ca56";

  });

  videoPlayback.addEventListener("pause", function() {

    indicator.style.backgroundColor = "#ff5c5c";

  });






// Video
let video;

let classifier;

let label = 'loading...';


// STEP 1: Load the model!
function preload() {

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AcSHXP9zi/');

}


function setup () {

    

  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
     classifyVideo();

}

// STEP 2 classify!
function classifyVideo (){

    classifier.classify(video, gotResults); 

}


function draw () {


    // integrating video controls with image classifier
    if (label == 'Play') {
    
        videoPlayback.play();
    
    } else {

        videoPlayback.pause(); 

    }

}

// created a variable that pairs the debounce function with the classify function, now instead of constantly checking
// for changes, the new variable will wait 5 seconds between changes before it makes a decsion (play/pause)
const debounceClassifyVideo = debounce(classifyVideo, 3000);

// STEP 3: Get the classification!
    function gotResults(error, results) {

        if (error) {

            console.error(error);
            return;

        }

        label = results[0].label;
        debounceClassifyVideo();
        console.log(debounceClassifyVideo);


    }

// debounce function to delay the classifyVideo function running too frequently

function debounce(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  }
