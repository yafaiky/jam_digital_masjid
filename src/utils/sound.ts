export function playBeepSound() {
  const beep = new Audio("/sounds/beep.mp3");
  beep.volume = 1.0;
  beep.play().catch(() => {});
}
