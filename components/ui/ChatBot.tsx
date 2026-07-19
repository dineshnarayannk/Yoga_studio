"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const getBotResponse = (input: string): string => {
  const query = input.toLowerCase();
  
  if (query.includes("schedule") || query.includes("timetable") || query.includes("time") || query.includes("calendar") || query.includes("hour")) {
    return "Our studio is open Mon-Fri (6 AM - 9 PM) and Sat-Sun (8 AM - 6 PM). Check our interactive weekly slots on the [Schedule page](/schedule)!";
  }
  
  if (query.includes("class") || query.includes("style") || query.includes("hatha") || query.includes("vinyasa") || query.includes("yin")) {
    return "We offer Vinyasa Flow (energy), Hatha Harmony (alignment), and Yin Yoga (deep restoration). Explore curriculum details on the [Classes page](/classes).";
  }
  
  if (query.includes("price") || query.includes("cost") || query.includes("free") || query.includes("trial") || query.includes("membership") || query.includes("fee")) {
    return "Your first class is completely free! Claim your session by filling out our [Free Trial form](/enquiry).";
  }
  
  if (query.includes("where") || query.includes("location") || query.includes("address") || query.includes("map")) {
    return "We are located at 120 Serenity Lane, Wellness District, CA 90210. View the interactive map on our [Contact page](/contact?map=1).";
  }
  
  if (query.includes("instructor") || query.includes("guide") || query.includes("teacher") || query.includes("darius") || query.includes("elena") || query.includes("marcus") || query.includes("sarah")) {
    return "Our certified guides include Elena (Vinyasa), Marcus (Hatha), Sarah (Yin), and Darius (Strength). Read profiles on our [Instructors page](/instructors).";
  }
  
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste")) {
    return "Namaste! 🙏 I'm your Astrion Guide. How can I support your practice today? Ask me about classes, schedules, locations, or guides!";
  }
  
  return "I'd love to help you with that! For booking sessions, custom guides, or group bookings, feel free to send us an inquiry on our [Contact page](/contact) or drop by for a [Free Trial](/enquiry)!";
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Namaste! 🙏 Welcome to Astrion Studio. I'm your digital guide. Ask me anything about our classes, weekly schedule, instructors, or locations!",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    const input = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: getBotResponse(input),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 850);
  };

  const renderMessageText = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [_, label, url] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      parts.push(
        <Link
          key={url + matchIndex}
          href={url}
          onClick={() => setIsOpen(false)}
          className="text-astrian-sage dark:text-astrian-leaf font-semibold underline hover:text-astrian-moss dark:hover:text-white transition-colors"
        >
          {label}
        </Link>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-astrian-sage text-white flex items-center justify-center shadow-lg hover:bg-astrian-moss dark:bg-astrian-sage dark:hover:bg-[#4b5940] transition-all hover:scale-105 duration-300 cursor-pointer group focus:outline-none"
        aria-label="Open AI chatbot"
      >
        <span className="absolute inset-0 rounded-full bg-astrian-sage animate-ping opacity-25 -z-10" />
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-astrian-cream dark:bg-[#121413] border-b border-astrian-clay dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden relative border border-astrian-clay dark:border-white/10 bg-white">
                  <Image
                    src="/chatbot-avatar.png"
                    alt="Astrion Guide Avatar"
                    fill
                    className="object-contain scale-150 -translate-x-1 translate-y-0.5"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-astrian-charcoal dark:text-gray-100 font-display">Astrion Guide</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-astrian-charcoal/50 dark:text-gray-400 font-medium">Always Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-astrian-clay/30 dark:bg-white/5 text-astrian-charcoal/60 dark:text-gray-400 flex items-center justify-center hover:bg-astrian-clay/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Panel */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-astrian-oat/20 dark:bg-[#1c1f1d] custom-scrollbar"
            >
              {/* Welcoming Character Illustration */}
              <div className="p-4 bg-white dark:bg-[#121413] rounded-3xl border border-astrian-clay dark:border-white/5 flex items-center gap-4 shadow-sm transition-colors duration-300">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white border border-astrian-clay dark:border-white/5">
                  <Image
                    src="/chatbot-avatar.png"
                    alt="Astrion Guide Welcome"
                    fill
                    className="object-contain scale-125 -translate-x-1"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-astrian-charcoal dark:text-gray-100 font-display">Marcus</h4>
                  <p className="text-[11px] text-astrian-charcoal/60 dark:text-gray-400 leading-relaxed font-light mt-0.5">
                    Your personal yoga guide. Ask me about classes, weekly schedules, guides, or free trial inquiries.
                  </p>
                </div>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-4.5 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-astrian-sage text-white rounded-br-none"
                        : "bg-astrian-cream dark:bg-[#121413] text-astrian-charcoal dark:text-gray-200 rounded-bl-none border border-astrian-clay/50 dark:border-white/5"
                    }`}
                  >
                    {msg.sender === "user" ? msg.text : renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="bg-astrian-cream dark:bg-[#121413] text-astrian-charcoal dark:text-gray-200 rounded-[1.5rem] rounded-bl-none px-5 py-3 border border-astrian-clay/50 dark:border-white/5 flex gap-1 items-center">
                    <span className="h-2 w-2 rounded-full bg-astrian-charcoal/30 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-astrian-charcoal/30 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-astrian-charcoal/30 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Row */}
            <form 
              onSubmit={handleSend}
              className="border-t border-astrian-clay dark:border-white/5 px-6 py-4 flex items-center gap-3 bg-white dark:bg-[#1c1f1d] transition-colors duration-300"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 text-sm bg-astrian-oat/30 dark:bg-[#121413] border border-astrian-clay dark:border-white/10 px-4 py-3 rounded-2xl outline-none focus:border-astrian-sage focus:ring-1 focus:ring-astrian-sage/20 text-astrian-charcoal dark:text-gray-100 transition-all placeholder-astrian-charcoal/40 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="h-11 w-11 shrink-0 rounded-2xl bg-astrian-sage text-white disabled:opacity-40 flex items-center justify-center shadow-md hover:bg-astrian-moss transition-colors cursor-pointer"
                aria-label="Send query"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
