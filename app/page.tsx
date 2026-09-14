"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Droplet, Wheat, Beer, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductBanner from "@/components/ProductBanner";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import styles from "./page.module.css";

export default function Home() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and past the header (e.g. 100px), hide it.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolledDown(true);
      } else {
        // Scrolling up
        setIsScrolledDown(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  const customEase = [0.16, 1, 0.3, 1] as const;
  const smoothTransition = { duration: 1.2, ease: customEase };
  const smoothTransitionFast = { duration: 0.8, ease: customEase };

  return (
    <main>
      <header className={`${styles.header} ${isScrolledDown ? styles.headerHidden : ""}`}>
        <div className={styles.headerContent}>
          <Image 
            src="/images/logo-small.png" 
            alt="Cereal & Malt Logo" 
            width={120} 
            height={40} 
            className={styles.logo}
            style={{ filter: "brightness(0.2)", width: "120px", height: "auto" }} // Darken and size down for island
            priority
          />
          <nav className={styles.nav}>
            <a href="#home" className={styles.navLink}>Home</a>
            <a href="#products" className={styles.navLink}>Products</a>
            <a href="#process" className={styles.navLink}>Process</a>
            <a href="#quality" className={styles.navLink}>Quality</a>
          </nav>
        </div>
      </header>

      <motion.section 
        id="home" 
        className={styles.hero}
        style={{ scale: heroScale, opacity: heroOpacity, position: "sticky", top: 0 }}
      >
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className={`${styles.heroContent}`}>
            <div className={styles.heroLogoGroup}>
              <motion.h1 
                className={styles.heroBigText}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
              >
                {/* Staggered letter reveal for CEREAL & */}
                <span style={{ display: "block" }}>
                  {"CEREAL &".split("").map((char, i) => (
                    <span key={`l1-${i}`} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
                      <motion.span 
                        style={{ display: "inline-block" }} 
                        variants={{ 
                          hidden: { y: "100%", opacity: 0 }, 
                          visible: { y: 0, opacity: 1, transition: { duration: 1, ease: customEase } } 
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </span>
                  ))}
                </span>
                {/* Staggered letter reveal for MALT. */}
                <span style={{ display: "block" }}>
                  {"MALT.".split("").map((char, i) => (
                    <span key={`l2-${i}`} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
                      <motion.span 
                        style={{ display: "inline-block" }} 
                        variants={{ 
                          hidden: { y: "100%", opacity: 0 }, 
                          visible: { y: 0, opacity: 1, transition: { duration: 1, ease: customEase } } 
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </motion.h1>
              <motion.span 
                className={styles.heroSmallText}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...smoothTransition, delay: 1 }}
              >
                EXTRACTS
              </motion.span>
            </div>
          </div>
        </div>
        
        {/* Floating elements for unique hero */}
        <div className={styles.heroFloatingElements}>
          <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
          <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
          <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
        </div>
      </motion.section>

      {/* Wrapping the rest of the content in a relative container so it slides over the sticky hero */}
      <div style={{ position: "relative", zIndex: 10, background: "#edebe6" }}>
      
      <ProductBanner />

      <motion.section 
        id="products" 
        className={`container ${styles.section}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div 
          className="text-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: smoothTransitionFast }
          }}
        >
          <motion.h2 
            className={styles.sectionTitle}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {"Our Premium Solutions".split(" ").map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
                <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: smoothTransitionFast } }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <p className={styles.sectionSubtitle}>Tailored malt extracts for baking, brewing, and beverages.</p>
        </motion.div>
        <div className={styles.featuresGrid}>
          <motion.div 
            className={`${styles.featureCard}`}
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: smoothTransition }
            }}
          >
            <motion.div className={styles.cardBg} style={{ backgroundImage: "url('/images/card_liquid_malt.jpg')" }} variants={{ hover: { scale: 1.1 } }} transition={{ duration: 0.8, ease: customEase }}></motion.div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Droplet size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Liquid Malt Extract</h3>
              <p>Rich, unrefined liquid extract providing natural color, flavor, and fermentable sugars for a variety of applications.</p>
            </div>
          </motion.div>
          <motion.div 
            className={`${styles.featureCard}`}
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: smoothTransition }
            }}
          >
            <motion.div className={styles.cardBg} style={{ backgroundImage: "url('/images/card_dried_malt.jpg')" }} variants={{ hover: { scale: 1.1 } }} transition={{ duration: 0.8, ease: customEase }}></motion.div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Wheat size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Dried Malt Extract</h3>
              <p>Convenient powdered malt, perfect for baking and specialized beverage formulations requiring extended shelf life.</p>
            </div>
          </motion.div>
          <motion.div 
            className={`${styles.featureCard}`}
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: smoothTransition }
            }}
          >
            <motion.div className={styles.cardBg} style={{ backgroundImage: "url('/images/card_brewing_ingredients.jpg')" }} variants={{ hover: { scale: 1.1 } }} transition={{ duration: 0.8, ease: customEase }}></motion.div>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Beer size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Brewing Ingredients</h3>
              <p>High-quality specialized ingredients crafted specifically to meet the demands of modern brewing.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <HorizontalTimeline />

      <section id="commitment" className={`${styles.splitSection} ${styles.splitReverse}`}>
        <motion.div 
          className={styles.splitContent}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={smoothTransition}
        >
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2 className={styles.splitTitle}>Our Commitment To Quality</h2>
            <p className={styles.splitText}>
              From the golden barley fields to our state-of-the-art extraction facilities, we ensure that every drop of malt retains its natural goodness, vibrant flavor, and nutritional benefits.
            </p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1.125rem", marginBottom: "2rem" }}>
              <li>✓ FSSC 22000 Certified</li>
              <li>✓ Kosher & Halal Certified</li>
              <li>✓ 100% Natural Ingredients</li>
            </ul>
            <button className={styles.splitBtn}>OUR PROCESS</button>
          </div>
        </motion.div>
        <motion.div 
          className={styles.splitImageContainer}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: customEase }}
        >
          <Image 
            src="/images/malt.jpg" 
            alt="Rich Malt Extract" 
            fill
            className={styles.splitImage}
          />
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <div className="container flex-col items-center justify-center gap-4">
          <Image 
            src="/images/logo-small.png" 
            alt="Cereal & Malt Logo" 
            width={150} 
            height={50} 
            style={{ opacity: 0.5, margin: "0 auto", filter: "brightness(0.2)" }}
          />
          <p style={{ marginTop: "2rem" }}>&copy; {new Date().getFullYear()} Cereal & Malt. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </main>
  );
}
