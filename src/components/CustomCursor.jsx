import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme } from '../context/ThemeContext'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  const cursorSpring = useSpring({
    to: { x: position.x, y: position.y },
    config: { mass: 0.2, tension: 300, friction: 20 }
  })

  const outerCursorSpring = useSpring({
    to: { x: position.x, y: position.y },
    config: { mass: 0.5, tension: 200, friction: 25 }
  })

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateCursor)
    return () => window.removeEventListener('mousemove', updateCursor)
  }, [])

  return (
    <>
      <animated.div
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference ${
          theme === 'dark' ? 'bg-white' : 'bg-purple-500'
        }`}
        style={{
          left: cursorSpring.x.to(x => `${x - 8}px`),
          top: cursorSpring.y.to(y => `${y - 8}px`),
          backdropFilter: 'blur(1px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      <animated.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-[99] ${
          theme === 'dark' 
            ? 'border-2 border-white/50' 
            : 'border-2 border-purple-500/50'
        }`}
        style={{
          left: outerCursorSpring.x.to(x => `${x - 16}px`),
          top: outerCursorSpring.y.to(y => `${y - 16}px`),
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      <animated.div
        className={`fixed w-12 h-12 rounded-full pointer-events-none z-[98] opacity-30 ${
          theme === 'dark' 
            ? 'border border-white/20' 
            : 'border border-purple-500/20'
        }`}
        style={{
          left: outerCursorSpring.x.to(x => `${x - 24}px`),
          top: outerCursorSpring.y.to(y => `${y - 24}px`),
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </>
  )
}

export default CustomCursor
