'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Don't worry, we're looking into it.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}