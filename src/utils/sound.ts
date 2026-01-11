let customAudio: HTMLAudioElement | null = null;
let defaultAudio: HTMLAudioElement | null = null;

// Initialize default audio
function initDefaultAudio() {
  if (!defaultAudio) {
    defaultAudio = new Audio("/sounds/beep.mp3");
  }
}

export function initAudio() {
  initDefaultAudio();
  defaultAudio?.play().then(() => {
    defaultAudio?.pause();
    if (defaultAudio) defaultAudio.currentTime = 0;
    console.log("Audio unlocked");
  });
}

export function playBeepSound() {
  initDefaultAudio();
  defaultAudio?.play().catch(err => console.log("Audio blocked:", err));
}

// Play custom sound from URL
export function playCustomSound(soundUrl: string) {
  try {
    if (!soundUrl) {
      // Fallback ke default beep
      playBeepSound();
      return;
    }

    if (customAudio) {
      customAudio.pause();
      customAudio.currentTime = 0;
    }

    customAudio = new Audio(soundUrl);
    customAudio.play().catch(err => {
      console.log("Custom audio blocked, falling back to default:", err);
      playBeepSound();
    });
  } catch (err) {
    console.log("Error playing custom sound:", err);
    playBeepSound();
  }
}

// Stop any playing sound
export function stopSound() {
  if (customAudio) {
    customAudio.pause();
    customAudio.currentTime = 0;
  }
  if (defaultAudio) {
    defaultAudio.pause();
    defaultAudio.currentTime = 0;
  }
}

// Get audio duration from file
export async function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
    };
    audio.onerror = () => {
      reject(new Error("Gagal membaca durasi audio"));
    };
  });
}

