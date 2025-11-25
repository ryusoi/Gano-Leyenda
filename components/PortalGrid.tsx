
import React, { useState, useEffect } from 'react';
import type { Page } from '../types';

interface PortalGridProps {
  t: any;
  navigate: (page: Page) => void;
}

interface PortalItem {
  id: Page;
  titleKey: string;
  videoUrl: string;
}

// News Data Pool for Live Ticker with specified fallback links
const NEWS_POOL = [
    { title: "NASA Mycotecture Project Enters Phase II", url: "https://www.nasa.gov" },
    { title: "New Psilocybe Species Discovered in Oregon", url: "https://mushroomobserver.org/" },
    { title: "Shroomery: Monotub Tek Updated 2025", url: "https://www.shroomery.org/" },
    { title: "FreshCap: Lions Mane Clinical Trials Results", url: "https://freshcap.com/blogs/blog" },
    { title: "Market Alert: Reishi Extract Prices Rising", url: "https://realmushrooms.com/blogs/rm" },
    { title: "Mushroom Council: Q3 Report Released", url: "https://www.mushroomcouncil.com/" },
    { title: "Paul Stamets Announces New Bee Study", url: "https://fungi.com/blogs/articles" },
    { title: "MykoWeb: California Fungi Archive Update", url: "https://www.mykoweb.com/" },
    { title: "Mushroom Revival: Podcast on Cordyceps", url: "https://www.mushroomrevival.com/blogs/blog" },
    { title: "Study: Beta-Glucans vs Synthetic Immunity", url: "https://pubmed.ncbi.nlm.nih.gov" }
];

const PortalGrid: React.FC<PortalGridProps> = ({ t, navigate }) => {
  const [newsItems, setNewsItems] = useState(NEWS_POOL.slice(0, 6));

  // Watchdog Simulation: Updates news items periodically
  useEffect(() => {
      const interval = setInterval(() => {
          // Pick a random item from the pool
          const randomItem = NEWS_POOL[Math.floor(Math.random() * NEWS_POOL.length)];
          // Add to front, simulating incoming news
          setNewsItems(prev => {
              // Simple rotation
              const newList = [randomItem, ...prev];
              if (newList.length > 12) newList.pop();
              return newList;
          });
      }, 4000); // Update every 4 seconds

      return () => clearInterval(interval);
  }, []);

  // Configuration for all 18 portals
  const portals: PortalItem[] = [
    { id: 'home', titleKey: 'nav_home', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20(2).mp4' },
    { id: 'about', titleKey: 'nav_about', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/SIna%20Mushroom%20and%20Gano%20Shakh.mp4' },
    { id: 'cultivation', titleKey: 'nav_cultivation', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Medicinal%20Mushroom%206.mp4' },
    { id: 'science', titleKey: 'nav_science', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Science.mp4' },
    { id: 'products', titleKey: 'nav_products', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet%20Gano%20Shakh.mp4' },
    { id: 'contact', titleKey: 'nav_contact', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/INFOCONTACTS.mp4' },
    { id: 'reishi-decor', titleKey: 'nav_reishi_decor', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%202.mp4' },
    { id: 'reishi-biome', titleKey: 'nav_reishi_biome', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Biome%20(2).mp4' },
    { id: 'reishi-cream', titleKey: 'nav_reishi_cream', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Night%20Cream.mp4' },
    { id: 'reishi-extract', titleKey: 'nav_reishi_extract', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Extract.mp4' },
    { id: 'investment', titleKey: 'nav_investment', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Investment%20Mushrooms.mp4' },
    { id: 'sales', titleKey: 'nav_sales', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Team%20Sales.mp4' },
    { id: 'health-tips', titleKey: 'nav_health_tips', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Health.mp4' },
    { id: 'myco-news', titleKey: 'nav_myco_news', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/NASA%20Mushroom%20Houses.mp4' },
    { id: 'blogs', titleKey: 'nav_blogs', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Mushroom%20Blogs.mp4' },
    { id: 'make-money', titleKey: 'nav_make_money', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/MAke%20Money.mp4' },
    { id: 'gano-game', titleKey: 'nav_gano_game', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Immortality.mp4' },
    { id: 'iran-mushrooms', titleKey: 'nav_iran_mushrooms', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoshakh%20NEW.mp4' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-stone-950 relative overflow-hidden">
        
        {/* NEWS TICKER */}
        <div className="absolute top-0 left-0 w-full z-30 bg-blue-600 border-b border-blue-500 overflow-hidden py-1.5 flex items-center shadow-lg">
            <div className="bg-blue-800 text-yellow-300 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest z-10 ml-4 rounded-sm shrink-0 flex items-center gap-2 animate-pulse border border-yellow-300/30">
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
                MUSHROOMS LATEST NEWS
            </div>
            <div className="whitespace-nowrap animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] text-yellow-300 text-[10px] font-mono flex gap-8 px-4 w-full items-center font-bold">
                {newsItems.map((item, idx) => (
                    <div key={`${idx}-${item.title}`} className="flex items-center gap-2">
                        <span className="text-yellow-100/70">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                        <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-white hover:underline transition-colors cursor-pointer"
                        >
                            {item.title}
                        </a>
                        <span className="text-yellow-500/50 mx-2">///</span>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
            `}</style>
        </div>

        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        
        <div className="max-w-[1600px] mx-auto mt-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-bold chrome-gold-text mb-2 tracking-tight drop-shadow-lg">
                    EXPLORE THE GANOVERSE
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto font-light tracking-wide">
                    Access our complete ecosystem of health, science, and innovation.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {portals.map((item) => (
                    <div 
                        key={item.id} 
                        className="portal-card group aspect-[4/5] cursor-pointer rounded-lg"
                        onClick={() => navigate(item.id)}
                    >
                        <div className="portal-content rounded-lg">
                            {/* Video Background */}
                            <video
                                src={item.videoUrl}
                                className="portal-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            
                            {/* Dark Overlay Gradient */}
                            <div className="portal-overlay"></div>

                            {/* Title */}
                            <div className="portal-title px-2 pb-2">
                                <h3 className="text-xs sm:text-sm font-bold chrome-gold-text tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                                    {t[item.titleKey]}
                                </h3>
                                <div className="h-px w-0 bg-cyan-400 mx-auto mt-1 transition-all duration-500 group-hover:w-1/2 shadow-[0_0_5px_#00f3ff]"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default PortalGrid;
