// src/components/AnimatedBackground.tsx
'use client'

import { type BackgroundCircle } from '@/types/types'

interface AnimatedBackgroundProps {
  circles: BackgroundCircle[]
  scrollPosition: number
}

export const AnimatedBackground = ({ circles, scrollPosition }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
      <div className="absolute inset-0 opacity-30">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full"
            style={{
              left: circle.left,
              top: circle.top,
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              background: `radial-gradient(circle, rgba(${circle.color.join(',')}, 0.1) 0%, transparent 70%)`,
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollPosition / 1000 + circle.id) * 0.2})`,
              transition: 'transform 0.5s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  )
}