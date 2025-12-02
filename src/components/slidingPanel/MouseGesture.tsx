import { useEffect } from "react";

export default function MouseGesture({ onSwipeRight }: { onSwipeRight: () => void }) {
  useEffect(() => {
    let isDragging = false;
    let startX = 0;
    let endX = 0;

    function handleMouseDown(e: MouseEvent) {
      isDragging = true;
      startX = e.clientX;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      endX = e.clientX;
    }

    function handleMouseUp() {
      if (!isDragging) return;
      isDragging = false;

      const diff = endX - startX;
      if (diff > 120) onSwipeRight();
    }

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onSwipeRight]);

  return null;
}
