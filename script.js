let video = document.querySelector('video');

let recordBtnCont = document.querySelector('.record-btn-cont');
let recordBtn = document.querySelector('.record-btn');

let captureBtnCont = document.querySelector('.capture-btn-cont');
let captureBtn = document.querySelector('.capture-btn');

let recorder;
let chunks = []; // Media data in chunks

let recordFlag = false;

let constraints = {
  video: true,
  audio: true,
};

// navigator global object -> will give information regarding the browser
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;

  recorder = new MediaRecorder(stream);

  recorder.addEventListener('start', (e) => {
    chunks = [];
    console.log('start');
  });

  recorder.addEventListener('dataavailable', (e) => {
    chunks.push(e.data);
  });

  recorder.addEventListener('stop', (e) => {
    // convert media chunks to video
    let blob = new Blob(chunks, { type: 'video/mp4' });

    let videoURL = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = videoURL;
    a.download = 'video.mp4';
    a.click();
  });
});

recordBtn.addEventListener('click', (e) => {
  if (!recorder) return;

  recordFlag = !recordFlag;

  let classes = recordBtn.classList;

  if (recordFlag) {
    recorder.start();
    classes.add('scale-record');
    startTimer();
  } else {
    recorder.stop();
    classes.remove('scale-record');
    stopTimer();
  }
});

let timerID;
let counter = 0;
let timer = document.querySelector('.timer');

function startTimer() {
  timer.style.display = 'block';
  function displayTimer() {
    let totalSeconds = counter;
    let hours = parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600; // remaining value
    let minutes = parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    let seconds = totalSeconds;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.innerText = `${hours}:${minutes}:${seconds}`;
    counter++;
  }

  timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerID);
  timer.innerText = '00:00:00';
  timer.style.display = 'none';
}
