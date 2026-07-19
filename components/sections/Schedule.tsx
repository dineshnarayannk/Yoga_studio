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
    <section id="schedule" className="py-24 bg-astrian-oat relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Daily Calendar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-astrian-charcoal mb-4">
            Weekly Studio Schedule
          </h2>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Choose a time that fits your life. Our classes run throughout the day to support your personal rhythm.
          </p>
        </div>

        {/* Schedule Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-astrian-clay/60 shadow-[0_12px_40px_rgba(17,24,39,0.03)] overflow-hidden">
          <div className="divide-y divide-astrian-clay">
            {scheduleData.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-astrian-cream/30 transition-colors duration-300"
              >
                {/* Time Block */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-astrian-cream flex items-center justify-center text-astrian-sage">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-astrian-charcoal/40 uppercase tracking-wider">Time</p>
                    <p className="text-base font-semibold text-astrian-charcoal">{slot.time}</p>
                  </div>
                </div>

                {/* Class details */}
                <div className="flex-1 md:pl-12">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-astrian-sage bg-astrian-sage/10 px-2.5 py-0.5 rounded-md mb-1.5">
                    {slot.type}
                  </span>
                  <h4 className="text-xl font-bold text-astrian-charcoal font-display">
                    {slot.class}
                  </h4>
                </div>

                {/* Instructor & CTA */}
                <div className="flex items-center justify-between md:justify-end gap-12">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-astrian-clay flex items-center justify-center text-astrian-charcoal/60">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-astrian-charcoal/80">{slot.instructor}</span>
                  </div>
                  <button className="px-5 py-2.5 rounded-full border border-astrian-sage/30 text-astrian-sage hover:bg-astrian-sage hover:text-white transition-all duration-300 text-sm font-semibold cursor-pointer">
                    Reserve Space
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
