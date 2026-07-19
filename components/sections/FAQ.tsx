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
    <section id="faq" className="py-24 bg-astrian-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Common Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-astrian-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Have questions about stepping onto the mat? Here are answers to what new practitioners ask most.
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-white rounded-[2.5rem] border border-astrian-clay/60 p-8 md:p-12 shadow-[0_12px_40px_rgba(17,24,39,0.03)]">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
