"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Instructors() {
  const team = [
    {
      id: "elena-rostova",
      name: "Elena Rostova",
      role: "Vinyasa & Flow Guide",
      bio: "Elena teaches with high energy and creative sequencing. With over 8 years of instruction, she believes in alignment-based freedom.",
      image: "/instructor-1.png"
    },
    {
      id: "marcus-vance",
      name: "Marcus Vance",
      role: "Hatha & Alignment Specialist",
      bio: "Marcus is dedicated to grounding and breathing. His gentle posture adjustments help students of all levels deepen their focus safely.",
      image: "/instructor-2.png"
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      role: "Yin & Sound Meditation Therapist",
      bio: "Sarah brings restorative sound bath journeys and meditative yin postures to soothe the nervous system and nurture quiet strength.",
      image: "/instructor-3.png"
    },
    {
      id: "darius-coleman",
      name: "Darius Coleman",
      role: "Strength & Vinyasa Guide",
      bio: "Darius teaches with a focus on functional movement, anatomical awareness, and mindful strength, building physical and mental resilience.",
      image: "/darius-coleman.png"
    }
  ];

  return (
    <section id="instructors" className="py-28 bg-[#EEF5EA] dark:bg-[#162019] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Master Guides & AI Mentors
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4">
            Wisdom Meets AI Innovation
          </h2>
          <p className="text-lg text-[#52625A] dark:text-[#C9D7C3] font-light leading-relaxed">
            Our certified yogis collaborate with Astrion AI algorithms to design personalized routines tailored for your growth.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="glass-card-luxury overflow-hidden h-full flex flex-col rounded-[2.2rem] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 bg-[#F8FBF6]/90 dark:bg-[#0F1611]/85 shadow-lg shadow-[#2D4632]/4 group">
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/5] bg-[#EEF5EA] dark:bg-[#162019] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D4632]/40 via-transparent to-transparent opacity-60" />
                </div>
                {/* Info Wrapper */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4632] dark:text-[#8DA97B]">
                      {member.role}
                    </span>
                    <h3 className="text-xl font-bold text-[#233228] dark:text-[#F4F8F2] mt-1 mb-2 font-display">
                      {member.name}
                    </h3>
                    <p className="text-[#52625A] dark:text-[#C9D7C3] leading-relaxed font-light text-xs mb-6">
                      {member.bio}
                    </p>
                  </div>
                  <Link 
                    href={`/instructors/${member.id}`} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D4632] dark:text-[#8DA97B] hover:text-[#5D7555] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Explore Profile</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


