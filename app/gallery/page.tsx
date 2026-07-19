"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const galleryItems = [
    { src: "/yoga-pose-hero.png", alt: "Sun-Drenched Studio Room", span: "md:col-span-2 md:row-span-2" },
    { src: "/instructor-1.png", alt: "Meditation Alignment Practice", span: "md:col-span-1 md:row-span-1" },
    { src: "/instructor-2.png", alt: "Grounding and Hatha Adjustments", span: "md:col-span-1 md:row-span-2" },
    { src: "/instructor-3.png", alt: "Organic Eye Pillows & Props", span: "md:col-span-1 md:row-span-1" },
    { src: "/darius-coleman.png", alt: "Functional Conditioning Zone", span: "md:col-span-1 md:row-span-2" },
    { src: "/yoga-pose-hero.png", alt: "Community Gathering Tea Lounge", span: "md:col-span-2 md:row-span-1" },
    { src: "/instructor-1.png", alt: "Sound Bowl Meditation Journey", span: "md:col-span-1 md:row-span-1" }
  ];

  return (
    <div className="min-h-screen bg-astrian-oat pt-32 pb-24 text-astrian-charcoal font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Visual Tour
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal mb-6 leading-tight">
            Our Sacred Space
          </h1>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Take a look inside Astrion. Our light-filled sanctuary is crafted with raw wood, organic linen, and custom clay textures to help you feel grounded and present.
          </p>
        </div>

        {/* Gallery Grid (Asymmetrical Masonry Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {galleryItems.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-[0_8px_30px_rgba(17,24,39,0.02)] bg-astrian-clay/30 group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-astrian-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1 block">Astrion Sanctuary</span>
                  <h3 className="text-white text-xl font-bold font-display">{img.alt}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
