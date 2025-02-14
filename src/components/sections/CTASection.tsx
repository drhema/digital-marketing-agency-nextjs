'use client'

export const CTASection = () => {
  return (
    <section id="cta" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl text-gray-600 dark:text-black-400 mb-12">
          Join the digital revolution and elevate your brand to new heights
        </p>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75"></div>
          <button className="relative px-12 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full font-bold hover:scale-105 transform transition duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  )
}
