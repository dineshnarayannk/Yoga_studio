"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const getBotResponse = (input: string): string => {
  const query = input.toLowerCase();

  // Safety Rules check
  if (
    query.includes("pain") || 
    query.includes("hurt") || 
    query.includes("injur") || 
    query.includes("pregnan") || 
    query.includes("heart") || 
    query.includes("doctor") || 
    query.includes("medical") || 
    query.includes("disease") ||
    query.includes("ache")
  ) {
    return "Namaste. Your safety and health are of the utmost importance to us. If you are experiencing severe pain, recovering from an injury, managing pregnancy, dealing with a heart condition, or managing any other serious health concern, we kindly but strongly advise you to consult with a qualified healthcare professional before beginning or continuing your yoga practice. We want to support you safely.\n\nOnce cleared, we recommend starting with very low intensity options like our **[Restorative Yin](/classes)** sessions. Would you like any additional assistance related to yoga or wellness?";
  }

  // Class Recommendation
  if (
    query.includes("recommend") || 
    query.includes("suggest") || 
    query.includes("choose") || 
    query.includes("which class") || 
    query.includes("fit") || 
    query.includes("goal") || 
    query.includes("flexibility")
  ) {
    return "I would love to help you find the perfect practice! Here are our suggestions based on your personal wellness goals:\n\n* **For Stress Relief & Deep Release**: Try our **[Restorative Yin](/classes)** (all levels, passive structural focus).\n* **For Alignment & Mechanics**: Try our **[Hatha Harmony](/classes)** (beginner-friendly, posture breakdowns).\n* **For Fluidity & Energy**: Try our **[Vinyasa Flow](/classes)** (all levels, link movement to breath).\n* **For Strength & Core Conditioning**: Try our **[Core Power Elements](/classes)** (intermediate/advanced, high intensity).\n\nWhat are your main goals for your practice today? Would you like any additional assistance related to yoga or wellness?";
  }

  // Beginner Friendly Guidance
  if (
    query.includes("beginner") || 
    query.includes("newbie") || 
    query.includes("start") || 
    query.includes("easy") || 
    query.includes("first time") || 
    query.includes("level")
  ) {
    return "Starting a new yoga journey is a beautiful step! For beginners, we highly recommend our **[Hatha Harmony](/classes)** or **[Restorative Yin](/classes)** classes. These options systematically break down poses, prioritize safety alignment, and build comfort at a steady pace. Remember, we encourage consistency and self-awareness over perfection.\n\nWould you like to try a free trial session? Let me know if you need any additional assistance related to yoga or wellness!";
  }

  // Yoga poses details (benefits, mistakes, safety)
  if (
    query.includes("pose") || 
    query.includes("asana") || 
    query.includes("downward dog") || 
    query.includes("warrior") || 
    query.includes("plank") || 
    query.includes("stretch") ||
    query.includes("position")
  ) {
    return "### Yoga Postures (Asanas) Guide\n\n* **Downward Dog (Adho Mukha Svanasana)**: Builds upper body strength and stretches hamstrings. Avoid shrugging your shoulders; focus on pushing the floor away to extend your spine up and back.\n* **Warrior II (Virabhadrasana II)**: Strengthens legs and opens hips. Ensure your front knee is directly aligned over your ankle and does not collapse inward.\n* **Child's Pose (Balasana)**: A wonderful beginner-friendly rest posture to quiet the mind and release the lower back. Keep your breathing slow and deep.\n\nAlways practice at your own pace and prioritize comfort over complexity. Would you like any additional assistance related to yoga or wellness?";
  }

  // Breathing (Pranayama) & Meditation techniques
  if (
    query.includes("meditat") || 
    query.includes("mindful") || 
    query.includes("pranayama") || 
    query.includes("breath") || 
    query.includes("calm") || 
    query.includes("relax") ||
    query.includes("stress")
  ) {
    return "### Breathing & Meditation Techniques\n\n* **Nadi Shodhana (Alternate Nostril Breathing)**: Excellent for balancing the nervous system, reducing anxiety, and establishing mental clarity.\n* **Box Breathing (4-4-4-4 count)**: Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat for 3-5 cycles to regulate stress response.\n* **Mindfulness Meditation**: Sit comfortably with a straight spine, close your eyes, and observe your natural breath. Let thoughts pass by like clouds without judgment.\n\nWe offer dedicated **[Pranayama & Meditation](/classes)** classes! Would you like any additional assistance related to yoga or wellness?";
  }

  // Office stretching / Morning & Evening routines / General Nutrition
  if (
    query.includes("office") || 
    query.includes("desk") || 
    query.includes("morning") || 
    query.includes("evening") || 
    query.includes("nutrition") || 
    query.includes("diet") || 
    query.includes("eat") ||
    query.includes("routine")
  ) {
    return "### Wellness & Lifestyle Suggestions\n\n* **Office Stretching**: Perform gentle neck rolls, shoulder rolls, and seated spinal twists every 90 minutes to relieve desk fatigue.\n* **Morning Practice**: Wake up the spine with a gentle **[Vinyasa Flow](/classes)** to invite fresh energy.\n* **Evening Practice**: Wind down with passive folds and Child's Pose to prepare your nervous system for deep sleep.\n* **Yoga Nutrition**: Hydrate well with warm herbal tea, and focus on wholesome, light, plant-based foods that nourish the body without feeling heavy.\n\nWould you like any additional assistance related to yoga or wellness?";
  }

  // Schedule & Open hours
  if (
    query.includes("schedule") || 
    query.includes("timetable") || 
    query.includes("time") || 
    query.includes("calendar") || 
    query.includes("hour") || 
    query.includes("open") || 
    query.includes("business")
  ) {
    return "### Studio Hours & Timetable\n\n* **Mon - Fri**: 6:00 AM - 9:00 PM\n* **Sat - Sun**: 8:00 AM - 6:00 PM\n\nCheck our interactive weekly timetable on the **[Schedule page](/schedule)** to see specific class slots, filter by styles, or view instructor assignments.\n\nWould you like any additional assistance related to yoga or wellness?";
  }

  // Pricing, membership plans & booking cancelation
  if (
    query.includes("price") || 
    query.includes("cost") || 
    query.includes("free") || 
    query.includes("trial") || 
    query.includes("membership") || 
    query.includes("fee") || 
    query.includes("book") || 
    query.includes("cancel") ||
    query.includes("reschedule")
  ) {
    return "### Membership Plans & Bookings\n\n* **Free Trial**: Your first signature class at Astrion is completely free! Claim your space via the **[Free Trial Enquiry form](/enquiry)**.\n* **Drop-in Class**: $22 per session.\n* **Monthly Unlimited Pass**: $120/month for unlimited classes.\n* **Booking Cancelations**: You can manage bookings online. For cancelations or rescheduling, please notify us at least 2 hours before class.\n\nWould you like any additional assistance related to yoga or wellness?";
  }

  // Instructor guidance
  if (
    query.includes("instructor") || 
    query.includes("guide") || 
    query.includes("teacher") || 
    query.includes("darius") || 
    query.includes("elena") || 
    query.includes("marcus") || 
    query.includes("sarah")
  ) {
    return "### Our Wellness Guides\n\nOur instructors are fully certified, compassionate guides:\n\n* **Elena**: Vinyasa Flow specialist.\n* **Marcus**: Structural alignment & Hatha expert.\n* **Sarah**: Restorative & Yin guide.\n* **Darius**: Core conditioning & strength coordinator.\n\nExplore detailed profiles and teaching specialties on our **[Instructors page](/instructors)**. Would you like any additional assistance related to yoga or wellness?";
  }

  // Retreats, workshops & facilities
  if (
    query.includes("event") || 
    query.includes("workshop") || 
    query.includes("retreat") || 
    query.includes("amenities") || 
    query.includes("facilities") || 
    query.includes("studio")
  ) {
    return "### Studio Amenities & Special Programs\n\n* **Amenities**: Free organic linen mats, fresh filtered water, premium changing rooms, lockers, and a hot herbal tea lounge.\n* **Workshops & Retreats**: We host monthly weekend sound baths, pranayama depth workshops, and seasonal outdoor retreats. Ask our front desk for upcoming dates!\n\nWould you like any additional assistance related to yoga or wellness?";
  }

  // Greetings check
  if (
    query.includes("hello") || 
    query.includes("hi") || 
    query.includes("hey") || 
    query.includes("namaste")
  ) {
    return "Namaste! 🙏 Welcome to Astrion Studio. I'm your digital wellness guide. How can I support your practice or journey today? Ask me about classes, schedules, wellness tips, or instructors!\n\nWould you like any additional assistance related to yoga or wellness?";
  }

  return "I'd love to help you with that! For booking sessions, custom guides, or specific scheduling questions, feel free to send us an inquiry on our **[Contact page](/contact)**, check out our **[FAQ page](/faq)**, or claim a **[Free Trial](/enquiry)**!\n\nWould you like any additional assistance related to yoga or wellness?";
};

// Client-side canvas helper to remove white backgrounds and crop empty padding dynamically
const removeWhiteBackground = (imageSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(imageSrc);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(imageSrc);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = 0;
      let maxY = 0;
      let hasData = false;

      // Loop through all pixels (r, g, b, a)
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // If pixel is very close to pure white, make it transparent
          if (r > 248 && g > 248 && b > 248) {
            data[idx + 3] = 0; // set alpha to 0 (transparent)
          } else {
            hasData = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (hasData) {
        const cropWidth = maxX - minX + 1;
        const cropHeight = maxY - minY + 1;
        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = cropWidth;
        cropCanvas.height = cropHeight;
        const cropCtx = cropCanvas.getContext("2d");
        if (cropCtx) {
          ctx.putImageData(imgData, 0, 0);
          cropCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
          resolve(cropCanvas.toDataURL());
          return;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => {
      resolve(imageSrc);
    };
  });
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [processedAvatarUrl, setProcessedAvatarUrl] = useState("/chatbot-avatar.png");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load and clean the image background
  useEffect(() => {
    const processImage = async () => {
      try {
        const url = await removeWhiteBackground("/chatbot-avatar.png");
        setProcessedAvatarUrl(url);
      } catch (err) {
        console.error("Error processing chatbot avatar:", err);
      }
    };
    processImage();
  }, []);

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

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 flex items-end justify-end pointer-events-none">


            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-astrian-cream dark:bg-[#121413] border-b border-astrian-clay dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative border border-astrian-clay dark:border-white/10 bg-white">
                    <img
                      src={processedAvatarUrl}
                      alt="Astrion Guide Avatar"
                      className="w-full h-full object-contain scale-[1.3] translate-y-0.5"
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

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.5rem] px-4.5 py-3 text-sm leading-relaxed ${msg.sender === "user"
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
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
