import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h2>
        <p className="text-gray-600 dark:text-black-400 mb-8">Page not found</p>
        <Link 
          href="/en" 
          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
