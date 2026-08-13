"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "vinyasa"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="enquiry-form" className="py-28 bg-[#F4F8F2] dark:bg-[#0F1611] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="glass-card-luxury bg-[#F8FBF6]/90 dark:bg-[#162019]/85 rounded-[2.8rem] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 p-8 md:p-14 shadow-2xl shadow-[#2D4632]/8 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-colors duration-300">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-xs font-bold tracking-wider text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6 self-start shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Complimentary Sanctuary Pass
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4 leading-tight">
              Begin Your AI Wellness Journey
            </h2>
            <p className="text-sm text-[#52625A] dark:text-[#C9D7C3] leading-relaxed font-light mb-6">
              Claim your introductory AI studio pass completely free. Fill out the form, and our sanctuary team will reserve your spot.
            </p>
            <div className="space-y-3 border-t border-[#C9D7C3]/40 dark:border-[#8DA97B]/20 pt-6">
              <p className="text-xs font-medium text-[#52625A] dark:text-[#C9D7C3]">✓ Full access to Astra AI posture tracking</p>
              <p className="text-xs font-medium text-[#52625A] dark:text-[#C9D7C3]">✓ Premium Manduka mats provided</p>
              <p className="text-xs font-medium text-[#52625A] dark:text-[#C9D7C3]">✓ Complimentary organic lavender herbal tea</p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#233228] dark:text-[#C9D7C3] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-3.5 rounded-2xl border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 focus:border-[#5D7555] focus:ring-2 focus:ring-[#8DA97B]/20 bg-[#F4F8F2]/70 dark:bg-[#0F1611]/80 transition-all duration-300 outline-none text-[#233228] dark:text-[#F4F8F2] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#233228] dark:text-[#C9D7C3] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 focus:border-[#5D7555] focus:ring-2 focus:ring-[#8DA97B]/20 bg-[#F4F8F2]/70 dark:bg-[#0F1611]/80 transition-all duration-300 outline-none text-[#233228] dark:text-[#F4F8F2] text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#233228] dark:text-[#C9D7C3] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-5 py-3.5 rounded-2xl border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 focus:border-[#5D7555] focus:ring-2 focus:ring-[#8DA97B]/20 bg-[#F4F8F2]/70 dark:bg-[#0F1611]/80 transition-all duration-300 outline-none text-[#233228] dark:text-[#F4F8F2] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="classType" className="block text-xs font-bold uppercase tracking-wider text-[#233228] dark:text-[#C9D7C3] mb-2">
                    Preferred Practice Focus
                  </label>
                  <select
                    id="classType"
                    value={formData.classType}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 focus:border-[#5D7555] focus:ring-2 focus:ring-[#8DA97B]/20 bg-[#F4F8F2]/70 dark:bg-[#0F1611]/80 transition-all duration-300 outline-none text-[#233228] dark:text-[#F4F8F2] text-sm appearance-none cursor-pointer"
                  >
                    <option value="vinyasa" className="dark:bg-[#0F1611]">Vinyasa Flow (Dynamic Energy)</option>
                    <option value="hatha" className="dark:bg-[#0F1611]">Hatha Harmony (Mindful Alignment)</option>
                    <option value="yin" className="dark:bg-[#0F1611]">Restorative Yin (Deep Calm)</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-3 bg-[#2D4632] hover:bg-[#1F2E23] text-white rounded-full py-4 text-sm font-semibold shadow-lg shadow-[#2D4632]/20 hover:scale-[1.01] transition-all">
                  Claim Complimentary Pass
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-[#8DA97B]/20 text-[#2D4632] dark:text-[#8DA97B] flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-2 font-display">
                  Sanctuary Pass Confirmed!
                </h3>
                <p className="text-[#52625A] dark:text-[#C9D7C3] max-w-sm font-light text-sm">
                  Thank you, <span className="font-semibold text-[#233228] dark:text-white">{formData.name}</span>. We've emailed your session details to <span className="font-semibold text-[#233228] dark:text-white">{formData.email}</span>.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
