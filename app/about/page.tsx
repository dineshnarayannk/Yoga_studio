"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const values = [
  {
    icon: <Heart className="h-6 w-6 text-astrian-sage dark:text-astrian-leaf" />,
    title: "Mindful Intention",
    description: "Every movement, breath, and posture is guided by intention. We encourage students to look inward and build a mindful, personal practice."
  },
  {
    icon: <Users className="h-6 w-6 text-astrian-sage dark:text-astrian-leaf" />,
    title: "Inclusive Community",
    description: "Our doors are open to everyone. We believe yoga is a universal practice that unites people from all backgrounds, ages, and flexibilities."
  },
  {
    icon: <Compass className="h-6 w-6 text-astrian-sage dark:text-astrian-leaf" />,
    title: "Holistic Growth",
    description: "We view wellness as a balance of mental clarity, physical stability, and emotional release. Our classes nurture body, mind, and spirit."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
      <title>About Us | Team Astrion</title>
      <meta name="description" content="Learn about Astrion Studio, our philosophy of mind-body unity, our core principles, and our expert guides." />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-6 leading-tight">
            About Astrion Studio
          </h1>
          <p className="text-lg text-astrian-charcoal/70 dark:text-gray-300 font-light leading-relaxed">
            Founded with the vision to create a peaceful sanctuary away from the daily rush, Astrion is a community-first space centered on grounding practices.
          </p>
        </div>

        {/* Narrative & Image Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-[#1c1f1d] shadow-[0_24px_50px_rgba(17,24,39,0.04)] bg-astrian-cream dark:bg-[#1c1f1d] transition-colors duration-300">
            <Image
              src="/instructor-1.png"
              alt="Astrion Sanctuary Interior"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-astrian-charcoal dark:text-gray-100 leading-tight">
              A Sanctuary for Breath and Movement
            </h2>
            <div className="text-base text-astrian-charcoal/80 dark:text-gray-300 font-light leading-relaxed space-y-4">
              <p>
                Astrion began as a small dream to design a space where people could step off their screens and onto their mats. Inspired by earth tones, organic linen, and custom clay textures, our studio was built from the ground up to calm the nervous system before your practice even begins.
              </p>
              <p>
                Our philosophy is simple: yoga is not about flexibility; it is about self-awareness. We focus on mindful breathing, anatomical alignment, and creative sequences that build strength while cultivating tranquility.
              </p>
              <p>
                Whether you are stepping onto the mat for the first time or looking to deepen a life-long practice, our certified guides are here to support your personal journey with welcoming hearts.
              </p>
            </div>
            
            <div className="pt-4 border-t border-astrian-clay dark:border-white/5 flex flex-wrap gap-12">
              <div>
                <p className="text-4xl font-bold text-astrian-sage dark:text-astrian-leaf font-display mb-1">8+</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-astrian-charcoal/50 dark:text-gray-400">Years Instructing</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-astrian-sage dark:text-astrian-leaf font-display mb-1">20k+</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-astrian-charcoal/50 dark:text-gray-400">Classes Guided</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-astrian-sage dark:text-astrian-leaf font-display mb-1">400+</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-astrian-charcoal/50 dark:text-gray-400">Active Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full inline-block mb-4">
              What Guides Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-astrian-charcoal dark:text-gray-100 font-display">
              Our Core Principles
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full hover:border-astrian-sage/20 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-astrian-cream dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 flex items-center justify-center mb-6 transition-colors duration-300">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100 font-display mb-2">{val.title}</h3>
                  <p className="text-sm text-astrian-charcoal/70 dark:text-gray-300 leading-relaxed font-light">{val.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA section */}
        <section className="bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-[0_24px_60px_rgba(17,24,39,0.03)] transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-4">
            Join Our Community
          </h2>
          <p className="text-base text-astrian-charcoal/70 dark:text-gray-300 leading-relaxed font-light mb-8 max-w-xl mx-auto">
            Experience our serene community studio for yourself. Fill out a request to claim your first trial class completely free of charge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/enquiry">
              <Button variant="primary" size="lg">Get A Free Trial</Button>
            </Link>
            <Link href="/classes">
              <Button variant="secondary" size="lg">Explore Classes</Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
