"use client";

import { Accordion } from "@/components/ui/accordion";

export default function FAQ() {
  const faqItems = [
    {
      id: "faq-1",
      question: "I am a complete beginner. Which class should I take?",
      answer: "We highly recommend starting with 'Hatha Harmony'. It has a slower pace, focusing on fundamentals, alignments, and simple postures. Our instructors offer modifications for all body types and experience levels."
    },
    {
      id: "faq-2",
      question: "What should I bring to class?",
      answer: "Wear comfortable, stretchable clothes and bring a water bottle. We provide premium mandate yoga mats, blocks, straps, and organic lavender eye pillows free of charge. You're welcome to bring your own mat if preferred."
    },
    {
      id: "faq-3",
      question: "Do I need to be flexible to practice yoga?",
      answer: "Not at all! Yoga is a tool to cultivate flexibility, strength, and mindfulness—it is not a prerequisite. Showing up just as you are is the only requirement."
    },
    {
      id: "faq-4",
      question: "How early should I arrive before class starts?",
      answer: "Please arrive 10 to 15 minutes before class begins. This gives you time to check in, change, set up your mat, and settle into the quiet space without feeling rushed."
    }
  ];

  return (
    <section id="faq" className="py-28 bg-[#EEF5EA] dark:bg-[#162019] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Common Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#52625A] dark:text-[#C9D7C3] font-light leading-relaxed">
            Have questions about beginning your AI wellness journey? Find answers to commonly asked questions below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="glass-card-luxury bg-[#F8FBF6]/90 dark:bg-[#0F1611]/85 rounded-[2.5rem] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 p-8 md:p-12 shadow-xl shadow-[#2D4632]/5 transition-colors duration-300">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
