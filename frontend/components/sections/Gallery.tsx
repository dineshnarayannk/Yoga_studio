"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    { src: "/yoga-pose-hero.png", alt: "Studio Main Room", span: "md:col-span-2 md:row-span-2" },
    { src: "/instructor-1.png", alt: "Meditation Corner", span: "md:col-span-1 md:row-span-1" },
    { src: "/instructor-2.png", alt: "Yin Practice", span: "md:col-span-1 md:row-span-2" },
    { src: "/instructor-3.png", alt: "Props & Accessories", span: "md:col-span-1 md:row-span-1" }
  ];

  return (
    <section id="gallery" className="py-28 bg-[#F4F8F2] dark:bg-[#0F1611] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Sanctuary Atmosphere
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4">
            Our Sacred Nature Space
          </h2>
          <p className="text-lg text-[#52625A] dark:text-[#C9D7C3] font-light leading-relaxed">
            Architected with natural textures, botanical foliage, and ambient sunlight to soothe your nervous system from the moment you arrive.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-[2.2rem] border-4 border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 shadow-xl shadow-[#2D4632]/5 bg-[#EEF5EA] dark:bg-[#162019] group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D4632]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-[#F8F7F2] text-lg font-semibold font-display">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
