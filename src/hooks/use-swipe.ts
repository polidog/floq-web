"use client";

import { useCallback, useRef, useState, useEffect } from "react";

type SwipeOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
};

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 0.3 }: SwipeOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const isActive = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    isHorizontal.current = null;
    isActive.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isActive.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    // First significant move: determine direction
    if (isHorizontal.current === null) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      if (!isHorizontal.current) {
        isActive.current = false;
        return;
      }
    }

    e.preventDefault();
    setIsSwiping(true);

    const el = ref.current;
    const maxOffset = el ? el.offsetWidth * 0.6 : 200;
    const clamped = Math.max(-maxOffset, Math.min(maxOffset, dx));
    setOffsetX(clamped);
    setDirection(clamped > 0 ? "right" : clamped < 0 ? "left" : null);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isActive.current || !isSwiping) {
      isActive.current = false;
      return;
    }

    isActive.current = false;
    const el = ref.current;
    const width = el?.offsetWidth ?? 300;

    if (Math.abs(offsetX) > width * threshold) {
      if (offsetX > 0 && onSwipeRight) {
        setOffsetX(width);
        setTimeout(() => onSwipeRight(), 250);
      } else if (offsetX < 0 && onSwipeLeft) {
        setOffsetX(-width);
        setTimeout(() => onSwipeLeft(), 250);
      } else {
        setOffsetX(0);
      }
    } else {
      setOffsetX(0);
    }

    setIsSwiping(false);
    setTimeout(() => setDirection(null), 300);
  }, [isSwiping, offsetX, threshold, onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { ref, offsetX, isSwiping, direction };
}
