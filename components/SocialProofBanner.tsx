
import React, { useState, useEffect } from 'react';
import type { Language } from '../translations';

interface SocialProofBannerProps {
    language: Language;
}

const CITIES = {
    en: ['Tehran', 'London', 'Dubai', 'Toronto', 'Berlin', 'Shiraz', 'Isfahan', 'Mashhad', 'New York', 'Vancouver'],
    fa: ['تهران', 'لندن', 'دبی', 'تورنتو', 'برلین', 'شیراز', 'اصفهان', 'مشهد', 'نیویورک', 'ونکوور'],
    es: ['Teherán', 'Londres', 'Dubái', 'Toronto', 'Berlín', 'Shiraz', 'Isfahán', 'Mashhad', 'Nueva York', 'Vancouver']
};

const ACTIONS = {
    en: [
        { text: 'purchased Reishi Extract', icon: '🛒' },
        { text: 'bought Reishi Night Cream', icon: '🛒' },
        { text: 'is viewing Cultivation Page', icon: '👁️' },
        { text: 'is reading Science Reports', icon: '🧠' },
        { text: 'joined the Sales Team', icon: '🚀' },
        { text: 'ordered Reishi Decor', icon: '🍄' },
        { text: 'is analyzing bloodwork', icon: '🩸' }
    ],
    fa: [
        { text: 'عصاره ریشی خرید', icon: '🛒' },
        { text: 'کرم شب ریشی سفارش داد', icon: '🛒' },
        { text: 'در حال مشاهده صفحه پرورش است', icon: '👁️' },
        { text: 'در حال مطالعه گزارش‌های علمی است', icon: '🧠' },
        { text: 'به تیم فروش پیوست', icon: '🚀' },
        { text: 'ریشی دکور سفارش داد', icon: '🍄' },
        { text: 'در حال تحلیل آزمایش خون است', icon: '🩸' }
    ],
    es: [
        { text: 'compró Extracto de Reishi', icon: '🛒' },
        { text: 'compró Crema de Noche Reishi', icon: '🛒' },
        { text: 'está viendo la página de Cultivo', icon: '👁️' },
        { text: 'está leyendo informes científicos', icon: '🧠' },
        { text: 'se unió al equipo de ventas', icon: '🚀' },
        { text: 'ordenó Decoración Reishi', icon: '🍄' },
        { text: 'está analizando análisis de sangre', icon: '🩸' }
    ]
};

const SocialProofBanner: React.FC<SocialProofBannerProps> = ({ language }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState({ city: '', action: '', icon: '' });

    useEffect(() => {
        const generateContent = () => {
            const currentLang = language in CITIES ? language : 'en';
            const cities = CITIES[currentLang];
            const actions = ACTIONS[currentLang];
            
            const city = cities[Math.floor(Math.random() * cities.length)];
            const act = actions[Math.floor(Math.random() * actions.length)];
            
            return {
                city,
                action: act.text,
                icon: act.icon
            };
        };

        // Initial setup
        setContent(generateContent());

        const interval = setInterval(() => {
            setContent(generateContent());
            setIsVisible(true);
            
            // Hide after 3 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            
        }, 60000); // Run every 60 seconds

        return () => clearInterval(interval);
    }, [language]);

    const isRtl = language === 'fa';

    return (
        <div 
            className={`fixed bottom-4 left-4 z-50 transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-stone-900/60 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 shadow-inner shrink-0">
                    <span className="text-lg filter drop-shadow-sm">{content.icon}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[10px] font-bold text-white/90 tracking-wide uppercase">
                            {language === 'fa' ? 'کاربر زنده' : language === 'es' ? 'Usuario en vivo' : 'Live User'}
                        </span>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                    </div>
                    <p className="text-xs font-medium text-stone-300 whitespace-nowrap leading-tight">
                        <span className="text-white font-semibold">{content.city}</span> {language === 'fa' ? '' : '-'} {content.action}
                    </p>
                </div>
                
                {/* HD Progress Bar at bottom */}
                <div className="absolute bottom-0 left-1 right-1 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent">
                    <div 
                        className={`h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all ease-linear ${isVisible ? 'w-full' : 'w-0'}`} 
                        style={{ transitionDuration: isVisible ? '3000ms' : '0ms' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SocialProofBanner;
