"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-astrian-clay dark:border-white/5 py-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left py-4 focus:outline-none cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-astrian-charcoal dark:text-gray-100 group-hover:text-astrian-sage dark:group-hover:text-astrian-leaf transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-astrian-sage dark:text-astrian-leaf ml-4"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 text-astrian-charcoal/70 dark:text-gray-300 leading-relaxed text-pretty text-[1.05rem]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ id: string; question: string; answer: string }>;
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("divide-y divide-astrian-clay dark:divide-white/5", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
