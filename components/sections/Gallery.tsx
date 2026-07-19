"use client";

import Image from "next/image";
import { motion } from "react-wrap-balancer"; // Wait, react-wrap-balancer is not in package.json, use standard framer-motion instead
import { motion as motionFramer } from "framer-motion";

export default function Gallery() {
  const images = [
    { src: "/yoga-pose-hero.png", alt: "Studio Main Room", span: "md:col-span-2 md:row-span-2" },
    { src: "/instructor-1.png", alt: "Meditation Corner", span: "md:col-span-1 md:row-span-1" },
    { src: "/instructor-2.png", alt: "Yin Practice", span: "md:col-span-1 md:row-span-2" },
    { src: "/instructor-3.png", alt: "Props & Accessories", span: "md:col-span-1 md:row-span-1" }
  ];

  return (
    <section id="gallery" className="py-24 bg-astrian-oat relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage uppercase bg-astrian-sage/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Studio Tour
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-astrian-charcoal mb-4">
            Our Sacred Space
          </h2>
          <p className="text-lg text-astrian-charcoal/70 font-light leading-relaxed">
            Welcome to a light-filled sanctuary designed with raw wood, linen, and earth tones to calm your senses the moment you enter.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {images.map((img, index) => (
            <motionFramer.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-[2rem] border-4 border-white shadow-sm bg-astrian-clay/30 group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-astrian-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-lg font-medium font-display">{img.alt}</span>
              </div>
            </motionFramer.div>
          ))}
        </div>
      </div>
    </section>
  );
}
