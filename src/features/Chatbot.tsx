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
      return "I've worked on several exciting projects including AgriGrid (agricultural intelligence platform), TaskFlow (project management tool), AttendEase (event management), Primestone Real Estate, and AfriArch (architectural visualization). Check out the Projects section for more details!";
    }
    
    if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack')) {
      return "My tech stack includes React, Node.js, TypeScript, PostgreSQL, MongoDB, Three.js for 3D, Tailwind CSS, and PHP. I'm also experienced in AI/ML, data analytics, and UI/UX design. See the Skills section for the full breakdown!";
    }
    
    if (lowerMsg.includes('experience') || lowerMsg.includes('work history') || lowerMsg.includes('job')) {
      return "I'm currently a Software Developer working as a freelancer (Remote, since 2024). I build scalable web applications, 3D experiences, and creative digital solutions. Check the Experience section for my full timeline!";
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
            role="dialog"
            aria-label="Levyn's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
            style={{ maxHeight: 'min(600px, 80vh)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-surface/60 px-4 py-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-1 to-accent-2 font-display text-sm font-bold text-white">
                  L
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-sm font-semibold text-content">
                  Levyn's Assistant
                </h3>
                <p className="font-mono text-[11px] text-green-400">Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-content/5 hover:text-content"
                aria-label="Close chat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-1 to-accent-2 text-[11px] font-bold text-white">
                      L
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.type === 'user'
                        ? 'rounded-br-md bg-accent-1 text-white'
                        : 'rounded-bl-md border border-border bg-surface-light/70 text-content'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-1 to-accent-2 text-[11px] font-bold text-white">
                    L
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface-light/70 px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 border-t border-border/60 px-4 py-3">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="rounded-full border border-border bg-surface-light/50 px-3 py-1.5 text-xs text-muted transition-all hover:border-accent-1/50 hover:text-content"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border bg-surface/60 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-void/40 px-3 transition-colors focus-within:border-accent-1/60">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent py-2.5 text-sm text-content placeholder-subtle focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-1 text-white transition-all hover:bg-accent-1-dark disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-subtle"
                  aria-label="Send message"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-1 to-accent-2 text-white shadow-lg shadow-accent-1/30"
            aria-label="Open chat"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-void bg-green-400" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
