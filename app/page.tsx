"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Droplet, Wheat, Beer, ArrowRight } from "lucide-react";
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

      <section id="home" className={styles.hero}>
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className={`${styles.heroContent} animate-fade-up`}>
            <div className={styles.heroLogoGroup}>
              <h1 className={styles.heroBigText}>CEREAL & MALT.</h1>
              <span className={styles.heroSmallText}>EXTRACTS</span>
            </div>
          </div>
        </div>
        
        {/* Floating elements for unique hero */}
        <div className={styles.heroFloatingElements}>
          <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
          <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
          <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
        </div>
      </section>

      <section id="products" className={`container ${styles.section} animate-fade-up delay-200`}>
        <div className="text-center">
          <h2 className={styles.sectionTitle}>Our Premium Solutions</h2>
          <p className={styles.sectionSubtitle}>Tailored malt extracts for baking, brewing, and beverages.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} ${styles.cardLiquid}`}>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Droplet size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Liquid Malt Extract</h3>
              <p>Rich, unrefined liquid extract providing natural color, flavor, and fermentable sugars for a variety of applications.</p>
            </div>
          </div>
          <div className={`${styles.featureCard} ${styles.cardDried}`}>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Wheat size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Dried Malt Extract</h3>
              <p>Convenient powdered malt, perfect for baking and specialized beverage formulations requiring extended shelf life.</p>
            </div>
          </div>
          <div className={`${styles.featureCard} ${styles.cardBrewing}`}>
            <div className={styles.cardOverlay}></div>
            <div className={styles.featureContent}>
              <div className={styles.featureIcon}><Beer size={32} strokeWidth={1.5} /></div>
              <h3 className={styles.featureTitle}>Brewing Ingredients</h3>
              <p>High-quality specialized ingredients crafted specifically to meet the demands of modern brewing.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="history" className={styles.splitSection}>
        <div className={styles.splitContent}>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2 className={styles.splitTitle}>Our History</h2>
            <p className={styles.splitText}>
              Established in Johannesburg since 1945, Cereal & Malt has been manufacturing malt for 60 golden years.
            </p>
            <button className={styles.splitBtn}>READ THE WHOLE STORY</button>
          </div>
        </div>
        <div className={styles.splitImageContainer}>
          <Image 
            src="/images/history.jpg" 
            alt="Historical Cereal & Malt Factory" 
            fill
            className={styles.splitImage}
          />
        </div>
      </section>

      <section id="commitment" className={`${styles.splitSection} ${styles.splitReverse}`}>
        <div className={styles.splitContent}>
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
        </div>
        <div className={styles.splitImageContainer}>
          <Image 
            src="/images/malt.jpg" 
            alt="Rich Malt Extract" 
            fill
            className={styles.splitImage}
          />
        </div>
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
    </main>
  );
}
