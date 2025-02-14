// src/components/WhyChooseUs.tsx
'use client'

interface WhyChooseUsProps {
  title: string
  items: {
    title: string
    description: string
  }[]
}

export function WhyChooseUs({ title, items }: WhyChooseUsProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-purple-600 dark:text-purple-400">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}