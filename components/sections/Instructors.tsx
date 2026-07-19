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
    <section id="instructors" className="py-24 bg-astrian-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Expert Guides
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-astrian-charcoal mb-4">
            Meet Our Instructors
          </h2>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Our certified guides bring diverse training backgrounds, deep wisdom, and welcoming hearts to every class on the mat.
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
              <Card className="overflow-hidden p-0 h-full flex flex-col hover:border-astrian-sage/20 transition-all duration-300 group">
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[4/5] bg-astrian-clay">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                {/* Info Wrapper */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-astrian-sage">
                      {member.role}
                    </span>
                    <h3 className="text-xl font-bold text-astrian-charcoal mt-1 mb-2 font-display">
                      {member.name}
                    </h3>
                    <p className="text-astrian-charcoal/70 leading-relaxed font-light text-sm mb-6">
                      {member.bio}
                    </p>
                  </div>
                  <Link 
                    href={`/instructors/${member.id}`} 
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-astrian-sage hover:text-astrian-moss transition-colors cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


