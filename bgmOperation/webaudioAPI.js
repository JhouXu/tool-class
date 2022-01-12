var context;
var soundBuffer = null;

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  // Decode asynchronously
  var onError = function (e) {
    console.log(e);
  };

  request.onload = function () {
    context.decodeAudioData(
      request.response,
      function (buffer) {
        soundBuffer = buffer;
        playSound(soundBuffer);
      },
      onError
    );
  };
  request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource();
  console.log(source);
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

window.addEventListener("load", init, false);

function init() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    var url = "../bgm/bgm.mp3";
    loadSound(url);
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }
}

