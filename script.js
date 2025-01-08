// Select DOM elements
const video = document.getElementById("video");
const playPauseButton = document.getElementById("playPause");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");
const volumeSlider = document.getElementById("volume");
const playbackSpeedSlider = document.getElementById("playbackSpeed");
const progressBar = document.querySelector(".progress-bar");
const progressFilled = document.getElementById("progressFlled"); // Corrected ID

// Functions
function togglePlayPause() {
    const method = video.paused ? 'play' : 'pause';
    playPauseButton.textContent = video.paused ? '❚ ❚' : '►';
    video[method]();
}

function rewindVideo() {
    video.currentTime -= 10;
}

function forwardVideo() {
    video.currentTime += 25;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', handleProgress);

playPauseButton.addEventListener('click', togglePlayPause);

rewindButton.addEventListener('click', rewindVideo);
forwardButton.addEventListener('click', forwardVideo);

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);

volumeSlider.addEventListener('change', handleRangeUpdate);
volumeSlider.addEventListener('mousemove', handleRangeUpdate);

playbackSpeedSlider.addEventListener('change', handleRangeUpdate);
playbackSpeedSlider.addEventListener('mousemove', handleRangeUpdate);