"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const timelineData = [
  {
    year: "1945",
    title: "Established in Johannesburg",
    description: "Cereal & Malt opened its doors, beginning a legacy of producing high-quality malt.",
    image: "/images/history.jpg" // Using the existing history image
  },
  {
    year: "1960",
    title: "Facility Expansion",
    description: "Expanded our extraction facilities to meet the growing demand from bakeries and breweries.",
    image: "/images/card_liquid_malt.jpg"
  },
  {
    year: "1995",
    title: "Golden Jubilee",
    description: "Celebrated 50 years of excellence, introducing modern extraction technologies.",
    image: "/images/card_brewing_ingredients.jpg"
  },
  {
    year: "2005",
    title: "60 Golden Years",
    description: "Marking 60 years of providing tailored malt extracts for baking, brewing, and beverages.",
    image: "/images/malt.jpg"
  },
  {
    year: "Today",
    title: "Continuing the Legacy",
    description: "Still committed to FSSC 22000 certified, 100% natural ingredients.",
    image: "/images/card_dried_malt.jpg"
  }
];

export default function HorizontalTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // When target starts hitting the top, to when target end hits bottom
  });

  // Calculate the horizontal translation based on scroll progress.
  // The negative percentage moves the content to the left.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} style={{ height: "400vh", position: "relative", backgroundColor: "#edebe6" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        
        {/* Timeline Content */}
        <motion.div style={{ x, display: "flex", gap: "10vw", padding: "0 10vw" }}>
          
          {/* Intro Slide */}
          <div style={{ width: "80vw", display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: 0 }}>
            <h2 style={{ fontSize: "4rem", marginBottom: "1rem", color: "#2a1e12" }}>Our History</h2>
            <p style={{ fontSize: "1.5rem", color: "#555", maxWidth: "600px", lineHeight: 1.6 }}>
              Established in Johannesburg since 1945, Cereal & Malt has been manufacturing malt for over 60 golden years. Scroll to explore our journey.
            </p>
          </div>

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => (
            <div key={index} style={{ width: "60vw", display: "flex", alignItems: "center", gap: "4rem", flexShrink: 0 }}>
              <div style={{ flex: 1, position: "relative", height: "50vh", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  style={{ objectFit: "cover" }} 
                />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ fontSize: "5rem", fontWeight: 900, color: "#c5653b", margin: 0, lineHeight: 1 }}>{item.year}</h3>
                <h4 style={{ fontSize: "2.5rem", color: "#2a1e12", margin: 0 }}>{item.title}</h4>
                <p style={{ fontSize: "1.25rem", color: "#555", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            </div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
}
