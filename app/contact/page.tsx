"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Connect
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-astrian-charcoal/70 dark:text-gray-300 font-light leading-relaxed">
            Have questions about our classes, schedules, memberships, or private events? Write to us, and our studio team will assist you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="p-8 bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 shadow-sm rounded-3xl transition-colors duration-300">
              <h2 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-6">Studio Concierge</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-astrian-sage/10 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-charcoal/40 dark:text-gray-400 mb-1">Our Location</h4>
                    <p className="text-base text-astrian-charcoal dark:text-gray-200">120 Serenity Lane, Wellness District, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-astrian-sage/10 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-charcoal/40 dark:text-gray-400 mb-1">Phone Number</h4>
                    <p className="text-base text-astrian-charcoal dark:text-gray-200">(555) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-astrian-sage/10 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-charcoal/40 dark:text-gray-400 mb-1">Email Address</h4>
                    <p className="text-base text-astrian-charcoal dark:text-gray-200">hello@astrionstudio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-astrian-sage/10 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-charcoal/40 dark:text-gray-400 mb-1">Opening Hours</h4>
                    <p className="text-base text-astrian-charcoal dark:text-gray-200">Mon - Fri: 6:00 AM - 9:00 PM</p>
                    <p className="text-base text-astrian-charcoal dark:text-gray-200">Sat - Sun: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Maps Placeholder container */}
            <div className="h-[250px] w-full rounded-[2rem] overflow-hidden border border-astrian-clay dark:border-white/10 relative bg-astrian-cream dark:bg-[#1c1f1d] flex flex-col items-center justify-center text-center p-6 transition-colors duration-300">
              <MapPin className="h-8 w-8 text-astrian-sage dark:text-astrian-leaf mb-3 animate-bounce" />
              <h3 className="font-bold text-lg text-astrian-charcoal dark:text-gray-100 mb-1">Interactive Studio Map</h3>
              <p className="text-xs text-astrian-charcoal/60 dark:text-gray-400 max-w-xs leading-relaxed">
                We are situated at the corner of Serenity Lane and Harmony Road, with free onsite parking for all members.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1c1f1d] rounded-3xl border border-astrian-clay dark:border-white/10 p-8 md:p-12 shadow-sm transition-colors duration-300">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-astrian-charcoal/80 dark:text-gray-200 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay dark:border-white/10 focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 dark:bg-[#121413] transition-all duration-300 outline-none text-astrian-charcoal dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-astrian-charcoal/80 dark:text-gray-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay dark:border-white/10 focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 dark:bg-[#121413] transition-all duration-300 outline-none text-astrian-charcoal dark:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-astrian-charcoal/80 dark:text-gray-200 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Membership Inquiries, Private Booking, etc."
                    className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay dark:border-white/10 focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 dark:bg-[#121413] transition-all duration-300 outline-none text-astrian-charcoal dark:text-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-astrian-charcoal/80 dark:text-gray-200 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay dark:border-white/10 focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 dark:bg-[#121413] transition-all duration-300 outline-none text-astrian-charcoal dark:text-gray-100 resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4.5 w-4.5" />
                  Send Message
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 flex flex-col items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-astrian-sage/10 dark:bg-astrian-sage/20 text-astrian-sage dark:text-astrian-leaf flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 mb-2 font-display">
                  Message Sent!
                </h3>
                <p className="text-astrian-charcoal/70 dark:text-gray-300 max-w-sm font-light">
                  Thank you, <span className="font-semibold text-astrian-charcoal dark:text-gray-200">{formData.name}</span>. We have received your query about <span className="italic">"{formData.subject}"</span> and our studio team will email you at <span className="font-semibold text-astrian-charcoal dark:text-gray-200">{formData.email}</span> shortly.
                </p>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
