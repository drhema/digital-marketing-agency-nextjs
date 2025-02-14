// src/lib/utils/readingTime.ts
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }