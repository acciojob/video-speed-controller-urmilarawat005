  // Select DOM elements
const video = document.getElementById("video");
const playPauseButton = document.getElementById("playPause");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");
const volumeSlider = document.getElementById("volume");
const playbackSpeedSlider = document.getElementById("playbackSpeed");
const progressBar = document.querySelector(".progress-bar");
const progressFilled = document.getElementById("progressFilled");

// Functions
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = "❚ ❚"; // Pause symbol
    } else {
        video.pause();
        playPauseButton.textContent = "►"; // Play symbol
    }
}

function rewindVideo() {
    video.currentTime -= 10; // Rewind 10 seconds
}

function forwardVideo() {
    video.currentTime += 25; // Fast forward 25 seconds
}

function updateVolume() {
    video.volume = volumeSlider.value / 100; // Convert slider value (0-100) to video volume (0.0-1.0)
}

function updatePlaybackSpeed() {
    video.playbackRate = playbackSpeedSlider.value; // Set playback speed
}

function updateProgress() {
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${progressPercent}%`; // Update progress bar width
}

function scrub(event) {
    const scrubTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime; // Set current time based on scrub position
}

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
rewindButton.addEventListener("click", rewindVideo);
forwardButton.addEventListener("click", forwardVideo);
volumeSlider.addEventListener("input", updateVolume);
playbackSpeedSlider.addEventListener("input", updatePlaybackSpeed);
video.addEventListener("timeupdate", updateProgress);

// When the video ends, reset the play button
video.addEventListener("ended", () => {
    playPauseButton.textContent = "►"; // Reset to play icon
});

// Scrubbing functionality
let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
