"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductBanner() {
  const [bannerData, setBannerData] = useState<{
    isActive: boolean;
    title: string;
    description: string;
    link: string;
    linkText: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/banner')
      .then(res => res.json())
      .then(data => setBannerData(data))
      .catch(err => console.error("Failed to fetch banner data:", err));
  }, []);

  if (!bannerData || !bannerData.isActive) {
    return null;
  }

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#c5653b',
      color: 'white',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{bannerData.title}</h3>
          <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>{bannerData.description}</p>
        </div>
        
        {bannerData.link && bannerData.linkText && (
          <Link href={bannerData.link} style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            backgroundColor: 'white',
            color: '#c5653b',
            fontWeight: 'bold',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            {bannerData.linkText}
          </Link>
        )}
      </div>
    </div>
  );
}
