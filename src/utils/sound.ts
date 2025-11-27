const audio = new Audio("/sounds/beep.mp3");

export function initAudio() {
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    console.log("Audio unlocked");
  });
}

export function playBeepSound() {
  audio.play().catch(err => console.log("Audio blocked:", err));
}
