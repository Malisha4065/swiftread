"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import type { FC } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TextNavigatorProps = {
  words: string[];
  currentIndex: number;
  onSelectWord: (index: number) => void;
  onClose: () => void;
};

const CHUNK_SIZE = 1500; // Number of words to load per chunk

const TextNavigator: FC<TextNavigatorProps> = ({ words, currentIndex, onSelectWord, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState(() => {
    // Initial range centered around currentIndex
    const start = Math.max(0, currentIndex - CHUNK_SIZE / 2);
    const end = Math.min(words.length, start + CHUNK_SIZE);
    return { start, end };
  });

  // Refs for intersection observation
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Ref to track scroll preservation needs
  const previousScrollHeightRef = useRef<number>(0);
  const isPrependRef = useRef(false);

  // Initial scroll to current index
  useEffect(() => {
    const wordElement = document.getElementById(`word-${currentIndex}`);
    if (wordElement) {
      wordElement.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, []); // Only runs on mount

  // Handle scroll position preservation when prepending items
  useLayoutEffect(() => {
    if (isPrependRef.current && scrollContainerRef.current) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - previousScrollHeightRef.current;

      if (heightDifference > 0) {
        scrollContainerRef.current.scrollTop += heightDifference;
      }
      isPrependRef.current = false;
    }
  }, [visibleRange]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOption = {
      root: container,
      rootMargin: "200px", // Trigger loading before reaching the very edge
      threshold: 0.1,
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === topSentinelRef.current) {
          setVisibleRange((prev) => {
            if (prev.start <= 0) return prev;

            // Capture scroll height before update for preservation
            if (scrollContainerRef.current) {
              previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
              isPrependRef.current = true;
            }

            const newStart = Math.max(0, prev.start - CHUNK_SIZE / 2);
            return { ...prev, start: newStart };
          });
        }

        if (entry.target === bottomSentinelRef.current) {
          setVisibleRange((prev) => {
            if (prev.end >= words.length) return prev;

            const newEnd = Math.min(words.length, prev.end + CHUNK_SIZE / 2);
            return { ...prev, end: newEnd };
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOption);

    if (topSentinelRef.current) observer.observe(topSentinelRef.current);
    if (bottomSentinelRef.current) observer.observe(bottomSentinelRef.current);

    return () => observer.disconnect();
  }, [words.length]);

  const visibleWords = words.slice(visibleRange.start, visibleRange.end);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in duration-150">
      <header className="flex justify-between items-center w-full p-4 sm:p-6 md:p-8 border-b shrink-0">
        <h2 className="text-xl font-bold text-foreground">Navigate Text</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close Navigator">
          <X className="h-6 w-6" />
        </Button>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto p-4 sm:p-6 md:p-8"
      >
        <div className="text-xl md:text-2xl leading-relaxed text-left relative">
          {/* Top Sentinel */}
          <div ref={topSentinelRef} className="h-4 w-full" />

          {visibleWords.map((word, i) => {
            const actualIndex = visibleRange.start + i;
            return (
              <span
                key={`${actualIndex}-${word}`} // Using composite key for stability
                id={`word-${actualIndex}`}
                onClick={() => onSelectWord(actualIndex)}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-primary/20 p-1 rounded-md inline-block",
                  actualIndex === currentIndex ? "bg-primary/30" : "text-foreground/70"
                )}
              >
                {word}{' '}
              </span>
            );
          })}

          {/* Bottom Sentinel */}
          <div ref={bottomSentinelRef} className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};

export default TextNavigator;
