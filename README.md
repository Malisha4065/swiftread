# SwiftRead

A modern speed reading application built with Next.js, designed to help you read PDF documents faster using Rapid Serial Visual Presentation (RSVP).

## Features

- **PDF Support**: Upload and parse any PDF document.
- **RSVP Display**: Reads one word at a time with Optimal Recognition Point (ORP) highlighting (red letter) for efficient processing.
- **Adjustable Speed**: Control your reading speed from 100 to 1200 WPM.
- **Visual Guides**: Symmetric vertical guides to help focus your gaze.
- **Keyboard Controls**: Press **Space** to play/pause.
- **Text Navigation**: Seamlessly browse the entire text with an optimized, infinite-scrolling navigator.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:9002](http://localhost:9002) with your browser.

## Tech Stack

- **Framework**: Next.js 15 (Turbopack)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Processing**: pdfjs-dist

## Inspiration & Credits

The concept and design for the reading interface were inspired by this post on X:
[https://x.com/UltraLinx/status/2011434505253650868](https://x.com/UltraLinx/status/2011434505253650868)
