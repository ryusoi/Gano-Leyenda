
import React, { useState, useEffect, useRef } from 'react';
import LinkIcon from '../icons/LinkIcon';
import type { Language } from '../../translations';

interface BlogsPageProps {
  t: any;
  language: Language;
}

// --- Types & Mock Data ---

interface FeedItem {
  id: string;
  source: string;
  sourceUrl: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  image?: string;
  tags: string[];
  type: 'article' | 'forum' | 'observation' | 'video';
  license?: string;
}

interface WatchdogLog {
  timestamp: string;
  target: string;
  status: 'OK' | 'BLOCKED' | 'FETCHING' | 'RATE_LIMIT';
  message: string;
}

const MOCK_FEED: FeedItem[] = [
    {
        id: 'shr-01',
        source: 'Shroomery',
        sourceUrl: 'https://www.shroomery.org/forums/',
        title: 'PF Tek vs. Monotub: The Definitive 2025 Guide',
        excerpt: 'A comprehensive breakdown of yield differences between classic BRF cakes and modern CVG monotubs based on 500 user logs.',
        date: '2025-05-12T08:30:00Z',
        author: 'MycoMaster99',
        tags: ['Cultivation', 'Tek', 'Active'],
        type: 'forum',
        license: 'User Content'
    },
    {
        id: 'mo-01',
        source: 'Mushroom Observer',
        sourceUrl: 'https://mushroomobserver.org/',
        title: 'Observation #84921: Amanita muscaria',
        excerpt: 'Found in mixed coniferous forest, Northern California. Distinct volva rings and bright red pileus.',
        date: '2025-05-12T07:15:00Z',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/640px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg',
        tags: ['Identification', 'Observation'],
        type: 'observation',
        license: 'CC-BY-SA 3.0'
    },
    {
        id: 'fc-01',
        source: 'FreshCap',
        sourceUrl: 'https://freshcap.com/blogs/blog',
        title: 'Lion’s Mane Latte: Brain Boosting Morning Ritual',
        excerpt: 'How to extract the maximum hericenones from your morning brew using dual-extraction powders.',
        date: '2025-05-11T14:00:00Z',
        image: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Science.mp4', // Using video thumb as image mock
        tags: ['Recipes', 'Wellness'],
        type: 'article',
        license: 'Copyright FreshCap'
    },
    {
        id: 'sts-01',
        source: 'Paul Stamets (Fungi.com)',
        sourceUrl: 'https://fungi.com/blogs/articles',
        title: 'Mycorestoration: Healing the Soil After Fire',
        excerpt: 'New research suggests fungal mycelium can accelerate soil recovery by 40% in post-wildfire regions.',
        date: '2025-05-10T09:00:00Z',
        tags: ['Ecology', 'Science'],
        type: 'article',
        license: 'Copyright Fungi Perfecti'
    },
    {
        id: 'mr-01',
        source: 'Mushroom Revival',
        sourceUrl: 'https://www.mushroomrevival.com/blogs/blog',
        title: 'Podcast Ep 89: Cordyceps and Athletic Performance',
        excerpt: 'Interview with Olympic trainer Dr. Sarah Chen on ATP production and VO2 max enhancement.',
        date: '2025-05-09T16:20:00Z',
        tags: ['Podcast', 'Cordyceps'],
        type: 'video',
        license: 'Copyright Mushroom Revival'
    }
];

// --- UI Components ---

const NeonBorderCard: React.FC<{ children: React.ReactNode, className?: string, delay?: number, color?: 'cyan' | 'magenta' | 'gold' }> = ({ children, className = '', delay = 0, color = 'cyan' }) => {
    const colorHex = color === 'cyan' ? '#00f3ff' : color === 'magenta' ? '#bc13fe' : '#FFD700';
    
    return (
        <div 
            className={`relative p-[1px] rounded-xl overflow-hidden group ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-stone-900 rounded-xl z-0"></div>
            <div 
                className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0 340deg, ${colorHex} 360deg)`,
                    animation: 'spin 4s linear infinite'
                }}
            ></div>
            {/* FIXED: Removed h-full to let content dictate height, preventing rendering issues */}
            <div className="relative z-10 w-full bg-stone-900/90 backdrop-blur-md rounded-[11px] border border-stone-800/50 hover:border-white/10 transition-colors">
                {children}
            </div>
        </div>
    );
};

const WatchdogPanel: React.FC<{ logs: WatchdogLog[] }> = ({ logs }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        // Reduced height for a more compact dashboard feel
        <NeonBorderCard className="h-48" color="magenta">
            <div className="p-3 h-full flex flex-col font-mono text-xs">
                <div className="flex items-center justify-between mb-2 border-b border-stone-800 pb-1">
                    <span className="text-magenta-400 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#bc13fe] rounded-full animate-pulse"></span>
                        WATCHDOG
                    </span>
                    <span className="text-[10px] text-stone-600">PORT: 8080</span>
                </div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent pr-1">
                    {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity text-[10px]">
                            <span className="text-stone-600 shrink-0">[{log.timestamp}]</span>
                            <span className={`shrink-0 ${
                                log.status === 'OK' ? 'text-green-400' : 
                                log.status === 'RATE_LIMIT' ? 'text-yellow-400' : 
                                log.status === 'BLOCKED' ? 'text-red-400' : 'text-blue-400'
                            }`}>
                                {log.target}::{log.status}
                            </span>
                            <span className="text-stone-400 truncate">{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </NeonBorderCard>
    );
};

const BlogsPage: React.FC<BlogsPageProps> = ({ t, language }) => {
    const [feed, setFeed] = useState<FeedItem[]>(MOCK_FEED);
    const [logs, setLogs] = useState<WatchdogLog[]>([]);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'feed' | 'map' | 'tools'>('feed');
    const [isImageDragging, setIsImageDragging] = useState(false);

    // Scroll Parallax
    useEffect(() => {
        const handleScroll = () => requestAnimationFrame(() => setOffset(window.pageYOffset));
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Simulated Watchdog & Live Feed
    useEffect(() => {
        const targets = ['Shroomery', 'MushroomObserver', 'MykoWeb', 'Fungi.com', 'FreshCap', 'RealMushrooms'];
        const statuses: ('OK' | 'FETCHING' | 'RATE_LIMIT')[] = ['OK', 'OK', 'OK', 'FETCHING', 'RATE_LIMIT'];
        
        const interval = setInterval(() => {
            const target = targets[Math.floor(Math.random() * targets.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const now = new Date().toLocaleTimeString('en-US', { hour12: false });
            
            const newLog: WatchdogLog = {
                timestamp: now,
                target: target,
                status: status,
                message: status === 'OK' ? 'New items parsed successfully.' : status === 'RATE_LIMIT' ? '429 Too Many Requests. Backing off.' : 'Scanning sitemap.xml...'
            };

            setLogs(prev => [...prev.slice(-15), newLog]);

            // Randomly "find" a new post
            if (Math.random() > 0.7) {
                const newPost = MOCK_FEED[Math.floor(Math.random() * MOCK_FEED.length)];
                setFeed(prev => [{ ...newPost, id: Date.now().toString(), date: new Date().toISOString() }, ...prev]);
            }

        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const filteredFeed = feed.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Mushroom%20Blogs.mp4";

    return (
        <div className={`animate-fade-in pb-24 text-slate-100 bg-black min-h-screen ${language === 'fa' ? 'font-reishi-body' : ''}`}>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
                .text-magenta-400 { color: #bc13fe; }
                .scrollbar-thin::-webkit-scrollbar { width: 4px; }
                .scrollbar-thumb-stone-700::-webkit-scrollbar-thumb { background: #44403c; border-radius: 4px; }
                .neon-text-cyan { text-shadow: 0 0 10px rgba(0, 243, 255, 0.5); }
            `}</style>

            {/* 1. HERO / INTELLIGENCE CENTER HEADER - COMPACT VERSION */}
            <section className="relative h-[35vh] min-h-[300px] flex flex-col justify-center text-center overflow-hidden bg-stone-950 border-b border-stone-800">
                <div 
                    className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform opacity-40"
                    style={{ transform: `translateY(${offset * 0.3}px)` }} 
                >
                    <video 
                        src={heroVideoUrl} 
                        className="w-full h-full object-cover"
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/50 to-stone-950"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-sm mb-3">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-mono text-cyan-300 tracking-widest uppercase">Live Intelligence</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-magenta-400 drop-shadow-[0_0_15px_rgba(0,243,255,0.3)] mb-3">
                        {t.blogs_hero_title || "MUSHROOM INTELLIGENCE"}
                    </h1>
                    <p className="text-sm sm:text-base text-stone-400 font-light tracking-wide max-w-xl mx-auto mb-6">
                        {t.blogs_hero_subtitle || "Global Aggregation • Real-Time Discovery"}
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="max-w-lg mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full blur opacity-10 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-stone-900/90 backdrop-blur-xl border border-stone-700 rounded-full flex items-center p-1.5 shadow-2xl">
                            <span className="pl-3 text-stone-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search species, tags..." 
                                className="bg-transparent border-none text-white text-sm placeholder-stone-500 focus:ring-0 w-full px-3 py-1.5 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. NEWS TICKER */}
            <div className="bg-black border-b border-stone-800 overflow-hidden py-1.5 relative flex items-center">
                <div className="bg-cyan-600 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest z-10 ml-4 rounded-sm shrink-0">
                    Live
                </div>
                <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] text-stone-400 text-[10px] font-mono flex gap-8 px-4">
                    <span>NASA Mycotecture Project Enters Phase II</span>
                    <span>•</span>
                    <span>New Psilocybe Species Discovered in Oregon</span>
                    <span>•</span>
                    <span>Shroomery: Monotub Tek Updated 2025</span>
                    <span>•</span>
                    <span>FreshCap: Lions Mane Clinical Trials Results</span>
                    <span>•</span>
                    <span>Market Alert: Reishi Extract Prices Rising</span>
                    <span>•</span>
                    <span>Mushroom Council: Q3 Report Released</span>
                </div>
                <style>{`
                    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
                `}</style>
            </div>

            {/* 3. MAIN CONTENT GRID */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-12 gap-6">
                
                {/* LEFT SIDEBAR (Navigation & Trends) */}
                <div className="col-span-12 lg:col-span-3 space-y-4">
                    
                    {/* Navigation Tabs */}
                    <div className="bg-stone-900/50 backdrop-blur-md rounded-xl p-1.5 border border-stone-800 flex flex-col gap-1">
                        <button 
                            onClick={() => setActiveTab('feed')}
                            className={`px-3 py-2.5 rounded-lg text-left text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'feed' ? 'bg-stone-800 text-cyan-400 shadow-lg border border-stone-700' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
                        >
                            <span className="text-base">📰</span> Live Feed
                        </button>
                        <button 
                            onClick={() => setActiveTab('map')}
                            className={`px-3 py-2.5 rounded-lg text-left text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'map' ? 'bg-stone-800 text-cyan-400 shadow-lg border border-stone-700' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
                        >
                            <span className="text-base">🗺️</span> Species Map
                        </button>
                        <button 
                            onClick={() => setActiveTab('tools')}
                            className={`px-3 py-2.5 rounded-lg text-left text-xs font-bold flex items-center gap-3 transition-all ${activeTab === 'tools' ? 'bg-stone-800 text-cyan-400 shadow-lg border border-stone-700' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}
                        >
                            <span className="text-base">🧰</span> ID Helper
                        </button>
                    </div>

                    {/* Trending Threads */}
                    <NeonBorderCard color="gold">
                        <div className="p-4">
                            <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-3 border-b border-stone-800 pb-2 flex justify-between">
                                <span>Trending</span>
                                <span className="bg-stone-800 px-1 rounded text-stone-400">TOP 5</span>
                            </h3>
                            <ul className="space-y-2.5">
                                {[
                                    { t: "First time grower - is this contam?", r: 42 },
                                    { t: "Pan Cyan outdoor bed success!", r: 156 },
                                    { t: "Agar plates condensation issues", r: 8 },
                                    { t: "The definitive ID thread 2025", r: 1024 },
                                    { t: "Substrate ratios for woodlovers", r: 33 }
                                ].map((thread, i) => (
                                    <li key={i} className="group cursor-pointer">
                                        <div className="text-xs text-stone-300 group-hover:text-white truncate transition-colors font-medium">{thread.t}</div>
                                        <div className="text-[9px] text-stone-500 group-hover:text-amber-500 transition-colors">{thread.r} replies</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </NeonBorderCard>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="col-span-12 lg:col-span-6">
                    {activeTab === 'feed' && (
                        <div className="space-y-4">
                            {filteredFeed.length === 0 ? (
                                <div className="text-center py-12 border border-stone-800 rounded-xl bg-stone-900/30">
                                    <p className="text-stone-500 text-sm">No posts found matching "{searchTerm}"</p>
                                    <button onClick={() => setSearchTerm('')} className="mt-2 text-cyan-500 text-xs underline">Clear Search</button>
                                </div>
                            ) : (
                                filteredFeed.map((item) => (
                                    <NeonBorderCard key={item.id} color={item.source === 'Shroomery' ? 'gold' : item.source === 'Mushroom Observer' ? 'cyan' : 'magenta'}>
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${item.source === 'Shroomery' ? 'bg-amber-900/50 text-amber-400' : 'bg-stone-800 text-stone-300'}`}>
                                                        {item.source.charAt(0)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-bold text-white truncate">{item.source}</div>
                                                        <div className="text-[10px] text-stone-500 uppercase tracking-wider truncate">{item.type} • {new Date(item.date).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                {item.type === 'observation' && <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-[9px] rounded border border-green-500/20 shrink-0">Citizen Science</span>}
                                            </div>

                                            {item.image && (
                                                <div className="mb-3 rounded-lg overflow-hidden border border-stone-800 relative group/img bg-black">
                                                    {item.type === 'video' ? (
                                                        <video src={item.image} className="w-full h-48 object-cover opacity-80 group-hover/img:opacity-100 transition-opacity" autoPlay loop muted playsInline />
                                                    ) : (
                                                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover opacity-80 group-hover/img:opacity-100 transition-opacity" />
                                                    )}
                                                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-[9px] text-white rounded backdrop-blur-sm">
                                                        {item.license || 'Copyrighted'}
                                                    </div>
                                                </div>
                                            )}

                                            <h3 className="text-lg font-bold text-white mb-2 hover:text-cyan-400 transition-colors cursor-pointer leading-snug">
                                                <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.title}</a>
                                            </h3>
                                            <p className="text-stone-400 text-sm leading-relaxed mb-3 line-clamp-3">{item.excerpt}</p>

                                            <div className="flex items-center justify-between pt-3 border-t border-stone-800/50">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 border border-stone-700">#{tag}</span>
                                                    ))}
                                                </div>
                                                <a 
                                                    href={item.sourceUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-500 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                                                >
                                                    READ ORIGINAL <LinkIcon className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </NeonBorderCard>
                                ))
                            )}
                            
                            {/* Live loader animation */}
                            <div className="text-center py-6 opacity-50">
                                <div className="inline-flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'map' && (
                        <div className="h-[500px] rounded-2xl overflow-hidden border border-stone-700 relative bg-[#0f172a] group">
                            {/* Simulated Leaflet Map */}
                            <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center filter invert"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                            
                            {/* Mock Pins */}
                            {[
                                {x: '40%', y: '30%', c: 'red'}, {x: '55%', y: '45%', c: 'green'}, {x: '20%', y: '40%', c: 'blue'}, {x: '70%', y: '60%', c: 'green'}
                            ].map((pin, i) => (
                                <div key={i} className="absolute w-3 h-3 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-transform" style={{left: pin.x, top: pin.y, backgroundColor: pin.c}}>
                                    <div className="absolute -inset-2 rounded-full border opacity-50" style={{borderColor: pin.c}}></div>
                                </div>
                            ))}

                            <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur p-4 rounded-xl border border-stone-700 shadow-xl max-w-xs">
                                <h4 className="text-sm font-bold text-white mb-2">Species Observation Map</h4>
                                <div className="space-y-2 text-xs text-stone-400">
                                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> <span className="text-green-400">●</span> Edible</label>
                                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> <span className="text-red-400">●</span> Toxic</label>
                                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> <span className="text-blue-400">●</span> Psychoactive</label>
                                </div>
                                <button className="mt-4 w-full bg-stone-800 hover:bg-stone-700 text-white text-xs py-2 rounded border border-stone-600">
                                    Download CSV (Visible)
                                </button>
                            </div>
                            
                            <div className="absolute bottom-4 right-4 text-[10px] text-stone-500">
                                Data: Mushroom Observer API (Simulated)
                            </div>
                        </div>
                    )}

                    {activeTab === 'tools' && (
                        <div className="space-y-6">
                            {/* ID Helper */}
                            <NeonBorderCard color="cyan">
                                <div 
                                    className={`p-8 text-center border-2 border-dashed rounded-xl transition-colors ${isImageDragging ? 'border-cyan-400 bg-cyan-900/20' : 'border-stone-700 hover:border-stone-500'}`}
                                    onDragOver={(e) => { e.preventDefault(); setIsImageDragging(true); }}
                                    onDragLeave={() => setIsImageDragging(false)}
                                    onDrop={(e) => { e.preventDefault(); setIsImageDragging(false); }}
                                >
                                    <div className="text-3xl mb-3">📸</div>
                                    <h3 className="text-lg font-bold text-white mb-1">AI Species Identification</h3>
                                    <p className="text-stone-400 text-xs mb-4">Drag & drop a mushroom photo here.</p>
                                    <button className="px-5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-full shadow-lg shadow-cyan-500/20 transition-all">
                                        Select Image
                                    </button>
                                </div>
                            </NeonBorderCard>

                            {/* Month Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                                    <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Top Species</h4>
                                    <ol className="text-xs space-y-1.5 text-stone-300">
                                        <li>1. <span className="text-white font-bold">Morchella</span> (2,401)</li>
                                        <li>2. <span className="text-white font-bold">Pleurotus</span> (1,832)</li>
                                        <li>3. <span className="text-white font-bold">Trametes</span> (945)</li>
                                    </ol>
                                </div>
                                <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                                    <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Stats</h4>
                                    <div className="text-xl font-mono text-white mb-1">84,291</div>
                                    <div className="text-[10px] text-stone-400">Observations this month</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDEBAR (Watchdog & Product) */}
                <div className="col-span-12 lg:col-span-3 space-y-4">
                    
                    <WatchdogPanel logs={logs} />

                    {/* Product Spotlight */}
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">SPONSORED</div>
                        <div className="h-24 bg-white/5 rounded-lg mb-3 flex items-center justify-center">
                            <span className="text-3xl">🍄</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">Real Mushrooms: 5-Defenders</h4>
                        <p className="text-[10px] text-stone-400 mb-3">Certified organic extracts. 100% Fruiting Body.</p>
                        <button className="w-full py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white text-[10px] font-bold rounded transition-colors uppercase tracking-wide">
                            Check Price
                        </button>
                    </div>
                </div>
            </div>

            {/* FOOTER ATTRIBUTION */}
            <div className="border-t border-stone-800 mt-8 py-6 text-center">
                <p className="text-[9px] text-stone-500 uppercase tracking-widest mb-1">Data Aggregation Compliance</p>
                <p className="text-[10px] text-stone-600 max-w-2xl mx-auto">
                    Content snippets are displayed under fair use for informational purposes. 
                    All rights reserved by original authors (Shroomery, Mushroom Observer, etc.). 
                    <a href="#" className="text-stone-400 hover:text-white underline ml-1">View Crawl Log</a>
                </p>
            </div>
        </div>
    );
};

export default BlogsPage;
