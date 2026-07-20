"use client";

import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

export default function Schedule() {
  const scheduleData = [
    { time: "07:00 AM - 08:00 AM", class: "Vinyasa Flow", instructor: "Elena Rostova", type: "Morning Boost" },
    { time: "09:30 AM - 10:45 AM", class: "Hatha Harmony", instructor: "Marcus Vance", type: "Foundation" },
    { time: "12:00 PM - 01:00 PM", class: "Yin & Sound", instructor: "Sarah Jenkins", type: "Midday Calm" },
    { time: "05:30 PM - 06:30 PM", class: "Vinyasa Flow", instructor: "Elena Rostova", type: "Evening Flow" },
    { time: "07:00 PM - 08:15 PM", class: "Deep Restorative", instructor: "Sarah Jenkins", type: "Meditation" }
  ];

  return (
    <section id="schedule" className="py-28 bg-[#F4F8F2] dark:bg-[#0F1611] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#8DA97B]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Daily Sanctuary Rhythms
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4">
            Weekly Live & AI Sessions
          </h2>
          <p className="text-lg text-[#52625A] dark:text-[#C9D7C3] font-light leading-relaxed">
            Reserve your place in guided live studio sessions or drop into AI-personalized flows anytime.
          </p>
        </div>

        {/* Schedule Table */}
        <div className="max-w-4xl mx-auto glass-card-luxury bg-[#F8FBF6]/90 dark:bg-[#162019]/85 rounded-[2.5rem] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 shadow-xl shadow-[#2D4632]/5 overflow-hidden transition-all duration-300">
          <div className="divide-y divide-[#C9D7C3]/40 dark:divide-[#8DA97B]/15">
            {scheduleData.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#EEF5EA]/60 dark:hover:bg-[#1F2E23]/60 transition-colors duration-300"
              >
                {/* Time Block */}
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-[#EEF5EA] dark:bg-[#0F1611] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/20 flex items-center justify-center text-[#2D4632] dark:text-[#8DA97B]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#7A867F] dark:text-[#C9D7C3] uppercase tracking-wider">Time Slot</p>
                    <p className="text-base font-semibold text-[#233228] dark:text-[#F4F8F2]">{slot.time}</p>
                  </div>
                </div>

                {/* Class details */}
                <div className="flex-1 md:pl-10">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#2D4632] dark:text-[#8DA97B] bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-3 py-1 rounded-full mb-1.5">
                    {slot.type}
                  </span>
                  <h4 className="text-xl font-bold text-[#233228] dark:text-[#F4F8F2] font-display">
                    {slot.class}
                  </h4>
                </div>

                {/* Instructor & CTA */}
                <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-[#EEF5EA] dark:bg-[#0F1611] border border-[#C9D7C3]/50 flex items-center justify-center text-[#5D7555] dark:text-[#8DA97B]">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#52625A] dark:text-[#C9D7C3]">{slot.instructor}</span>
                  </div>
                  <button className="px-5 py-2.5 rounded-full bg-[#2D4632] hover:bg-[#1F2E23] text-white text-xs font-semibold shadow-sm transition-all duration-300 cursor-pointer">
                    Reserve Mat
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
