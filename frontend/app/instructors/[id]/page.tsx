"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Clock, Award, Languages, ShieldCheck, 
  ChevronLeft, ChevronRight, CheckCircle2, BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstructorData {
  name: string;
  role: string;
  image: string;
  tags: string[];
  about: string;
  philosophy: string;
  stats: {
    experience: string;
    specializations: string;
    languages: string;
  };
  expertise: { name: string; value: number }[];
  achievements: { title: string; desc: string }[];
  availability: { day: string; time: string }[];
  testimonials: { student: string; text: string }[];
}

const instructorsDb: Record<string, InstructorData> = {
  "elena-rostova": {
    name: "Elena Rostova",
    role: "Vinyasa & Flow Guide",
    image: "/instructor-1.png",
    tags: ["Vinyasa Flow", "Power Yoga", "Breathwork", "Mindfulness"],
    about: "Elena teaches with high energy and creative sequencing. With over 8 years of instruction, she believes in alignment-based freedom. Her classes are designed to challenge you physically while creating a quiet space in the mind to let go of daily stress and find authentic expression.",
    philosophy: "Yoga is not about touching your toes, it is about what you learn on the way down. Find freedom through alignment and joy in the flow.",
    stats: {
      experience: "8+ Years",
      specializations: "Power Vinyasa & Prana Flow",
      languages: "English, Russian"
    },
    expertise: [
      { name: "Vinyasa Flow Sequencing", value: 95 },
      { name: "Alignment & Adjustments", value: 85 },
      { name: "Breathwork (Pranayama)", value: 90 }
    ],
    achievements: [
      { title: "RYT-500 Certified", desc: "Yoga Alliance Advanced Teacher certification." },
      { title: "Anatomy Specialist", desc: "Advanced training in structural biomechanics." },
      { title: "Mindfulness Teacher", desc: "Certified meditation and mindfulness coach." },
      { title: "10k+ Class Hours", desc: "Over ten thousand hours of hands-on teaching." }
    ],
    availability: [
      { day: "Monday", time: "7:00 AM & 5:30 PM" },
      { day: "Tuesday", time: "Rest Day" },
      { day: "Wednesday", time: "7:00 AM & 5:30 PM" },
      { day: "Thursday", time: "Rest Day" },
      { day: "Friday", time: "7:00 AM Flow" },
      { day: "Saturday", time: "9:00 AM Boost" },
      { day: "Sunday", time: "Rest Day" }
    ],
    testimonials: [
      { student: "Clara M.", text: "Elena's morning flow is the absolute best way to start the day. Energizing, clear instructions, and amazing music!" },
      { student: "John D.", text: "I love her creative sequencing. No two classes are ever the same, keeping the practice fresh and engaging." },
      { student: "Maya L.", text: "Her focus on breathwork helped me find my center when life got overwhelming. A truly therapeutic experience." }
    ]
  },
  "marcus-vance": {
    name: "Marcus Vance",
    role: "Hatha & Alignment Specialist",
    image: "/instructor-2.png",
    tags: ["Hatha Yoga", "Posture & Alignment", "Gentle Stretching", "Therapeutic"],
    about: "Marcus is dedicated to grounding and breathing. His gentle posture adjustments help students of all levels deepen their focus safely. With over 10 years of study, Marcus creates a safe, accessible environment where everyone can thrive.",
    philosophy: "Root down to rise up. True progress is subtle, measured in breaths, presence, and stability.",
    stats: {
      experience: "10+ Years",
      specializations: "Anatomical Alignment & Hatha",
      languages: "English, Spanish"
    },
    expertise: [
      { name: "Postural Alignment", value: 98 },
      { name: "Beginner Foundations", value: 92 },
      { name: "Yoga Therapy & Rehab", value: 88 }
    ],
    achievements: [
      { title: "Master of Yoga Studies", desc: "Advanced academic degree in Yoga Philosophy." },
      { title: "Yoga Therapist C-IAYT", desc: "Certified clinical therapeutic instructor." },
      { title: "Anatomy Coach", desc: "Specialist coaching in movement physiology." },
      { title: "YACEP Provider", desc: "Yoga Alliance Continuing Education Provider." }
    ],
    availability: [
      { day: "Monday", time: "9:30 AM Hatha" },
      { day: "Tuesday", time: "9:30 AM Hatha" },
      { day: "Wednesday", time: "Rest Day" },
      { day: "Thursday", time: "9:30 AM Hatha" },
      { day: "Friday", time: "9:30 AM Hatha" },
      { day: "Saturday", time: "Rest Day" },
      { day: "Sunday", time: "10:00 AM Master" }
    ],
    testimonials: [
      { student: "David P.", text: "Marcus completely fixed my alignment issues. I no longer feel lower back pain after practicing Hatha!" },
      { student: "Sophia R.", text: "His guidance is so precise. He really makes you feel comfortable on the mat even as a complete beginner." },
      { student: "Robert K.", text: "A truly grounding class. Marcus has a peaceful presence that immediately puts you at ease." }
    ]
  },
  "sarah-jenkins": {
    name: "Sarah Jenkins",
    role: "Yin & Sound Meditation Therapist",
    image: "/instructor-3.png",
    tags: ["Yin Yoga", "Sound Healing", "Restorative", "Meditation"],
    about: "Sarah brings restorative sound bath journeys and meditative yin postures to soothe the nervous system and nurture quiet strength. She uses crystal singing bowls and gongs to create deep vibrational healing spaces.",
    philosophy: "In stillness, we heal. Give yourself permission to do less, feel more, and simply be.",
    stats: {
      experience: "6+ Years",
      specializations: "Sound Bath & Restorative Yin",
      languages: "English, French"
    },
    expertise: [
      { name: "Yin Yoga & Release", value: 95 },
      { name: "Sound Meditation (Crystal Bowls)", value: 96 },
      { name: "Nervous System Regulation", value: 90 }
    ],
    achievements: [
      { title: "Sound Healing Master", desc: "Multi-instrumental vibrational therapist certificate." },
      { title: "Yin Yoga Specialist", desc: "Advanced training in fascia and meridian systems." },
      { title: "Reiki Level II Practitioner", desc: "Usui lineage energy healing training." },
      { title: "Mindfulness Guide", desc: "Expert trainer in secular mindfulness techniques." }
    ],
    availability: [
      { day: "Monday", time: "12:00 PM & 7:00 PM" },
      { day: "Tuesday", time: "Rest Day" },
      { day: "Wednesday", time: "12:00 PM & 7:00 PM" },
      { day: "Thursday", time: "7:00 PM Yin" },
      { day: "Friday", time: "Rest Day" },
      { day: "Saturday", time: "Rest Day" },
      { day: "Sunday", time: "4:00 PM Sound" }
    ],
    testimonials: [
      { student: "Linda S.", text: "Sarah's sound bath is out of this world. I've never felt so deeply relaxed and spiritually refreshed." },
      { student: "Michael G.", text: "Yin & Sound is the highlight of my week. A perfect release for structural and mental stress." },
      { student: "Emma W.", text: "Her classes feel like a warm hug. Simply beautiful, calming, and deeply healing." }
    ]
  },
  "darius-coleman": {
    name: "Darius Coleman",
    role: "Strength & Vinyasa Guide",
    image: "/darius-coleman.png",
    tags: ["Yoga Elements", "Strength & Flexibility", "Core Strength", "Functional Flow"],
    about: "Darius teaches with a focus on functional movement, anatomical awareness, and mindful strength. He believes that physical challenge is a doorway to mental resilience. In his classes, you will sweat, laugh, and find new depths of strength you didn't know you had.",
    philosophy: "Move with intention. True power is not about force; it is about alignment, control, and grace under pressure.",
    stats: {
      experience: "8+ Years",
      specializations: "HIIT & Strength Elements",
      languages: "English"
    },
    expertise: [
      { name: "Functional Mobility", value: 95 },
      { name: "Core & Stability Focus", value: 92 },
      { name: "Vinyasa & Athletic Flow", value: 88 }
    ],
    achievements: [
      { title: "FRC Mobility Specialist", desc: "Certified Functional Range Conditioning Coach." },
      { title: "RYT-500 Advanced", desc: "Registered Yoga Alliance Advanced Teacher." },
      { title: "Athletic Conditioning", desc: "Specialist certificate in athletic recovery science." },
      { title: "CEC Provider", desc: "Certified Yoga Alliance Continuing Educator." }
    ],
    availability: [
      { day: "Monday", time: "8:00 AM & 6:30 PM" },
      { day: "Tuesday", time: "Rest Day" },
      { day: "Wednesday", time: "8:00 AM & 6:30 PM" },
      { day: "Thursday", time: "Rest Day" },
      { day: "Friday", time: "8:00 AM Flow" },
      { day: "Saturday", time: "10:30 AM Conditioning" },
      { day: "Sunday", time: "Rest Day" }
    ],
    testimonials: [
      { student: "Tyler K.", text: "Darius' classes are intense but incredibly rewarding. He pushes you to your limits in the best way possible!" },
      { student: "Samantha T.", text: "I've seen massive improvements in my core strength and hamstring flexibility since attending his classes." },
      { student: "Lucas P.", text: "An amazing teacher who really explains the anatomy behind every single pose. Highly recommended!" }
    ]
  }
};

export default function InstructorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const instructor = instructorsDb[id];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  if (!instructor) {
    return (
      <div className="min-h-screen bg-astrian-oat flex flex-col justify-center items-center p-6 text-center">
        <h1 className="text-3xl font-bold text-astrian-charcoal mb-4">Guide Not Found</h1>
        <p className="text-astrian-charcoal/60 mb-6 max-w-sm">
          We couldn't find the instructor page you were looking for.
        </p>
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    );
  }

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? instructor.testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === instructor.testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <main className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Back Button */}
          <Link href="/instructors" className="inline-flex items-center gap-2 text-astrian-sage dark:text-astrian-leaf font-semibold hover:text-astrian-moss dark:hover:text-white transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Instructors</span>
          </Link>

          {/* 1. Profile Header (Split Block Layout) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 relative aspect-[3/4] w-full rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-[#1c1f1d] shadow-[0_24px_50px_rgba(17,24,39,0.04)] bg-astrian-cream dark:bg-[#1c1f1d] transition-colors duration-300">
              <Image
                src={instructor.image}
                alt={instructor.name}
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Right Column: About, Philosophy & Tags */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full self-start mb-4">
                {instructor.role}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-6">
                {instructor.name}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {instructor.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 bg-astrian-clay dark:bg-[#222623] px-3 py-1.5 rounded-full transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* About Narrative */}
              <div className="text-lg text-astrian-charcoal/80 dark:text-gray-300 font-light leading-relaxed mb-8 space-y-4">
                <p>{instructor.about}</p>
              </div>

              {/* Teaching Philosophy Box */}
              <div className="glass-panel p-8 rounded-[2rem] border border-astrian-clay dark:border-white/10 bg-white/50 dark:bg-[#1c1f1d]/50 relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-4 right-4 text-4xl text-astrian-sage/10 dark:text-astrian-leaf/5 font-bold select-none">ॐ</div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf mb-2">Teaching Philosophy</h3>
                <p className="text-base text-astrian-charcoal dark:text-gray-200 italic font-light leading-relaxed">
                  "{instructor.philosophy}"
                </p>
              </div>
            </div>
          </section>

          {/* 2. Stats Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <Card className="flex flex-col items-center text-center p-8 bg-white border border-astrian-clay/60 shadow-sm rounded-3xl">
              <span className="h-12 w-12 rounded-full bg-astrian-cream dark:bg-[#222623] flex items-center justify-center text-astrian-sage dark:text-astrian-leaf mb-4 font-bold text-lg">★</span>
              <h4 className="text-sm font-bold text-astrian-charcoal/40 dark:text-gray-400 uppercase tracking-wider mb-1">Experience</h4>
              <p className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 font-display">{instructor.stats.experience}</p>
            </Card>

            <Card className="flex flex-col items-center text-center p-8 bg-white border border-astrian-clay/60 shadow-sm rounded-3xl">
              <Award className="h-6 w-6 text-astrian-sage dark:text-astrian-leaf mb-4" />
              <h4 className="text-sm font-bold text-astrian-charcoal/40 dark:text-gray-400 uppercase tracking-wider mb-1">Specializations</h4>
              <p className="text-xl font-bold text-astrian-charcoal dark:text-gray-100 font-display text-balance">{instructor.stats.specializations}</p>
            </Card>

            <Card className="flex flex-col items-center text-center p-8 bg-white border border-astrian-clay/60 shadow-sm rounded-3xl">
              <Languages className="h-6 w-6 text-astrian-sage dark:text-astrian-leaf mb-4" />
              <h4 className="text-sm font-bold text-astrian-charcoal/40 dark:text-gray-400 uppercase tracking-wider mb-1">Languages</h4>
              <p className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 font-display">{instructor.stats.languages}</p>
            </Card>
          </section>

          {/* 3. Experience Progress Bars & Achievements */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-start">
            {/* Left: Progress Bars */}
            <div>
              <h2 className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100 mb-8 font-display">Expertise Focus</h2>
              <div className="space-y-6">
                {instructor.expertise.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-astrian-charcoal dark:text-gray-200">
                      <span>{exp.name}</span>
                      <span>{exp.value}%</span>
                    </div>
                    <div className="w-full bg-astrian-clay dark:bg-[#222623] h-2.5 rounded-full overflow-hidden transition-colors duration-300">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${exp.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-astrian-sage dark:bg-astrian-leaf h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Achievements Grid (2x2) */}
            <div>
              <h2 className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100 mb-8 font-display">Credentials & Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructor.achievements.map((ach, idx) => (
                  <Card key={idx} className="p-6 bg-white border border-astrian-clay/60 rounded-[2rem] flex gap-4 hover:border-astrian-sage/20 transition-all duration-300">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-astrian-sage/10 dark:bg-astrian-sage/20 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-astrian-charcoal dark:text-gray-100 mb-1">{ach.title}</h4>
                      <p className="text-xs text-astrian-charcoal/60 dark:text-gray-400 leading-relaxed font-light">{ach.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Weekly Availability Calendar */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100 mb-8 font-display text-center md:text-left">Weekly Studio Availability</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {instructor.availability.map((sched, idx) => {
                const isRest = sched.time === "Rest Day";
                return (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-[2rem] border text-center flex flex-col justify-between h-[150px] transition-all duration-300 ${
                      isRest 
                        ? "bg-astrian-cream/40 dark:bg-[#1c1f1d]/40 border-astrian-clay/40 dark:border-white/5 text-astrian-charcoal/40 dark:text-gray-500" 
                        : "bg-white dark:bg-[#1c1f1d] border-astrian-clay/80 dark:border-white/10 text-astrian-charcoal dark:text-gray-200 shadow-sm hover:border-astrian-sage/30 dark:hover:border-astrian-leaf/30 hover:shadow-md"
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-astrian-charcoal/50 dark:text-gray-400">{sched.day.substring(0, 3)}</span>
                    <div className="my-2 flex justify-center text-astrian-sage dark:text-astrian-leaf">
                      {!isRest && <Clock className="h-5 w-5 opacity-70" />}
                    </div>
                    <span className={`text-xs font-semibold ${isRest ? "italic text-astrian-charcoal/40 dark:text-gray-500" : "text-astrian-charcoal dark:text-gray-200"}`}>
                      {sched.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. "Student Voices" (Carousel) */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100 mb-8 font-display text-center">Student Voices</h2>
            <div className="relative bg-white dark:bg-[#1c1f1d] rounded-[3rem] border border-astrian-clay/80 dark:border-white/10 p-8 md:p-16 shadow-[0_16px_40px_rgba(17,24,39,0.03)] text-center overflow-hidden transition-colors duration-300">
              <div className="absolute top-6 left-6 text-6xl text-astrian-clay dark:text-white/5 select-none font-serif">“</div>
              
              <div className="min-h-[140px] flex items-center justify-center">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-xl md:text-2xl text-astrian-charcoal/80 dark:text-gray-200 leading-relaxed font-light italic text-pretty">
                    "{instructor.testimonials[activeTestimonial].text}"
                  </p>
                  <div>
                    <div className="flex justify-center gap-0.5 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-astrian-charcoal dark:text-gray-100">
                      — {instructor.testimonials[activeTestimonial].student}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={handlePrevTestimonial} 
                  className="h-10 w-10 rounded-full border border-astrian-clay dark:border-white/10 text-astrian-charcoal dark:text-gray-100 hover:border-astrian-sage hover:bg-astrian-sage hover:text-white dark:hover:bg-astrian-leaf dark:hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleNextTestimonial} 
                  className="h-10 w-10 rounded-full border border-astrian-clay dark:border-white/10 text-astrian-charcoal dark:text-gray-100 hover:border-astrian-sage hover:bg-astrian-sage hover:text-white dark:hover:bg-astrian-leaf dark:hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
