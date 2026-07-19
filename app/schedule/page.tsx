"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Calendar, SlidersHorizontal, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClassSession {
  id: string;
  time: string;
  className: string;
  instructor: string;
  type: string;
  category: "vinyasa" | "hatha" | "yin" | "meditation" | "power";
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
}

const scheduleSessions: ClassSession[] = [
  { id: "1", time: "07:00 AM - 08:00 AM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Morning Boost", category: "vinyasa", difficulty: "all", day: "Monday" },
  { id: "2", time: "09:30 AM - 10:45 AM", className: "Hatha Harmony", instructor: "Marcus Vance", type: "Foundation", category: "hatha", difficulty: "beginner", day: "Monday" },
  { id: "3", time: "12:00 PM - 01:00 PM", className: "Yin & Sound", instructor: "Sarah Jenkins", type: "Midday Calm", category: "yin", difficulty: "all", day: "Monday" },
  { id: "4", time: "05:30 PM - 06:30 PM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Evening Flow", category: "vinyasa", difficulty: "intermediate", day: "Monday" },
  { id: "5", time: "07:00 PM - 08:15 PM", className: "Deep Restorative", instructor: "Sarah Jenkins", type: "Meditation", category: "meditation", difficulty: "all", day: "Monday" },
  
  { id: "6", time: "09:30 AM - 10:45 AM", className: "Hatha Harmony", instructor: "Marcus Vance", type: "Foundation", category: "hatha", difficulty: "beginner", day: "Tuesday" },
  { id: "7", time: "06:30 PM - 07:30 PM", className: "Core Power Elements", instructor: "Darius Coleman", type: "Power & Balance", category: "power", difficulty: "advanced", day: "Tuesday" },
  
  { id: "8", time: "07:00 AM - 08:00 AM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Morning Boost", category: "vinyasa", difficulty: "all", day: "Wednesday" },
  { id: "9", time: "12:00 PM - 01:00 PM", className: "Yin & Sound", instructor: "Sarah Jenkins", type: "Midday Calm", category: "yin", difficulty: "all", day: "Wednesday" },
  { id: "10", time: "05:30 PM - 06:30 PM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Evening Flow", category: "vinyasa", difficulty: "intermediate", day: "Wednesday" },
  { id: "11", time: "07:00 PM - 08:15 PM", className: "Deep Restorative", instructor: "Sarah Jenkins", type: "Meditation", category: "meditation", difficulty: "all", day: "Wednesday" },

  { id: "12", time: "09:30 AM - 10:45 AM", className: "Hatha Harmony", instructor: "Marcus Vance", type: "Foundation", category: "hatha", difficulty: "beginner", day: "Thursday" },
  { id: "13", time: "07:00 PM - 08:15 PM", className: "Deep Restorative", instructor: "Sarah Jenkins", type: "Meditation", category: "yin", difficulty: "all", day: "Thursday" },

  { id: "14", time: "07:00 AM - 08:00 AM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Morning Boost", category: "vinyasa", difficulty: "all", day: "Friday" },
  { id: "15", time: "09:30 AM - 10:45 AM", className: "Hatha Harmony", instructor: "Marcus Vance", type: "Foundation", category: "hatha", difficulty: "beginner", day: "Friday" },
  { id: "16", time: "06:30 PM - 07:30 PM", className: "Core Power Elements", instructor: "Darius Coleman", type: "Power & Balance", category: "power", difficulty: "intermediate", day: "Friday" },

  { id: "17", time: "09:00 AM - 10:30 AM", className: "Vinyasa Flow", instructor: "Elena Rostova", type: "Weekend Flow", category: "vinyasa", difficulty: "intermediate", day: "Saturday" },
  { id: "18", time: "10:45 AM - 12:00 PM", className: "Core Power Elements", instructor: "Darius Coleman", type: "Strength", category: "power", difficulty: "advanced", day: "Saturday" },

  { id: "19", time: "10:00 AM - 11:30 AM", className: "Hatha Masterclass", instructor: "Marcus Vance", type: "In-Depth Practice", category: "hatha", difficulty: "advanced", day: "Sunday" },
  { id: "20", time: "04:00 PM - 05:30 PM", className: "Sound Bath Healing", instructor: "Sarah Jenkins", type: "Meditation", category: "meditation", difficulty: "all", day: "Sunday" }
];

type CategoryFilter = "all" | "vinyasa" | "hatha" | "yin" | "meditation" | "power";
type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";
type DayFilter = "All Days" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<DayFilter>("Monday");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Styles", value: "all" },
    { label: "Vinyasa", value: "vinyasa" },
    { label: "Hatha", value: "hatha" },
    { label: "Yin", value: "yin" },
    { label: "Meditation", value: "meditation" },
    { label: "Power", value: "power" }
  ];

  const difficulties: { label: string; value: DifficultyFilter }[] = [
    { label: "All Levels", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" }
  ];

  const days: DayFilter[] = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  // Filtering Logic
  const filteredSessions = scheduleSessions.filter((session) => {
    const matchesDay = selectedDay === "All Days" || session.day === selectedDay;
    const matchesCategory = category === "all" || session.category === category;
    const matchesDifficulty = difficulty === "all" || session.difficulty === difficulty;
    return matchesDay && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-astrian-oat pt-32 pb-24 text-astrian-charcoal font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Timetable
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal mb-6 leading-tight">
            Weekly Calendar
          </h1>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Plan your practice week. Use the filters below to browse classes by day, yoga discipline, or experience level.
          </p>
        </div>

        {/* Filters Panel */}
        <Card className="p-8 mb-12 bg-white border border-astrian-clay/60 shadow-sm rounded-[2.5rem]">
          <div className="flex flex-col gap-8">
            
            {/* Days Filter */}
            <div className="w-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-astrian-charcoal/40 mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-astrian-sage" />
                Select Day
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      selectedDay === day
                        ? "bg-astrian-sage text-white shadow-sm"
                        : "bg-astrian-cream/60 border border-astrian-clay hover:border-astrian-sage/30 text-astrian-charcoal"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Styles & Levels filters (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-astrian-clay/40 pt-8">
              
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-astrian-charcoal/40 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-astrian-sage" />
                  Filter by Style
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        category === cat.value
                          ? "bg-astrian-charcoal text-white"
                          : "bg-astrian-cream/40 border border-astrian-clay text-astrian-charcoal/80 hover:bg-astrian-clay"
                      }`}
                    >
                      {category === cat.value && <Check className="h-3 w-3" />}
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-astrian-charcoal/40 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-astrian-sage" />
                  Filter by Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setDifficulty(level.value)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        difficulty === level.value
                          ? "bg-astrian-charcoal text-white"
                          : "bg-astrian-cream/40 border border-astrian-clay text-astrian-charcoal/80 hover:bg-astrian-clay"
                      }`}
                    >
                      {difficulty === level.value && <Check className="h-3 w-3" />}
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </Card>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-astrian-clay/60 shadow-[0_12px_40px_rgba(17,24,39,0.03)] overflow-hidden">
          <div className="divide-y divide-astrian-clay">
            <AnimatePresence mode="popLayout">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
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

                    {/* Class Details */}
                    <div className="flex-1 md:pl-12">
                      <div className="flex gap-2 mb-1.5">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-astrian-sage bg-astrian-sage/10 px-2.5 py-0.5 rounded-md">
                          {slot.type}
                        </span>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-astrian-charcoal/60 bg-astrian-clay px-2.5 py-0.5 rounded-md">
                          {slot.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-astrian-charcoal font-display">
                        {slot.className}
                      </h4>
                    </div>

                    {/* Instructor & CTA */}
                    <div className="flex items-center justify-between md:justify-end gap-8">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-astrian-clay flex items-center justify-center text-astrian-charcoal/60">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-astrian-charcoal/80">{slot.instructor}</span>
                      </div>
                      <Link href="/enquiry">
                        <button className="px-5 py-2.5 rounded-full border border-astrian-sage/30 text-astrian-sage hover:bg-astrian-sage hover:text-white transition-all duration-300 text-sm font-semibold cursor-pointer">
                          Book Space
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-16 text-center text-astrian-charcoal/50 text-base font-light italic"
                >
                  No classes matching the selected filters on this day.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
