/**
 * @module Chatbot
 * @description Floating chatbot widget for portfolio interaction
 * @performance Optimized with memoization, lazy loading
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: "Hi there! 👋 I'm Levyn's virtual assistant. How can I help you today? Feel free to ask about projects, skills, or experience!",
    timestamp: new Date(),
  },
];

const QUICK_REPLIES = [
  'Tell me about your projects',
  'What are your skills?',
  'View your experience',
  'How can I contact you?',
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const generateResponse = useCallback((userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
      return "I've worked on several exciting projects including AgriGrid (agricultural intelligence platform), Ecowave (eco-tourism platform), TaskFlow (project management tool), AttendEase (event management), Primestone Real Estate, and AfriArch (architectural visualization). Check out the Projects section for more details!";
    }
    
    if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack')) {
      return "My tech stack includes React, Node.js, TypeScript, PostgreSQL, MongoDB, Three.js for 3D, Tailwind CSS, and PHP. I'm also experienced in AI/ML, data analytics, and UI/UX design. See the Skills section for the full breakdown!";
    }
    
    if (lowerMsg.includes('experience') || lowerMsg.includes('work history') || lowerMsg.includes('job')) {
      return "I'm currently a Senior Creative Developer at Flux Studio (Remote, 2022-present). I have 2+ years of experience building innovative web applications, 3D experiences, and creative digital solutions. Check the Experience section for my full timeline!";
    }
    
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
      return "You can reach me at levynbenjamin@gmail.com or connect on LinkedIn, GitHub, and Twitter. The Contact section has all my social links and a direct message form. I'd love to hear from you!";
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hello! 👋 Welcome to my portfolio. I'm here to help answer questions about my work, skills, or anything else you'd like to know!";
    }
    
    if (lowerMsg.includes('award') || lowerMsg.includes('achievement') || lowerMsg.includes('hackathon')) {
      return "I've been fortunate to win several awards including 1st place at Pwani Re-imagined Hackathon (Oct 2025), Regional Campus Tour Winner (Aug 2025), 2nd Position at County Annual Skills & Talent Competition (Feb 2026), and more. See the Events & Achievements section!";
    }
    
    if (lowerMsg.includes('education') || lowerMsg.includes('school') || lowerMsg.includes('university')) {
      return "I studied at Kenya Methodist University where I also had the opportunity to be a React Conference Speaker in Nov 2023, sharing knowledge about 3D experiences with React Three Fiber.";
    }
    
    return "That's a great question! I can help with questions about my projects, skills, experience, or achievements. Feel free to check the different sections of my portfolio, or ask me something specific!";
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, [generateResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-surface/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: '360px', maxHeight: '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-1 to-accent-2 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Levyn Bot</h3>
                  <p className="text-white/70 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent-1 scrollbar-track-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.type === 'user'
                        ? 'bg-accent-1 text-white rounded-br-sm'
                        : 'bg-surface-light text-slate-200 border border-border rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface-light border border-border rounded-2xl rounded-bl-sm p-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs px-3 py-1.5 bg-surface-light hover:bg-accent-1/20 text-slate-300 hover:text-accent-1 border border-border rounded-full transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-surface">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-surface-light border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-1 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-accent-1 hover:bg-accent-1/80 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-toggle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 shadow-lg shadow-accent-1/30 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              💬
            </motion.span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-surface" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
