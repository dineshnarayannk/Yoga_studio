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
    <section id="enquiry-form" className="py-24 bg-astrian-oat relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[3rem] border border-astrian-clay/80 p-8 md:p-16 shadow-[0_24px_60px_rgba(17,24,39,0.04)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6 self-start">
              <Sparkles className="h-3.5 w-3.5" />
              Limited Offer
            </span>
            <h2 className="text-3.5xl md:text-4xl font-bold text-astrian-charcoal mb-4 leading-tight">
              Begin Your Journey Today
            </h2>
            <p className="text-base text-astrian-charcoal/70 leading-relaxed font-light mb-6">
              Claim your first class completely free. Fill out the form, and our studio team will contact you to book your mat space.
            </p>
            <div className="space-y-3 border-t border-astrian-clay pt-6">
              <p className="text-sm text-astrian-charcoal/60">✓ Free locker & towel access</p>
              <p className="text-sm text-astrian-charcoal/60">✓ Premium Manduka mats provided</p>
              <p className="text-sm text-astrian-charcoal/60">✓ Complimentary organic herbal tea</p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-astrian-charcoal/80 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 transition-all duration-300 outline-none text-astrian-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-astrian-charcoal/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 transition-all duration-300 outline-none text-astrian-charcoal"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-astrian-charcoal/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 transition-all duration-300 outline-none text-astrian-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="classType" className="block text-sm font-medium text-astrian-charcoal/80 mb-2">
                    Preferred Class Style
                  </label>
                  <select
                    id="classType"
                    value={formData.classType}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-astrian-clay focus:border-astrian-sage focus:ring-2 focus:ring-astrian-sage/20 bg-astrian-oat/30 transition-all duration-300 outline-none text-astrian-charcoal appearance-none cursor-pointer"
                  >
                    <option value="vinyasa">Vinyasa Flow (Dynamic)</option>
                    <option value="hatha">Hatha Harmony (Alignment)</option>
                    <option value="yin">Restorative Yin (Slow/Calm)</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                  Claim Free Trial Class
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-astrian-sage/10 text-astrian-sage flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-astrian-charcoal mb-2 font-display">
                  Request Received!
                </h3>
                <p className="text-astrian-charcoal/70 max-w-sm font-light">
                  Thank you, <span className="font-semibold text-astrian-charcoal">{formData.name}</span>. We've sent a booking confirmation to <span className="font-semibold text-astrian-charcoal">{formData.email}</span>. A guide will call you shortly!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
