"use client";

import { useState } from "react";
import FileUpload from "@/components/file-upload";
import SpeedReader from "@/components/speed-reader";

// Dummy text to be used instead of parsing a PDF.
const DUMMY_TEXT = `
SwiftRead is a cutting-edge application designed to revolutionize the way you consume written content. By leveraging the principles of speed reading, SwiftRead helps you process information faster without sacrificing comprehension. The core of the application lies in its ability to present words one by one at a controlled pace, minimizing eye movement and allowing your brain to focus solely on recognizing words. This technique, known as Rapid Serial Visual Presentation (RSVP), has been scientifically proven to increase reading speed significantly. Our user interface is meticulously crafted to provide a distraction-free environment. A dark charcoal gray background reduces eye strain, while high-contrast off-white text ensures maximum legibility. The most crucial part of each word, the focal point, is highlighted in a vivid red color. This guides your eyes and helps maintain concentration, making the reading process smoother and more efficient. With SwiftRead, you are in complete control. You can easily adjust the reading speed, measured in words per minute (WPM), to match your comfort level. Whether you are a seasoned speed reader or a beginner, you can find a pace that works for you. The application also features simple pause and play controls, giving you the flexibility to take a break whenever needed. Uploading your documents is a breeze. Although this demonstration uses sample text, the full version of SwiftRead will support PDF uploads, allowing you to speed read your reports, articles, and e-books effortlessly. The goal is to make reading more productive and enjoyable. Imagine finishing a lengthy report in a fraction of the time it would normally take, or getting through your reading list faster than ever before. SwiftRead is more than just a tool; it is a gateway to a more efficient way of learning and working. The smooth, crossfade animation between words is designed to prevent motion sickness and create a seamless reading flow. Every detail has been considered to ensure a world-class user experience. Welcome to the future of reading. Welcome to SwiftRead.
`;

export default function Home() {
  const [documentText, setDocumentText] = useState<string | null>(null);

  const handleUpload = () => {
    setDocumentText(DUMMY_TEXT);
  };

  const handleExit = () => {
    setDocumentText(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      {documentText ? (
        <SpeedReader text={documentText} onExit={handleExit} />
      ) : (
        <FileUpload onUpload={handleUpload} />
      )}
    </main>
  );
}
