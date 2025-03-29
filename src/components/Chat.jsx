import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme } from '../context/ThemeContext'

function Chat() {
  const { theme } = useTheme()
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' }
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = { text: input, isBot: false }
    setMessages(prev => [...prev, newMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { text: "I'm processing your request...", isBot: true }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <animated.div style={fadeIn} className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
      <div className="w-full max-w-4xl transform hover:scale-[1.02] transition-all duration-500">
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-800 shadow-[0_0_15px_rgba(168,_85,_247,_0.4)]' 
            : 'bg-white/50 border-gray-200 shadow-[0_0_15px_rgba(168,_85,_247,_0.2)]'
        } backdrop-blur-xl p-6 rounded-2xl shadow-2xl border h-[80vh] flex flex-col`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Assistant
            </h2>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 p-4 scroll-smooth">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isBot
                    ? theme === 'dark'
                      ? 'bg-gray-800/70 text-white'
                      : 'bg-gray-100/70 text-gray-900'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                } transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`flex-1 p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100/50 border-gray-300 text-gray-900 placeholder-gray-500'
              } border focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300`}
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(168,_85,_247,_0.4)]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </animated.div>
  )
}

export default Chat
