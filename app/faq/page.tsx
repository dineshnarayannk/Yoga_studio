"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, MessagesSquare } from "lucide-react";

export default function FAQPage() {
  const faqExtendedItems = [
    {
      id: "faq-1",
      question: "I am a complete beginner. Which class should I take?",
      answer: "We highly recommend starting with 'Hatha Harmony'. It has a slower pace, focusing on fundamentals, alignments, and simple postures. Our instructors offer modifications for all body types and experience levels. 'Restorative Yin' is also excellent if you prefer a slow, meditative practice."
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
      answer: "Please arrive 10 to 15 minutes before class begins. This gives you time to check in, change, set up your mat, and settle into the quiet space without feeling rushed. Out of respect for other students, we close studio doors exactly at start time."
    },
    {
      id: "faq-5",
      question: "Can I eat before attending a yoga session?",
      answer: "We recommend avoiding large meals at least 2 hours before practicing. If you need a boost, try having a small snack like fruit, nuts, or a light juice 45-60 minutes before class. A full stomach can make deep twist and inversion poses uncomfortable."
    },
    {
      id: "faq-6",
      question: "Do you offer private or group corporate classes?",
      answer: "Yes, we offer custom private 1-on-1 sessions, small private groups, and corporate mindfulness packages. These can be customized for alignment fundamentals, sports recovery, or stress-management sound baths. Contact us directly to book."
    },
    {
      id: "faq-7",
      question: "What is your booking cancellation policy?",
      answer: "Class reservations can be cancelled up to 12 hours before the session starts without penalty. Late cancellations or no-shows will result in the loss of that class credit or a fee for unlimited pass holders."
    }
  ];

  return (
    <div className="min-h-screen bg-astrian-oat pt-32 pb-24 text-astrian-charcoal font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Support Portal
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Everything you need to know about starting your yoga practice at Astrion. Find details on logistics, etiquette, and booking.
          </p>
        </div>

        {/* Accordion list container */}
        <div className="bg-white rounded-[2.5rem] border border-astrian-clay/60 p-8 md:p-12 shadow-[0_12px_40px_rgba(17,24,39,0.03)] mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-astrian-clay pb-6">
            <HelpCircle className="h-6 w-6 text-astrian-sage" />
            <h2 className="text-2xl font-bold text-astrian-charcoal font-display">General Inquiries</h2>
          </div>
          <Accordion items={faqExtendedItems} />
        </div>

        {/* Contact CTA */}
        <div className="bg-astrian-cream rounded-[2.5rem] border border-astrian-clay p-8 md:p-12 text-center flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-astrian-sage/10 text-astrian-sage flex items-center justify-center mb-4">
            <MessagesSquare className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-astrian-charcoal mb-2 font-display">Still Have Questions?</h3>
          <p className="text-astrian-charcoal/60 font-light mb-6 max-w-sm">
            We are here to support your journey. Get in touch with our studio concierge, and we will get back to you within 24 hours.
          </p>
          <Link href="/enquiry">
            <Button variant="primary" size="md">
              Send Us An Inquiry
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
