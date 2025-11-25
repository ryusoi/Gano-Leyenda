
import React, { useState, useEffect, useRef } from 'react';
import LinkIcon from '../icons/LinkIcon';
import type { Language } from '../../translations';

interface MycoNewsPageProps {
  t: any;
  language: Language;
}

const sources = [
    { title: 'NASA — Mycotecture / NIAC', url: 'https://www.nasa.gov/directorates/spacetech/niac/2018_Phase_I_Phase_II/Myco-architecture_off_planet_structures_grown_from_fungal_mycelium/', descKey: 'myco_news_src_1_desc' },
    { title: 'NASA News Release', url: 'https://www.nasa.gov/press-release/nasa-invests-in-tech-concepts-aimed-at-exploring-mars', descKey: 'myco_news_src_2_desc' },
    { title: 'Ecovative Design', url: 'https://ecovative.com', descKey: 'myco_news_src_3_desc' },
    { title: 'MycoWorks', url: 'https://www.mycoworks.com', descKey: 'myco_news_src_4_desc' },
    { title: 'MOGU (Italy)', url: 'https://mogu.bio', descKey: 'myco_news_src_5_desc' },
    { title: 'Biohm (UK)', url: 'https://www.biohm.co.uk', descKey: 'myco_news_src_6_desc' },
    { title: 'Loop Biotech', url: 'https://loop-biotech.com', descKey: 'myco_news_src_7_desc' },
    { title: 'MycoTile', url: 'https://mycotile.co.ke', descKey: 'myco_news_src_8_desc' },
    { title: 'The Living — Hy-Fi', url: 'http://www.thelivingnewyork.com/project/hy-fi', descKey: 'myco_news_src_9_desc' },
    { title: 'Phil Ross', url: 'https://www.mycoworks.com/team/phil-ross', descKey: 'myco_news_src_10_desc' },
    { title: 'Paul Stamets', url: 'https://paulstamets.com', descKey: 'myco_news_src_11_desc' },
    { title: 'FUNGAR (H2020)', url: 'http://www.fungar.eu', descKey: 'myco_news_src_12_desc' },
    { title: 'FUNGATERIA', url: 'https://fungateria.eu', descKey: 'myco_news_src_13_desc' },
    { title: 'Frontiers in Built Environment', url: 'https://www.frontiersin.org/journals/built-environment', descKey: 'myco_news_src_14_desc' },
    { title: 'MDPI / Mycelium Composites', url: 'https://www.mdpi.com', descKey: 'myco_news_src_15_desc' },
    { title: 'IJDesign', url: 'https://www.ijdesign.org', descKey: 'myco_news_src_16_desc' },
    { title: 'MOGU Press', url: 'https://mogu.bio/press/', descKey: 'myco_news_src_17_desc' },
    { title: 'Biofabricate', url: 'https://www.biofabricate.co', descKey: 'myco_news_src_18_desc' },
    { title: 'ArchDaily — Mushroom Buildings', url: 'https://www.archdaily.com', descKey: 'myco_news_src_19_desc' },
    { title: 'Architectural Digest', url: 'https://www.architecturaldigest.com', descKey: 'myco_news_src_20_desc' },
    { title: 'Wageningen / Utrecht University', url: 'https://www.uu.nl/en/research/microbiology', descKey: 'myco_news_src_21_desc' },
    { title: 'TU/e / Eindhoven', url: 'https://www.tue.nl/en/', descKey: 'myco_news_src_22_desc' },
    { title: 'CORDIS / EU FUNGAR', url: 'https://cordis.europa.eu/project/id/858132', descKey: 'myco_news_src_23_desc' },
    { title: 'Loop / YES!Delft', url: 'https://www.yesdelft.com', descKey: 'myco_news_src_24_desc' },
    { title: 'MycoStories', url: 'https://mycostories.com', descKey: 'myco_news_src_25_desc' },
    { title: 'Research: Pure Mycelium Materials', url: 'https://pubmed.ncbi.nlm.nih.gov', descKey: 'myco_news_src_26_desc' },
    { title: 'EU EIC / ELMs Portfolio', url: 'https://eic.ec.europa.eu', descKey: 'myco_news_src_27_desc' },
    { title: 'Wired / Hy-Fi', url: 'https://www.wired.com', descKey: 'myco_news_src_28_desc' },
    { title: 'Ecovative Blog', url: 'https://ecovative.com/blog', descKey: 'myco_news_src_29_desc' },
    { title: 'DesignBoom on NASA', url: 'https://www.designboom.com', descKey: 'myco_news_src_30_desc' },
];

const FUNGAL_MAP_ARTICLE = {
    videoUrl: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Map%20of%20Fungi.mp4",
    en: {
        title: "The Planetary Fungal Map — A Deep-Time Network Older Than Forests",
        intro: "If Earth had a circulatory system, fungi would be its oldest and most intricate set of vessels. Long before the first trees rose, long before the continents resembled anything familiar, fungal life was already weaving itself through primitive soils. Fossils such as Ourasphaira giraldae push the fungal lineage back to at least 1 billion years, making fungi one of the oldest complex terrestrial organisms on the planet.",
        sections: [
            {
                title: "1. A Civilization Beneath Our Feet",
                icon: "👣",
                content: `Modern mycological mapping reveals something astonishing: the biggest “map” of life on Earth isn’t above ground at all—it is a subterranean fungal superstructure.<br/><br/>This structure includes:<br/>• <strong>Mycorrhizal networks</strong> spanning forests, savannas, wetlands<br/>• <strong>Saprotrophic webs</strong> decomposing ancient wood, bone, and organic matter<br/>• <strong>Endophytic micro-mycelia</strong> living quietly inside plant tissues<br/>• <strong>Pathogenic networks</strong> that shape ecosystem dynamics by pruning weak hosts<br/><br/>When scientists chart these networks using environmental DNA, isotopic tracing, and LIDAR-assisted soil mapping, they find something almost unbelievable: mycelium forms continuous underground “highways” that can extend for kilometers, linking tree roots, shrubs, grasses, and even entire biogeographical regions.<br/><br/>Some forests in North America show mycorrhizal continuity stretching across state lines. In Europe, genetic studies reveal mycelial clones that cross national borders, surviving in the soil for thousands of years.`
            },
            {
                title: "2. Ancient Kingdom of Fungi — Before Leaves, Before Flowers",
                icon: "🦖",
                content: `Historically, fungi have been Earth’s great alchemists. During the Devonian period (419–359 Mya), giant fungal organisms like Prototaxites, towering up to 8 meters tall, dominated landscapes devoid of vertebrate herbivores. These early giants were effectively the first terrestrial “ecosystem engineers.”<br/><br/>Their functions included:<br/>• Breaking down inert rock into mineral-rich proto-soil<br/>• Recycling organic molecules into usable nutrients<br/>• Establishing the first plant–fungus symbioses (precursors to modern mycorrhizae)<br/><br/>This collaboration allowed primitive plants to colonize land—fungi literally guided the greening of Earth.`
            },
            {
                title: "3. Underground Mycelial Networks — A Global Superorganism",
                icon: "🌐",
                content: `Modern forests still depend on fungal networks that operate as both infrastructure and intelligence systems.<br/><br/><strong>Mycorrhizal exchange: the biological internet</strong><br/>The fungi–plant economy is governed by bidirectional nutrient traffic:<br/>• Fungi deliver phosphate, nitrogen, magnesium, trace elements, and water directly into plant root cells.<br/>• In return, plants channel carbon-rich sugars and lipids to the fungi—a currency that fuels miles of mycelial expansion.<br/><br/>This dynamic is so structured that scientists often call it the Wood Wide Web, but this metaphor barely captures its scale.<br/><br/><strong>Distances spanned by continuous mycelium</strong><br/>In Oregon, a single Armillaria ostoyae individual covers 9.6 square kilometers, making it the largest organism on Earth. Similar networks in Siberia, Scandinavia, and Canadian boreal forests extend across multiple ecological zones, sometimes bridging regions separated by mountain ridges or rivers.<br/><br/>In some tropical mycorrhizal systems, shared fungal partners connect entire valley ecosystems into one carbon-sequestering cooperative.<br/><br/>These networks can effectively link:<br/>• City to city (in urban green corridors)<br/>• Province to province (across continuous forest belts)<br/>• Country to country (particularly in Eurasian boreal and temperate zones)<br/><br/>The fungal map of Earth is therefore not a set of isolated dots—but one long, ancient, migrating continuum of biological threads.`
            },
            {
                title: "4. The Mycelial Network as a Carbon Engine",
                icon: "♻️",
                content: `Fungi are the master regulators of the global carbon cycle. Their roles are immense:<br/><br/>• <strong>Decomposition:</strong> Saprotrophic fungi break down lignin and cellulose—the toughest plant polymers—unlocking carbon stored in wood.<br/>• <strong>Soil formation:</strong> Mycelium binds soil particles, creating stable aggregates that store carbon for centuries.<br/>• <strong>Carbon trading:</strong> Through mycorrhizae, fungi redistribute carbon between trees, sometimes allocating carbon from the strongest individuals to the weakest, buffering ecosystems during climate stress.<br/>• <strong>Long-term sequestration:</strong> Some fungal compounds (melanin, glomalin, chitin) wash into soil microaggregates where carbon can remain locked for millennia.<br/><br/>Without fungi, Earth would accumulate all fallen organic matter in massive undecomposed layers, carbon cycling would collapse, and forests would cease to function as carbon sinks.`
            },
            {
                title: "5. Global Fungal Mapping — The Next Scientific Frontier",
                icon: "🗺️",
                content: `Today’s fungal mapping involves:<br/>• Metabarcoding (ITS rDNA sequencing)<br/>• Airborne spore scanning<br/>• Deep-soil eDNA cores<br/>• Forest carbon flow models<br/>• Machine-learning predictions of mycelial pathways<br/>• Satellite-based canopy nutrient deficiency detection (indicating fungal activity below)<br/><br/>The global fungal atlas being assembled shows that mycelium is not merely a biological feature—it is the planetary scaffolding for life.<br/><br/>It is the quiet architect beneath forests, grasslands, tundras, even deserts.<br/>It is older than the oldest river deltas, older than the Himalayas, older than the continents in their present form.<br/>It is the first terrestrial civilization, still thriving, still expanding, still shaping Earth’s destiny.`
            }
        ]
    },
    fa: {
        title: "نقشه قارچی سیاره — شبکه‌ای کهن‌تر از جنگل‌ها (در اعماق زمان)",
        intro: "اگر زمین سیستم گردش خون داشت، قارچ‌ها قدیمی‌ترین و پیچیده‌ترین رگ‌های آن بودند. مدت‌ها قبل از رویش اولین درختان، مدت‌ها قبل از اینکه قاره‌ها شباهتی به امروز داشته باشند، حیات قارچی در خاک‌های اولیه تنیده شده بود. فسیل‌هایی مانند Ourasphaira giraldae قدمت قارچ‌ها را به حداقل ۱ میلیارد سال قبل می‌برند و آن‌ها را به یکی از قدیمی‌ترین موجودات پیچیده خشکی روی سیاره تبدیل می‌کنند.",
        sections: [
            {
                title: "۱. تمدنی در زیر پاهای ما",
                icon: "👣",
                content: `نقشه‌برداری مدرن قارچ‌شناسی چیزی حیرت‌انگیز را آشکار می‌کند: بزرگترین «نقشه» حیات روی زمین اصلاً روی سطح نیست—بلکه یک ابرساختار قارچی زیرزمینی است.<br/><br/>این ساختار شامل:<br/>• <strong>شبکه‌های میکوریزی</strong> که جنگل‌ها، دشت‌ها و تالاب‌ها را در بر می‌گیرند<br/>• <strong>تارهای ساپروتروفیک</strong> که چوب‌های کهن، استخوان و مواد آلی را تجزیه می‌کنند<br/>• <strong>میکرو-میسلیوم‌های اندوفیتیک</strong> که به آرامی در بافت‌های گیاهی زندگی می‌کنند<br/>• <strong>شبکه‌های بیماری‌زا</strong> که با هرس کردن میزبان‌های ضعیف، پویایی اکوسیستم را شکل می‌دهند<br/><br/>وقتی دانشمندان این شبکه‌ها را با استفاده از DNA محیطی، ردیابی ایزوتوپی و نقشه‌برداری خاک با کمک LIDAR ترسیم می‌کنند، چیزی تقریباً باورنکردنی می‌یابند: میسلیوم بزرگراه‌های زیرزمینی پیوسته‌ای را تشکیل می‌دهد که می‌توانند کیلومترها امتداد داشته باشند و ریشه‌های درختان، درختچه‌ها، علف‌ها و حتی کل مناطق جغرافیایی زیستی را به هم متصل کنند.<br/><br/>برخی جنگل‌ها در آمریکای شمالی تداوم میکوریزی را نشان می‌دهند که از مرزهای ایالتی عبور می‌کند. در اروپا، مطالعات ژنتیکی کلون‌های میسلیومی را آشکار می‌کنند که از مرزهای ملی عبور کرده و هزاران سال در خاک زنده مانده‌اند.`
            },
            {
                title: "۲. پادشاهی باستانی قارچ‌ها — پیش از برگ‌ها، پیش از گل‌ها",
                icon: "🦖",
                content: `از نظر تاریخی، قارچ‌ها کیمیاگران بزرگ زمین بوده‌اند. در دوره دوونین (۴۱۹–۳۵۹ میلیون سال پیش)، موجودات قارچی غول‌پیکر مانند پروتوتاکسایت‌ها که تا ۸ متر ارتفاع داشتند، بر مناظر خالی از مهره‌داران گیاهخوار مسلط بودند. این غول‌های اولیه عملاً اولین «مهندسان اکوسیستم» خشکی بودند.<br/><br/>کارکردهای آن‌ها شامل:<br/>• شکستن سنگ‌های بیجان به خاک اولیه غنی از مواد معدنی<br/>• بازیافت مولکول‌های آلی به مواد مغذی قابل استفاده<br/>• ایجاد اولین همزیستی‌های گیاه-قارچ (پیش‌سازهای میکوریزای مدرن)<br/><br/>این همکاری به گیاهان ابتدایی اجازه داد تا زمین را مستعمره کنند—قارچ‌ها به معنای واقعی کلمه سبز شدن زمین را هدایت کردند.`
            },
            {
                title: "۳. شبکه‌های میسلیوم زیرزمینی — یک ابرموجود جهانی",
                icon: "🌐",
                content: `جنگل‌های مدرن هنوز به شبکه‌های قارچی وابسته هستند که هم به عنوان زیرساخت و هم به عنوان سیستم‌های هوشمند عمل می‌کنند.<br/><br/><strong>تبادل میکوریزی: اینترنت بیولوژیکی</strong><br/>اقتصاد قارچ-گیاه توسط ترافیک مواد مغذی دوطرفه اداره می‌شود:<br/>• قارچ‌ها فسفات، نیتروژن، منیزیم، عناصر کمیاب و آب را مستقیماً به سلول‌های ریشه گیاه تحویل می‌دهند.<br/>• در عوض، گیاهان قندهای غنی از کربن و لیپیدها را به قارچ‌ها هدایت می‌کنند—ارزی که مایل‌ها گسترش میسلیوم را سوخت‌رسانی می‌کند.<br/><br/>این پویایی چنان ساختاریافته است که دانشمندان اغلب آن را شبکه گسترده چوبی (Wood Wide Web) می‌نامند، اما این استعاره به سختی مقیاس آن را نشان می‌دهد.<br/><br/><strong>فواصل تحت پوشش میسلیوم پیوسته</strong><br/>در اورگان، یک فرد آرمیلاریا اوستویا ۹.۶ کیلومتر مربع را پوشش می‌دهد که آن را به بزرگترین موجود روی زمین تبدیل می‌کند. شبکه‌های مشابهی در سیبری، اسکاندیناوی و جنگل‌های شمالی کانادا در چندین منطقه اکولوژیکی گسترش می‌یابند و گاهی مناطقی را که توسط رشته‌کوه‌ها یا رودخانه‌ها جدا شده‌اند، پل می‌زنند.<br/><br/>در برخی سیستم‌های میکوریزی استوایی، شرکای قارچی مشترک کل اکوسیستم‌های دره را به یک تعاونی ذخیره‌کننده کربن متصل می‌کنند.<br/><br/>این شبکه‌ها می‌توانند به طور موثر متصل کنند:<br/>• شهر به شهر (در راهروهای سبز شهری)<br/>• استان به استان (در سراسر کمربندهای جنگلی پیوسته)<br/>• کشور به کشور (به ویژه در مناطق شمالی و معتدل اوراسیا)<br/><br/>بنابراین نقشه قارچی زمین مجموعه‌ای از نقاط جداگانه نیست—بلکه یک زنجیره طولانی، باستانی و مهاجر از رشته‌های بیولوژیکی است.`
            },
            {
                title: "۴. شبکه میسلیوم به عنوان موتور کربن",
                icon: "♻️",
                content: `قارچ‌ها تنظیم‌کنندگان اصلی چرخه کربن جهانی هستند. نقش‌های آن‌ها عظیم است:<br/><br/>• <strong>تجزیه:</strong> قارچ‌های ساپروتروف لیگنین و سلولز—سخت‌ترین پلیمرهای گیاهی—را می‌شکنند و کربن ذخیره شده در چوب را آزاد می‌کنند.<br/>• <strong>تشکیل خاک:</strong> میسلیوم ذرات خاک را به هم متصل می‌کند و توده‌های پایداری ایجاد می‌کند که کربن را برای قرن‌ها ذخیره می‌کنند.<br/>• <strong>تجارت کربن:</strong> از طریق میکوریزا، قارچ‌ها کربن را بین درختان توزیع می‌کنند، گاهی اوقات کربن را از قوی‌ترین افراد به ضعیف‌ترین اختصاص می‌دهند و اکوسیستم‌ها را در برابر استرس آب و هوایی محافظت می‌کنند.<br/>• <strong>ذخیره‌سازی طولانی‌مدت:</strong> برخی ترکیبات قارچی (ملانین، گلومالین، کیتین) به ریزدانه‌های خاک شسته می‌شوند که در آنجا کربن می‌تواند برای هزاران سال محبوس بماند.<br/><br/>بدون قارچ‌ها، زمین تمام مواد آلی افتاده را در لایه‌های عظیم تجزیه نشده انباشته می‌کرد، چرخه کربن فرو می‌پاشید و جنگل‌ها دیگر به عنوان غرق‌کننده کربن عمل نمی‌کردند.`
            },
            {
                title: "۵. نقشه‌برداری جهانی قارچ — مرز علمی بعدی",
                icon: "🗺️",
                content: `امروزه نقشه‌برداری قارچ شامل:<br/>• متابارکدینگ (توالی‌یابی ITS rDNA)<br/>• اسکن هاگ‌های هوابرد<br/>• هسته‌های eDNA خاک عمیق<br/>• مدل‌های جریان کربن جنگل<br/>• پیش‌بینی‌های یادگیری ماشین از مسیرهای میسلیومی<br/>• تشخیص کمبود مواد مغذی تاج پوشش مبتنی بر ماهواره (نشان‌دهنده فعالیت قارچی در زیر)<br/><br/>اطلس جهانی قارچ که در حال گردآوری است نشان می‌دهد که میسلیوم صرفاً یک ویژگی بیولوژیکی نیست—بلکه داربست سیاره‌ای برای حیات است.<br/><br/>این معمار آرام در زیر جنگل‌ها، علفزارها، توندراها و حتی بیابان‌هاست.<br/>پیرتر از قدیمی‌ترین دلتاهای رودخانه، پیرتر از هیمالیا، پیرتر از قاره‌ها به شکل کنونی‌شان است.<br/>این اولین تمدن زمینی است که هنوز در حال شکوفایی، هنوز در حال گسترش و هنوز در حال شکل دادن به سرنوشت زمین است.`
            }
        ]
    },
    es: {
        title: "El Mapa Fúngico Planetario — Una Red de Tiempo Profundo Más Antigua que los Bosques",
        intro: "Si la Tierra tuviera un sistema circulatorio, los hongos serían sus vasos más antiguos e intrincados. Mucho antes de que se alzaran los primeros árboles, mucho antes de que los continentes se parecieran a algo familiar, la vida fúngica ya se tejía a través de suelos primitivos. Fósiles como Ourasphaira giraldae empujan el linaje fúngico al menos 1.000 millones de años atrás, convirtiendo a los hongos en uno de los organismos terrestres complejos más antiguos del planeta.",
        sections: [
            {
                title: "1. Una Civilización Bajo Nuestros Pies",
                icon: "👣",
                content: `El mapeo micológico moderno revela algo asombroso: el mayor "mapa" de vida en la Tierra no está sobre el suelo en absoluto, es una superestructura fúngica subterránea.<br/><br/>Esta estructura incluye:<br/>• <strong>Redes micorrízicas</strong> que abarcan bosques, sabanas y humedales<br/>• <strong>Redes saprótrofas</strong> que descomponen madera antigua, huesos y materia orgánica<br/>• <strong>Micromicelios endófitos</strong> que viven silenciosamente dentro de los tejidos vegetales<br/>• <strong>Redes patógenas</strong> que dan forma a la dinámica del ecosistema podando huéspedes débiles<br/><br/>Cuando los científicos cartografían estas redes utilizando ADN ambiental, rastreo isotópico y mapeo de suelos asistido por LIDAR, encuentran algo casi increíble: el micelio forma "autopistas" subterráneas continuas que pueden extenderse por kilómetros, uniendo raíces de árboles, arbustos, pastos e incluso regiones biogeográficas enteras.<br/><br/>Algunos bosques en América del Norte muestran continuidad micorrízica que se extiende a través de las fronteras estatales. En Europa, los estudios genéticos revelan clones miceliales que cruzan fronteras nacionales, sobreviviendo en el suelo durante miles de años.`
            },
            {
                title: "2. Antiguo Reino de los Hongos — Antes de las Hojas, Antes de las Flores",
                icon: "🦖",
                content: `Históricamente, los hongos han sido los grandes alquimistas de la Tierra. Durante el período Devónico (419–359 Ma), organismos fúngicos gigantes como Prototaxites, que se elevaban hasta 8 metros de altura, dominaban paisajes desprovistos de herbívoros vertebrados. Estos primeros gigantes fueron efectivamente los primeros "ingenieros de ecosistemas" terrestres.<br/><br/>Sus funciones incluían:<br/>• Descomponer roca inerte en protosuelo rico en minerales<br/>• Reciclar moléculas orgánicas en nutrientes utilizables<br/>• Establecer las primeras simbiosis planta-hongo (precursoras de las micorrizas modernas)<br/><br/>Esta colaboración permitió que las plantas primitivas colonizaran la tierra: los hongos guiaron literalmente el enverdecimiento de la Tierra.`
            },
            {
                title: "3. Redes Miceliales Subterráneas — Un Superorganismo Global",
                icon: "🌐",
                content: `Los bosques modernos todavía dependen de redes fúngicas que operan como sistemas tanto de infraestructura como de inteligencia.<br/><br/><strong>Intercambio micorrízico: el internet biológico</strong><br/>La economía hongos-plantas se rige por el tráfico bidireccional de nutrientes:<br/>• Los hongos entregan fosfato, nitrógeno, magnesio, oligoelementos y agua directamente a las células de las raíces de las plantas.<br/>• A cambio, las plantas canalizan azúcares y lípidos ricos en carbono a los hongos, una moneda que alimenta millas de expansión micelial.<br/><br/>Esta dinámica es tan estructurada que los científicos a menudo la llaman la Wood Wide Web, pero esta metáfora apenas captura su escala.<br/><br/><strong>Distancias abarcadas por micelio continuo</strong><br/>En Oregón, un solo individuo de Armillaria ostoyae cubre 9,6 kilómetros cuadrados, lo que lo convierte en el organismo más grande de la Tierra. Redes similares en Siberia, Escandinavia y los bosques boreales canadienses se extienden a través de múltiples zonas ecológicas, a veces uniendo regiones separadas por cadenas montañosas o ríos.<br/><br/>En algunos sistemas micorrízicos tropicales, los socios fúngicos compartidos conectan ecosistemas de valles enteros en una cooperativa secuestradora de carbono.<br/><br/>Estas redes pueden vincular efectivamente:<br/>• Ciudad con ciudad (en corredores verdes urbanos)<br/>• Provincia con provincia (a través de cinturones forestales continuos)<br/>• País con país (particularmente en zonas boreales y templadas de Eurasia)<br/><br/>El mapa fúngico de la Tierra no es, por lo tanto, un conjunto de puntos aislados, sino un continuo largo, antiguo y migratorio de hilos biológicos.`
            },
            {
                title: "4. La Red Micelial como Motor de Carbono",
                icon: "♻️",
                content: `Los hongos son los reguladores maestros del ciclo global del carbono. Sus roles son inmensos:<br/><br/>• <strong>Descomposición:</strong> Los hongos saprótrofos descomponen la lignina y la celulosa, los polímeros vegetales más resistentes, desbloqueando el carbono almacenado en la madera.<br/>• <strong>Formación de suelo:</strong> El micelio une las partículas del suelo, creando agregados estables que almacenan carbono durante siglos.<br/>• <strong>Comercio de carbono:</strong> A través de las micorrizas, los hongos redistribuyen el carbono entre los árboles, a veces asignando carbono de los individuos más fuertes a los más débiles, amortiguando los ecosistemas durante el estrés climático.<br/>• <strong>Secuestro a largo plazo:</strong> Algunos compuestos fúngicos (melanina, glomalina, quitina) se lavan en microagregados del suelo donde el carbono puede permanecer bloqueado durante milenios.<br/><br/>Sin hongos, la Tierra acumularía toda la materia orgánica caída en capas masivas no descompuestas, el ciclo del carbono colapsaría y los bosques dejarían de funcionar como sumideros de carbono.`
            },
            {
                title: "5. Mapeo Fúngico Global — La Próxima Frontera Científica",
                icon: "🗺️",
                content: `El mapeo fúngico de hoy implica:<br/>• Metabarcoding (secuenciación de ADNr ITS)<br/>• Escaneo de esporas en el aire<br/>• Núcleos de eDNA de suelo profundo<br/>• Modelos de flujo de carbono forestal<br/>• Predicciones de aprendizaje automático de vías miceliales<br/>• Detección de deficiencia de nutrientes del dosel basada en satélites (indicando actividad fúngica debajo)<br/><br/>El atlas fúngico global que se está ensamblando muestra que el micelio no es meramente una característica biológica: es el andamiaje planetario para la vida.<br/><br/>Es el arquitecto silencioso bajo bosques, pastizales, tundras e incluso desiertos.<br/>Es más antiguo que los deltas de ríos más antiguos, más antiguo que el Himalaya, más antiguo que los continentes en su forma actual.<br/>Es la primera civilización terrestre, aún prosperando, aún expandiéndose, aún dando forma al destino de la Tierra.`
            }
        ]
    }
};

const MYCELIUM_ARTICLE = {
    en: {
        mainTitle: "Mycelium Materials: The Future Grown from Fungi",
        subTitle: "Packaging, Leather, Textiles, Footwear, Accessories & Habitats (Earth & Beyond)",
        date: "20 November 2025",
        sections: [
            {
                title: "1. Abstract",
                content: "Imagine a world where materials are not mined or manufactured — but grown. Between 2020 and 2025, mycelium-based materials (MBMs) have leapt from small lab experiments to major global innovations. This review dives into how fungi are redefining our material landscape, from compostable packaging that rivals polystyrene to luxury “leathers” made from mushroom networks, and even regenerating habitats for space exploration funded by NASA. Leveraging peer-reviewed research, industrial breakthroughs, and visionary prototypes, we show that MBMs are not just “eco alternatives” — they represent a living, self-assembling material revolution. With built-in insulation, self-repair potential, low energy growth, and even radiation shielding, mycelium might just be the evolutionary material platform for humanity’s future — whether on Earth or Mars."
            },
            {
                title: "2. Introduction & Scope",
                content: "Did you know that a single fungal network can stretch for kilometers underground, quietly weaving its way through soil? That same principle — a branching web of hyphae — is now being harnessed to create next-generation materials. Mycelium grows by digesting plant waste, turning agro-residues into solid, durable structures with customizable strength, porosity, and insulating properties.<br/><br/>In just a decade, companies and labs have transformed mycelium from art installations into real-world solutions: packaging, sneakers, handbags, furniture panels, and even experimental buildings. Around the world, researchers and startups are racing to scale this living material. NASA, for instance, is investigating whether mycelium can build habitats on the Moon or Mars — using small fungal inocula and local waste as raw material. This study brings together the biology, engineering, business activity, environmental analyses, and scientific priorities that define the rise of mycelium-based materials."
            },
            {
                title: "3. Materials Science Fundamentals",
                content: "<strong>3.1 Biology → Material Transformation</strong><br/>Fungi are nature’s architects. Strains like Pleurotus, Ganoderma, and Trametes — plus engineered basidiomycetes — colonize plant-based waste such as hemp hurd, sawdust, or corn stover, weaving themselves into a tight, living fabric. Through control of oxygen, temperature, pH, and nutrients, researchers can fine-tune this fungal network’s density, stiffness, and porosity.<br/><br/>What’s truly magical is how mycelial cell walls, rich in chitin and glucans, behave like natural scaffolding — delivering strength and flexibility. After growth, scientists apply mild heat or gentle chemical treatments to “freeze” the material’s structure, impart water resistance, or boost longevity. The result? Biocomposites with compressive strengths close to soft woods, but grown from nothing more than agricultural leftovers.<br/><br/><strong>3.2 Processing Routes</strong><br/><em>Molded Myco-Composites:</em> Picture mixing fungal spores with shredded hemp or sawdust, packing that mix into a mold, and letting it grow into custom shapes. After incubation, the living network is deactivated by gentle heating, dried, and optionally finished. The end result: packaging pieces, insulation panels, or molded blocks — all compostable, all lightweight.<br/><em>Fine Mycelium Sheets:</em> In a more refined process, mycelium is coaxed to grow into flat, continuous sheets — like nature’s leather. These sheets can be tanned, dyed, or finished to become bags, upholstery, or even premium sneakers. Companies such as MycoWorks (Fine Mycelium™) and Bolt Threads (Mylo™) are pioneering this space, creating fungal leather that rivals animal hide in both texture and strength.<br/><em>Living Constructs / Hybrid Materials:</em> Imagine 3D-printed lattices or woven textile scaffolds seeded with mycelium. The fungus infiltrates these shapes, turning them into living, self-healing biocomposites. These hybrid constructs are already being tested in architectural prototypes, signaling the start of a new era in “grown architecture.”"
            },
            {
                title: "4. Global Innovators & Demonstrators",
                content: "<strong>4.1 Packaging</strong><br/>In the United States, Ecovative is leading the way with MycoComposite™ mushroom packaging. Their products are replacing traditional foam in shipping, insulation, and protective packaging — but with a twist: when discarded, they break down faster than fruit peels.<br/><br/><strong>4.2 Mycelium Leather & Fashion</strong><br/>Luxury meets fungi: MycoWorks’ Fine Mycelium leather has found its way into designer handbags, while Bolt Threads’ Mylo™ technology combines fungal networks with cellulose to create high-performance, planet-friendly leather. Fashion powerhouses like Hermès, Stella McCartney, and Adidas are joining the wave, proving that style and sustainability can grow hand in hand.<br/><br/><strong>4.3 Architecture & Construction</strong><br/>Back in 2014, the Hy-Fi Pavilion (The Living / MoMA PS1) captured imaginations: blocks of pure fungi formed a full-scale, sculptural installation. Today, the vision has expanded — research labs and NASA’s Mycotecture initiative are studying whether we can grow our buildings. Picture lunar or Martian habitats constructed from fungus: optimized for low mass, high insulation, and even radiation shielding using regolith-fungal composites.<br/><br/><strong>4.4 Market Momentum</strong><br/>The global demand for MBMs is surging. Packaging and mycelium leather are at the forefront, with multi-million-dollar market forecasts for the early 2030s. Yet, scaling remains complex: regulatory harmonization, quality consistency, and feedstock logistics are all bottlenecks that innovators around the world are working to overcome."
            },
            {
                title: "5. Application-Level Insights",
                content: "<strong>5.1 Packaging</strong><br/>Mycelium packaging isn’t just green — it’s a high-performance contender. It absorbs shock as well as petroleum-based foam, but unlike those plastics, it can safely decompose in home compost. However, in very humid regions (think tropical South America or Southeast Asia), moisture sensitivity is a challenge — a problem companies are racing to solve with smart coatings and process tweaks.<br/><br/><strong>5.2 Leather, Textiles & Footwear</strong><br/>Fine mycelium leather is rewriting the playbook for luxury goods. It offers exceptional uniformity, tunable grain, and remarkable tensile strength. But true sustainability demands more: some early products rely on polymer-based coatings (like PU), which compromise biodegradability. Fully organic mycelium finishes are emerging — a critical frontier for future innovation.<br/><br/><strong>5.3 Building Materials & Habitats</strong><br/>Mycelium bricks boast insulation qualities comparable to mineral wool. They are feather-light yet sturdy, and can be locally grown from agricultural residues — eliminating heavy transport. For NASA’s ambitions, a 2-kg pack of fungal inoculum could theoretically expand into several cubic meters of habitat material, dramatically reducing payloads. Still, challenges remain: the material must resist moisture, fire, and long-term degradation — especially if it will live on Mars."
            },
            {
                title: "6. Environmental & Life-Cycle Dimensions",
                content: "<strong>6.1 Carbon Footprint</strong><br/>Growing mycelium is a low-carbon marvel: it happens at room temperature, with minimal energy input, and sequesters carbon into fungal biomass. By comparison, manufacturing traditional foams or tanning leather often requires massive heat and chemical energy. Life-cycle analyses show that MBMs can dramatically reduce CO₂ emissions — but the exact benefit depends heavily on drying methods and finishing chemistry.<br/><br/><strong>6.2 End-of-Life Advantages</strong><br/>When left alone, completely uncoated mycelium simply returns to the earth: compostable, soil-nourishing, and biodegradable. But if you coat it with synthetic polymers, its decomposition slows. That’s why scientists are racing to develop bio-based water-resistant finishes — coatings that protect the material during use but still leave no toxic legacy once it’s discarded."
            },
            {
                title: "7. Key Scientific Challenges & Research Priorities",
                content: "<strong>Scaling production:</strong> How do we speed up growth cycles? Can vertical bioreactors produce mycelium at industrial scales?<br/><strong>Standards and safety:</strong> We need global benchmarks (ASTM/ISO) for mechanical strength, fire resistance, moisture behavior, and long-term durability.<br/><strong>Durability without synthetics:</strong> The holy grail is a finish that resists moisture and abrasion — but is still entirely bio-based.<br/><strong>Fungal engineering:</strong> Advanced strains with higher chitin, melanin, or self-repair ability could unlock greater strength, longevity, or radiation shielding.<br/><strong>Space readiness:</strong> Can we grow mycelium–regolith composites on the Moon or Mars that survive radiation, vacuum, and extreme temperature swings? Closed-loop fungal recycling could be central to future off-world habitats."
            },
            {
                title: "8. Fascinating Case Studies",
                content: "<strong>Hy-Fi Pavilion (2014, NYC):</strong> A bold, sculptural installation made entirely of molded mycelium bricks — proof that fungus can be architectural. It also revealed early problems: water damage and weather-related wear.<br/><strong>Ecovative Packaging (2010s–2025):</strong> From small R&D to large-scale industrial distribution, Ecovative has shown that mushroom packaging can truly replace harmful foams.<br/><strong>MycoWorks & Bolt Threads (2020–2025):</strong> These companies took mycelium leather from the realm of concept to real luxury products, convincing major fashion brands to go fungal.<br/><strong>NASA Mycotecture:</strong> Ongoing lab work funded by NASA explores how fungi could build and shield habitats on Mars — a fusion of biology, engineering, and space science like nothing on Earth."
            },
            {
                title: "9. Socioeconomic Impact & Adoption Pathways",
                content: "Did you ever imagine that mushrooms could power rural economies? Mycelium production thrives on agricultural waste — meaning farmers in India, Brazil, or Eastern Europe could become material manufacturers. This model reduces transport emissions, strengthens local economies, and creates green jobs.<br/><br/>But scaling globally requires more than biology. We need building codes that recognize fungal materials, public education to dispel “fungus fears,” and internationally recognized certifications (like OEKO-TEX or LWG) so consumers and regulators trust these new bio-materials."
            },
            {
                title: "10. The Future: Why Mycelium Might Be Humanity’s Greatest Material Leap",
                content: "Mycelium is more than just a clever sustainability hack. It’s a paradigm shift: from extraction-based production to regenerative, living material systems.<br/>Instead of mining, we grow.<br/>Instead of energy-hungry factories, we use low-energy bioprocesses.<br/>Instead of perpetual waste, we compost.<br/>Instead of rigid, non-renewable materials, we use self-assembling, self-repairing living structures.<br/><br/>In the decade to come, we will likely see mycelium dominate:<br/>Packaging, replacing polluting foams;<br/>Luxury fashion & footwear, offering elegant, cruelty-free alternatives;<br/>Architectural interiors, insulation, and acoustic panels;<br/>Long-term: self-healing structural biomaterials and even space-grown habitats.<br/><br/>NASA’s investments aren’t just experimental — they point to a future where humans live not on concrete and steel, but in homes grown from fungus. That might sound like science fiction, but with mycelium, science fiction is becoming science fact."
            }
        ]
    },
    fa: {
        mainTitle: "مواد میسلیوم: آینده‌ای که از قارچ‌ها رشد می‌کند",
        subTitle: "بسته‌بندی، چرم، منسوجات، کفش، لوازم جانبی و زیستگاه‌ها (زمین و فراتر از آن)",
        date: "۲۰ نوامبر ۲۰۲۵",
        sections: [
            {
                title: "۱. چکیده",
                content: "دنیایی را تصور کنید که در آن مواد استخراج یا ساخته نمی‌شوند — بلکه رشد می‌کنند. بین سال‌های ۲۰۲۰ تا ۲۰۲۵، مواد مبتنی بر میسلیوم (MBMs) از آزمایش‌های کوچک آزمایشگاهی به نوآوری‌های بزرگ جهانی جهش کرده‌اند. این بررسی نشان می‌دهد که چگونه قارچ‌ها چشم‌انداز مادی ما را بازتعریف می‌کنند، از بسته‌بندی‌های کمپوست‌پذیر که با پلی‌استایرن رقابت می‌کنند تا «چرم‌های» لوکس ساخته شده از شبکه‌های قارچی، و حتی زیستگاه‌های احیاکننده برای اکتشافات فضایی با بودجه ناسا. با بهره‌گیری از تحقیقات همتا-بررسی شده، پیشرفت‌های صنعتی و نمونه‌های اولیه رویایی، ما نشان می‌دهیم که MBMها فقط «جایگزین‌های بوم‌شناختی» نیستند — آن‌ها نمایانگر یک انقلاب مادی زنده و خود-مونیتاژ هستند. با عایق داخلی، پتانسیل خود-ترمیم، رشد با انرژی کم و حتی محافظت در برابر تشعشع، میسلیوم ممکن است پلتفرم مادی تکاملی برای آینده بشریت باشد — چه در زمین و چه در مریخ."
            },
            {
                title: "۲. مقدمه و دامنه",
                content: "آیا می‌دانستید که یک شبکه قارچی واحد می‌تواند کیلومترها در زیر زمین امتداد یابد و بی سروصدا راه خود را در خاک ببافد؟ همان اصل — شبکه شاخه‌ای از هیف‌ها — اکنون برای ایجاد مواد نسل بعدی مهار می‌شود. میسلیوم با هضم ضایعات گیاهی رشد می‌کند و بقایای کشاورزی را به ساختارهای جامد و بادوام با استحکام، تخلخل و خواص عایق قابل تنظیم تبدیل می‌کند.<br/><br/>تنها در یک دهه، شرکت‌ها و آزمایشگاه‌ها میسلیوم را از چیدمان‌های هنری به راه‌حل‌های دنیای واقعی تبدیل کرده‌اند: بسته‌بندی، کفش‌های ورزشی، کیف‌های دستی، پنل‌های مبلمان و حتی ساختمان‌های آزمایشی. در سراسر جهان، محققان و استارتاپ‌ها در حال مسابقه برای مقیاس‌بندی این ماده زنده هستند. به عنوان مثال، ناسا در حال بررسی است که آیا میسلیوم می‌تواند زیستگاه‌هایی را در ماه یا مریخ بسازد — با استفاده از مایه‌های قارچی کوچک و ضایعات محلی به عنوان ماده اولیه. این مطالعه زیست‌شناسی، مهندسی، فعالیت تجاری، تحلیل‌های زیست‌محیطی و اولویت‌های علمی را که ظهور مواد مبتنی بر میسلیوم را تعریف می‌کنند، گرد هم می‌آورد."
            },
            {
                title: "۳. مبانی علم مواد",
                content: "<strong>۳.۱ زیست‌شناسی ← تبدیل ماده</strong><br/>قارچ‌ها معماران طبیعت هستند. سویه‌هایی مانند پلوروتوس، گانودرما و ترامتس — به علاوه بازیدیومیست‌های مهندسی شده — ضایعات گیاهی مانند خرده‌های شاهدانه، خاک‌اره یا ساقه ذرت را کلونیزه می‌کنند و خود را در یک پارچه زنده و محکم می‌بافند. از طریق کنترل اکسیژن، دما، pH و مواد مغذی، محققان می‌توانند تراکم، سختی و تخلخل این شبکه قارچی را تنظیم کنند.<br/><br/>آنچه واقعاً جادویی است این است که چگونه دیواره‌های سلولی میسلیوم، غنی از کیتین و گلوکان، مانند داربست طبیعی عمل می‌کنند — و استحکام و انعطاف‌پذیری را ارائه می‌دهند. پس از رشد، دانشمندان حرارت ملایم یا تیمارهای شیمیایی ملایم را اعمال می‌کنند تا ساختار ماده را «منجمد» کنند، مقاومت در برابر آب را ایجاد کنند یا طول عمر را افزایش دهند. نتیجه؟ بیوکمپوزیت‌هایی با مقاومت فشاری نزدیک به چوب‌های نرم، اما رشد یافته از چیزی جز بقایای کشاورزی.<br/><br/><strong>۳.۲ مسیرهای پردازش</strong><br/><em>بیوکمپوزیت‌های قالبی:</em> تصور کنید هاگ‌های قارچ را با شاهدانه خرد شده یا خاک‌اره مخلوط کنید، آن مخلوط را در یک قالب بسته‌بندی کنید و بگذارید به اشکال سفارشی رشد کند. پس از انکوباسیون، شبکه زنده با حرارت ملایم غیرفعال می‌شود، خشک می‌شود و به صورت اختیاری پرداخت می‌شود. نتیجه نهایی: قطعات بسته‌بندی، پنل‌های عایق یا بلوک‌های قالبی — همه کمپوست‌‌پذیر، همه سبک.<br/><em>ورق‌های میسلیوم ظریف:</em> در یک فرآیند تصفیه شده‌تر، میسلیوم تشویق می‌شود تا به صورت ورق‌های تخت و پیوسته رشد کند — مانند چرم طبیعت. این ورق‌ها می‌توانند دباغی، رنگرزی یا پرداخت شوند تا به کیف، روکش مبلمان یا حتی کفش‌های ورزشی ممتاز تبدیل شوند. شرکت‌هایی مانند MycoWorks (Fine Mycelium™) و Bolt Threads (Mylo™) در این فضا پیشگام هستند و چرم قارچی ایجاد می‌کنند که از نظر بافت و استحکام با پوست حیوانات رقابت می‌کند.<br/><em>سازه‌های زنده / مواد هیبریدی:</em> شبکه‌های پرینت سه‌بعدی یا داربست‌های نساجی بافته شده را تصور کنید که با میسلیوم کاشته شده‌اند. قارچ به این اشکال نفوذ می‌کند و آن‌ها را به بیوکمپوزیت‌های زنده و خود-ترمیم تبدیل می‌کند. این سازه‌های هیبریدی در حال حاضر در نمونه‌های اولیه معماری آزمایش می‌شوند که نشان‌دهنده آغاز عصر جدیدی در «معماری رشد یافته» است."
            },
            {
                title: "۴. نوآوران و نمایش‌دهندگان جهانی",
                content: "<strong>۴.۱ بسته‌بندی</strong><br/>در ایالات متحده، Ecovative با بسته‌بندی قارچی MycoComposite™ پیشتاز است. محصولات آن‌ها جایگزین فوم‌های سنتی در حمل و نقل، عایق‌بندی و بسته‌بندی محافظ می‌شوند — اما با یک تفاوت: وقتی دور ریخته می‌شوند، سریع‌تر از پوست میوه تجزیه می‌شوند.<br/><br/><strong>۴.۲ چرم و مد میسلیوم</strong><br/>لوکس با قارچ ملاقات می‌کند: چرم Fine Mycelium شرکت MycoWorks راه خود را به کیف‌های دستی طراحان باز کرده است، در حالی که فناوری Mylo™ شرکت Bolt Threads شبکه‌های قارچی را با سلولز ترکیب می‌کند تا چرم با عملکرد بالا و دوستدار سیاره ایجاد کند. غول‌های مد مانند هرمس، استلا مک‌کارتنی و آدیداس به این موج می‌پیوندند و ثابت می‌کنند که سبک و پایداری می‌توانند دست در دست هم رشد کنند.<br/><br/><strong>۴.۳ معماری و ساخت و ساز</strong><br/>در سال ۲۰۱۴، پاویون Hy-Fi (The Living / MoMA PS1) تخیلات را تسخیر کرد: بلوک‌هایی از قارچ خالص یک چیدمان مجسمه‌سازی در مقیاس کامل را تشکیل دادند. امروزه، چشم‌انداز گسترش یافته است — آزمایشگاه‌های تحقیقاتی و ابتکار Mycotecture ناسا در حال مطالعه هستند که آیا می‌توانیم ساختمان‌های خود را رشد دهیم. زیستگاه‌های ماه یا مریخ ساخته شده از قارچ را تصور کنید: بهینه شده برای جرم کم، عایق بالا و حتی محافظت در برابر تشعشع با استفاده از کامپوزیت‌های رگولیت-قارچ.<br/><br/><strong>۴.۴ شتاب بازار</strong><br/>تقاضای جهانی برای MBMها در حال افزایش است. بسته‌بندی و چرم میسلیوم در خط مقدم هستند، با پیش‌بینی‌های بازار چند میلیون دلاری برای اوایل دهه ۲۰۳۰. با این حال، مقیاس‌بندی پیچیده باقی مانده است: هماهنگی نظارتی، ثبات کیفیت و لجستیک مواد اولیه گلوگاه‌هایی هستند که نوآوران در سراسر جهان برای غلبه بر آن‌ها تلاش می‌کنند."
            },
            {
                title: "۵. بینش‌های سطح کاربرد",
                content: "<strong>۵.۱ بسته‌بندی</strong><br/>بسته‌بندی میسلیوم فقط سبز نیست — یک رقیب با عملکرد بالا است. ضربه را به خوبی فوم‌های نفتی جذب می‌کند، اما برخلاف آن پلاستیک‌ها، می‌تواند با خیال راحت در کمپوست خانگی تجزیه شود. با این حال، در مناطق بسیار مرطوب (مانند آمریکای جنوبی استوایی یا آسیای جنوب شرقی)، حساسیت به رطوبت یک چالش است — مشکلی که شرکت‌ها با پوشش‌های هوشمند و تغییرات فرآیند برای حل آن مسابقه می‌دهند.<br/><br/><strong>۵.۲ چرم، منسوجات و کفش</strong><br/>چرم میسلیوم ظریف در حال بازنویسی کتاب بازی برای کالاهای لوکس است. یکنواختی استثنایی، دانه قابل تنظیم و مقاومت کششی قابل توجهی را ارائه می‌دهد. اما پایداری واقعی نیاز به چیزهای بیشتری دارد: برخی از محصولات اولیه به پوشش‌های پلیمری (مانند PU) متکی هستند که زیست‌تخریب‌پذیری را به خطر می‌اندازد. پرداخت‌های میسلیوم کاملاً ارگانیک در حال ظهور هستند — مرز بحرانی برای نوآوری آینده.<br/><br/><strong>۵.۳ مواد ساختمانی و زیستگاه‌ها</strong><br/>آجرهای میسلیوم دارای کیفیت عایقی قابل مقایسه با پشم معدنی هستند. آن‌ها پرمانند سبک اما محکم هستند و می‌توانند به صورت محلی از بقایای کشاورزی رشد کنند — حذف حمل و نقل سنگین. برای جاه‌طلبی‌های ناسا، یک بسته ۲ کیلوگرمی مایه قارچی می‌تواند از نظر تئوری به چندین متر مکعب ماده زیستگاه گسترش یابد و محموله‌ها را به شدت کاهش دهد. با این حال، چالش‌ها باقی مانده‌اند: مواد باید در برابر رطوبت، آتش و تخریب طولانی‌مدت مقاومت کنند — به ویژه اگر قرار است در مریخ زندگی کنند."
            },
            {
                title: "۶. ابعاد زیست‌محیطی و چرخه عمر",
                content: "<strong>۶.۱ ردپای کربن</strong><br/>رشد میسلیوم یک معجزه کم‌کربن است: در دمای اتاق، با حداقل انرژی ورودی اتفاق می‌افتد و کربن را در زیست‌توده قارچی ذخیره می‌کند. در مقایسه، تولید فوم‌های سنتی یا دباغی چرم اغلب به حرارت و انرژی شیمیایی عظیم نیاز دارد. تحلیل‌های چرخه عمر نشان می‌دهد که MBMها می‌توانند انتشار CO₂ را به شدت کاهش دهند — اما مزیت دقیق به شدت به روش‌های خشک‌کردن و شیمی پرداخت بستگی دارد.<br/><br/><strong>۶.۲ مزایای پایان عمر</strong><br/>هنگامی که به حال خود رها شود، میسلیوم کاملاً بدون پوشش به سادگی به زمین باز می‌گردد: کمپوست‌‌پذیر، تغذیه‌کننده خاک و زیست‌تخریب‌پذیر. اما اگر آن را با پلیمرهای مصنوعی بپوشانید، تجزیه آن کند می‌شود. به همین دلیل است که دانشمندان برای توسعه پرداخت‌های مقاوم در برابر آب زیستی مسابقه می‌دهند — پوشش‌هایی که از مواد در حین استفاده محافظت می‌کنند اما پس از دور ریختن میراث سمی باقی نمی‌گذارند."
            },
            {
                title: "۷. چالش‌های علمی کلیدی و اولویت‌های تحقیقاتی",
                content: "<strong>مقیاس‌بندی تولید:</strong> چگونه چرخه‌های رشد را سرعت بخشیم؟ آیا بیوراکتورهای عمودی می‌توانند میسلیوم را در مقیاس‌های صنعتی تولید کنند؟<br/><strong>استانداردها و ایمنی:</strong> ما به معیارهای جهانی (ASTM/ISO) برای مقاومت مکانیکی، مقاومت در برابر آتش، رفتار رطوبتی و دوام طولانی‌مدت نیاز داریم.<br/><strong>دوام بدون مواد مصنوعی:</strong> جام مقدس پرداختی است که در برابر رطوبت و سایش مقاومت کند — اما همچنان کاملاً زیستی باشد.<br/><strong>مهندسی قارچی:</strong> سویه‌های پیشرفته با کیتین، ملانین یا توانایی خود-ترمیم بالاتر می‌توانند استحکام، طول عمر یا محافظت در برابر تشعشع بیشتری را باز کنند.<br/><strong>آمادگی فضایی:</strong> آیا می‌توانیم کامپوزیت‌های میسلیوم-رگولیت را در ماه یا مریخ رشد دهیم که در برابر تشعشع، خلاء و نوسانات شدید دما زنده بمانند؟ بازیافت قارچی حلقه بسته می‌تواند مرکزی برای زیستگاه‌های فرازمینی آینده باشد."
            },
            {
                title: "۸. مطالعات موردی جذاب",
                content: "<strong>پاویون Hy-Fi (۲۰۱۴، نیویورک):</strong> یک چیدمان مجسمه‌سازی جسورانه که کاملاً از آجرهای میسلیوم قالبی ساخته شده بود — اثباتی بر اینکه قارچ می‌تواند معماری باشد. همچنین مشکلات اولیه را آشکار کرد: آسیب آب و فرسایش ناشی از آب و هوا.<br/><strong>بسته‌بندی Ecovative (دهه ۲۰۱۰–۲۰۲۵):</strong> از تحقیق و توسعه کوچک تا توزیع صنعتی در مقیاس بزرگ، Ecovative نشان داده است که بسته‌بندی قارچی می‌تواند واقعاً جایگزین فوم‌های مضر شود.<br/><strong>MycoWorks و Bolt Threads (۲۰۲۰–۲۰۲۵):</strong> این شرکت‌ها چرم میسلیوم را از قلمرو مفهوم به محصولات لوکس واقعی بردند و برندهای بزرگ مد را متقاعد کردند که قارچی شوند.<br/><strong>Mycotecture ناسا:</strong> کار آزمایشگاهی مداوم با بودجه ناسا چگونگی ساخت و محافظت از زیستگاه‌ها در مریخ توسط قارچ‌ها را بررسی می‌کند — تلفیقی از زیست‌شناسی، مهندسی و علم فضایی که شبیه هیچ چیز روی زمین نیست."
            },
            {
                title: "۹. تأثیر اجتماعی-اقتصادی و مسیرهای پذیرش",
                content: "آیا تا به حال تصور می‌کردید که قارچ‌ها بتوانند اقتصادهای روستایی را تقویت کنند؟ تولید میسلیوم بر ضایعات کشاورزی رشد می‌کند — به این معنی که کشاورزان در هند، برزیل یا اروپای شرقی می‌توانند تولیدکننده مواد شوند. این مدل انتشار حمل و نقل را کاهش می‌دهد، اقتصادهای محلی را تقویت می‌کند و مشاغل سبز ایجاد می‌کند.<br/><br/>اما مقیاس‌بندی جهانی به چیزی بیش از زیست‌شناسی نیاز دارد. ما به قوانین ساختمانی که مواد قارچی را به رسمیت می‌شناسند، آموزش عمومی برای از بین بردن «ترس‌های قارچی» و گواهینامه‌های بین‌المللی شناخته شده (مانند OEKO-TEX یا LWG) نیاز داریم تا مصرف‌کنندگان و قانون‌گذاران به این مواد زیستی جدید اعتماد کنند."
            },
            {
                title: "۱۰. آینده: چرا میسلیوم ممکن است بزرگترین جهش مادی بشریت باشد",
                content: "میسلیوم چیزی بیش از یک ترفند پایداری هوشمندانه است. این یک تغییر پارادایم است: از تولید مبتنی بر استخراج به سیستم‌های مادی زنده و بازتولیدکننده.<br/>به جای معدن‌کاوی، ما رشد می‌دهیم.<br/>به جای کارخانه‌های انرژی‌بر، ما از فرآیندهای زیستی کم‌انرژی استفاده می‌کنیم.<br/>به جای زباله دائمی، ما کمپوست می‌کنیم.<br/>به جای مواد سخت و تجدیدناپذیر، ما از ساختارهای زنده خود-مونتاژ و خود-ترمیم استفاده می‌کنیم.<br/><br/>در دهه آینده، احتمالاً شاهد تسلط میسلیوم خواهیم بود بر:<br/>بسته‌بندی، جایگزینی فوم‌های آلاینده؛<br/>مد و کفش لوکس، ارائه جایگزین‌های ظریف و بدون خشونت؛<br/>فضای داخلی معماری، عایق‌بندی و پنل‌های آکوستیک؛<br/>طولانی‌مدت: مواد زیستی ساختاری خود-ترمیم و حتی زیستگاه‌های رشد یافته در فضا.<br/><br/>سرمایه‌گذاری‌های ناسا فقط آزمایشی نیستند — آن‌ها به آینده‌ای اشاره می‌کنند که در آن انسان‌ها نه بر روی بتن و فولاد، بلکه در خانه‌های رشد یافته از قارچ زندگی می‌کنند. این ممکن است شبیه علمی‌تخیلی به نظر برسد، اما با میسلیوم، علمی‌تخیلی در حال تبدیل شدن به واقعیت علمی است."
            }
        ]
    },
    es: {
        mainTitle: "Materiales de Micelio: El Futuro Cultivado a partir de Hongos",
        subTitle: "Embalaje, Cuero, Textiles, Calzado, Accesorios y Hábitats (Tierra y Más Allá)",
        date: "20 de Noviembre de 2025",
        sections: [
            {
                title: "1. Resumen",
                content: "Imagine un mundo donde los materiales no se extraen ni se fabrican, sino que se cultivan. Entre 2020 y 2025, los materiales basados en micelio (MBM) han pasado de pequeños experimentos de laboratorio a grandes innovaciones globales. Esta revisión profundiza en cómo los hongos están redefiniendo nuestro paisaje material, desde envases compostables que rivalizan con el poliestireno hasta \"cueros\" de lujo hechos de redes de hongos, e incluso hábitats regenerativos para la exploración espacial financiados por la NASA. Aprovechando la investigación revisada por pares, los avances industriales y prototipos visionarios, mostramos que los MBM no son solo \"alternativas ecológicas\": representan una revolución material viva y autoensamblable. Con aislamiento incorporado, potencial de autorreparación, crecimiento de baja energía e incluso protección contra la radiación, el micelio podría ser la plataforma material evolutiva para el futuro de la humanidad, ya sea en la Tierra o en Marte."
            },
            {
                title: "2. Introducción y Alcance",
                content: "¿Sabía que una sola red de hongos puede extenderse por kilómetros bajo tierra, tejiendo silenciosamente su camino a través del suelo? Ese mismo principio, una red ramificada de hifas, se está aprovechando ahora para crear materiales de próxima generación. El micelio crece digiriendo desechos vegetales, convirtiendo residuos agrícolas en estructuras sólidas y duraderas con resistencia, porosidad y propiedades aislantes personalizables.<br/><br/>En solo una década, empresas y laboratorios han transformado el micelio de instalaciones artísticas a soluciones del mundo real: embalajes, zapatillas, bolsos, paneles de muebles e incluso edificios experimentales. En todo el mundo, investigadores y nuevas empresas compiten para escalar este material vivo. La NASA, por ejemplo, está investigando si el micelio puede construir hábitats en la Luna o Marte, utilizando pequeños inóculos de hongos y desechos locales como materia prima. Este estudio reúne la biología, la ingeniería, la actividad empresarial, los análisis ambientales y las prioridades científicas que definen el auge de los materiales basados en micelio."
            },
            {
                title: "3. Fundamentos de la Ciencia de Materiales",
                content: "<strong>3.1 Biología → Transformación de Materiales</strong><br/>Los hongos son los arquitectos de la naturaleza. Cepas como Pleurotus, Ganoderma y Trametes — además de basidiomicetos diseñados — colonizan desechos vegetales como cáñamo, aserrín o rastrojo de maíz, tejiéndose en un tejido vivo y apretado. A través del control del oxígeno, la temperatura, el pH y los nutrientes, los investigadores pueden ajustar la densidad, rigidez y porosidad de esta red fúngica.<br/><br/>Lo que es realmente mágico es cómo las paredes celulares miceliales, ricas en quitina y glucanos, actúan como andamiaje natural, entregando fuerza y flexibilidad. Después del crecimiento, los científicos aplican calor suave o tratamientos químicos suaves para \"congelar\" la estructura del material, impartir resistencia al agua o aumentar la longevidad. ¿El resultado? Biocompuestos con resistencias a la compresión cercanas a las maderas blandas, pero cultivados a partir de nada más que sobras agrícolas.<br/><br/><strong>3.2 Rutas de Procesamiento</strong><br/><em>Biocompuestos Moldeados:</em> Imagine mezclar esporas de hongos con cáñamo triturado o aserrín, empaquetar esa mezcla en un molde y dejar que crezca en formas personalizadas. Después de la incubación, la red viva se desactiva mediante un calentamiento suave, se seca y opcionalmente se termina. El resultado final: piezas de embalaje, paneles de aislamiento o bloques moldeados, todo compostable, todo ligero.<br/><em>Láminas de Micelio Fino:</em> En un proceso más refinado, se persuade al micelio para que crezca en láminas planas y continuas, como el cuero de la naturaleza. Estas láminas se pueden curtir, teñir o terminar para convertirse en bolsos, tapicería o incluso zapatillas de primera calidad. Empresas como MycoWorks (Fine Mycelium™) y Bolt Threads (Mylo™) son pioneras en este espacio, creando cuero fúngico que rivaliza con la piel animal tanto en textura como en resistencia.<br/><em>Construcciones Vivas / Materiales Híbridos:</em> Imagine celosías impresas en 3D o andamios textiles tejidos sembrados con micelio. El hongo se infiltra en estas formas, convirtiéndolas en biocompuestos vivos y autorreparables. Estas construcciones híbridas ya se están probando en prototipos arquitectónicos, señalando el comienzo de una nueva era en la \"arquitectura cultivada\"."
            },
            {
                title: "4. Innovadores y Demostradores Globales",
                content: "<strong>4.1 Embalaje</strong><br/>En los Estados Unidos, Ecovative lidera el camino con el embalaje de hongos MycoComposite™. Sus productos están reemplazando la espuma tradicional en el envío, aislamiento y embalaje protector, pero con un giro: cuando se desechan, se descomponen más rápido que las cáscaras de fruta.<br/><br/><strong>4.2 Cuero y Moda de Micelio</strong><br/>El lujo se encuentra con los hongos: el cuero Fine Mycelium de MycoWorks ha encontrado su camino en bolsos de diseñador, mientras que la tecnología Mylo™ de Bolt Threads combina redes fúngicas con celulosa para crear cuero de alto rendimiento y respetuoso con el planeta. Potencias de la moda como Hermès, Stella McCartney y Adidas se están uniendo a la ola, demostrando que el estilo y la sostenibilidad pueden crecer de la mano.<br/><br/><strong>4.3 Arquitectura y Construcción</strong><br/>Ya en 2014, el Pabellón Hy-Fi (The Living / MoMA PS1) capturó la imaginación: bloques de hongos puros formaron una instalación escultórica a gran escala. Hoy, la visión se ha expandido: los laboratorios de investigación y la iniciativa Mycotecture de la NASA están estudiando si podemos cultivar nuestros edificios. Imagine hábitats lunares o marcianos construidos a partir de hongos: optimizados para baja masa, alto aislamiento e incluso protección contra la radiación utilizando compuestos de regolito y hongos.<br/><br/><strong>4.4 Impulso del Mercado</strong><br/>La demanda global de MBMs está aumentando. El embalaje y el cuero de micelio están a la vanguardia, con pronósticos de mercado multimillonarios para principios de la década de 2030. Sin embargo, el escalado sigue siendo complejo: la armonización regulatoria, la consistencia de la calidad y la logística de materias primas son cuellos de botella que los innovadores de todo el mundo están trabajando para superar."
            },
            {
                title: "5. Perspectivas a Nivel de Aplicación",
                content: "<strong>5.1 Embalaje</strong><br/>El embalaje de micelio no es solo ecológico, es un competidor de alto rendimiento. Absorbe el impacto tan bien como la espuma a base de petróleo, pero a diferencia de esos plásticos, puede descomponerse de manera segura en el compost doméstico. Sin embargo, en regiones muy húmedas (piense en América del Sur tropical o el sudeste asiático), la sensibilidad a la humedad es un desafío, un problema que las empresas compiten por resolver con recubrimientos inteligentes y ajustes de proceso.<br/><br/><strong>5.2 Cuero, Textiles y Calzado</strong><br/>El cuero de micelio fino está reescribiendo el libro de jugadas para los artículos de lujo. Ofrece una uniformidad excepcional, grano ajustable y una resistencia a la tracción notable. Pero la verdadera sostenibilidad exige más: algunos productos tempranos dependen de recubrimientos a base de polímeros (como PU), que comprometen la biodegradabilidad. Están surgiendo acabados de micelio totalmente orgánicos, una frontera crítica para la innovación futura.<br/><br/><strong>5.3 Materiales de Construcción y Hábitats</strong><br/>Los ladrillos de micelio cuentan con cualidades de aislamiento comparables a la lana mineral. Son ligeros como una pluma pero resistentes, y se pueden cultivar localmente a partir de residuos agrícolas, eliminando el transporte pesado. Para las ambiciones de la NASA, un paquete de 2 kg de inóculo fúngico podría expandirse teóricamente en varios metros cúbicos de material de hábitat, reduciendo drásticamente las cargas útiles. Aún así, quedan desafíos: el material debe resistir la humedad, el fuego y la degradación a largo plazo, especialmente si va a vivir en Marte."
            },
            {
                title: "6. Dimensiones Ambientales y de Ciclo de Vida",
                content: "<strong>6.1 Huella de Carbono</strong><br/>Cultivar micelio es una maravilla baja en carbono: ocurre a temperatura ambiente, con una entrada de energía mínima, y secuestra carbono en la biomasa fúngica. En comparación, la fabricación de espumas tradicionales o el curtido de cuero a menudo requiere calor masivo y energía química. Los análisis del ciclo de vida muestran que los MBM pueden reducir drásticamente las emisiones de CO₂, pero el beneficio exacto depende en gran medida de los métodos de secado y la química de acabado.<br/><br/><strong>6.2 Ventajas de Fin de Vida</strong><br/>Cuando se deja solo, el micelio completamente sin recubrimiento simplemente regresa a la tierra: compostable, nutritivo para el suelo y biodegradable. Pero si lo cubre con polímeros sintéticos, su descomposición se ralentiza. Es por eso que los científicos compiten para desarrollar acabados resistentes al agua de base biológica, recubrimientos que protegen el material durante el uso pero que no dejan un legado tóxico una vez que se desecha."
            },
            {
                title: "7. Desafíos Científicos Clave y Prioridades de Investigación",
                content: "<strong>Escalado de la producción:</strong> ¿Cómo aceleramos los ciclos de crecimiento? ¿Pueden los biorreactores verticales producir micelio a escalas industriales?<br/><strong>Estándares y seguridad:</strong> Necesitamos puntos de referencia globales (ASTM/ISO) para resistencia mecánica, resistencia al fuego, comportamiento ante la humedad y durabilidad a largo plazo.<br/><strong>Durabilidad sin sintéticos:</strong> El santo grial es un acabado que resista la humedad y la abrasión, pero que sea completamente de base biológica.<br/><strong>Ingeniería fúngica:</strong> Cepas avanzadas con mayor quitina, melanina o capacidad de autorreparación podrían desbloquear mayor fuerza, longevidad o protección contra la radiación.<br/><strong>Preparación espacial:</strong> ¿Podemos cultivar compuestos de micelio-regolito en la Luna o Marte que sobrevivan a la radiación, el vacío y los cambios extremos de temperatura? El reciclaje fúngico de circuito cerrado podría ser fundamental para los futuros hábitats fuera del mundo."
            },
            {
                title: "8. Estudios de Caso Fascinantes",
                content: "<strong>Pabellón Hy-Fi (2014, NYC):</strong> Una instalación escultórica audaz hecha completamente de ladrillos de micelio moldeados, prueba de que el hongo puede ser arquitectónico. También reveló problemas tempranos: daños por agua y desgaste relacionado con el clima.<br/><strong>Embalaje Ecovative (década de 2010–2025):</strong> Desde pequeña I+D hasta distribución industrial a gran escala, Ecovative ha demostrado que el embalaje de hongos realmente puede reemplazar las espumas dañinas.<br/><strong>MycoWorks y Bolt Threads (2020–2025):</strong> Estas empresas llevaron el cuero de micelio del reino del concepto a productos de lujo reales, convenciendo a las principales marcas de moda de volverse fúngicas.<br/><strong>Mycotecture de la NASA:</strong> El trabajo de laboratorio en curso financiado por la NASA explora cómo los hongos podrían construir y proteger hábitats en Marte, una fusión de biología, ingeniería y ciencia espacial como nada en la Tierra."
            },
            {
                title: "9. Impacto Socioeconómico y Vías de Adopción",
                content: "¿Alguna vez imaginó que los hongos podrían impulsar las economías rurales? La producción de micelio prospera con los desechos agrícolas, lo que significa que los agricultores en India, Brasil o Europa del Este podrían convertirse en fabricantes de materiales. Este modelo reduce las emisiones de transporte, fortalece las economías locales y crea empleos verdes.<br/><br/>Pero escalar globalmente requiere más que biología. Necesitamos códigos de construcción que reconozcan los materiales fúngicos, educación pública para disipar los \"miedos a los hongos\" y certificaciones reconocidas internacionalmente (como OEKO-TEX o LWG) para que los consumidores y reguladores confíen en estos nuevos biomateriales."
            },
            {
                title: "10. El Futuro: Por Qué el Micelio Podría Ser el Mayor Salto Material de la Humanidad",
                content: "El micelio es más que un simple truco de sostenibilidad inteligente. Es un cambio de paradigma: de la producción basada en la extracción a sistemas materiales regenerativos y vivos.<br/>En lugar de minar, cultivamos.<br/>En lugar de fábricas hambrientas de energía, utilizamos bioprocesos de baja energía.<br/>En lugar de desperdicio perpetuo, compostamos.<br/>En lugar de materiales rígidos y no renovables, utilizamos estructuras vivas autoensamblables y autorreparables.<br/><br/>En la próxima década, probablemente veremos al micelio dominar:<br/>Embalaje, reemplazando espumas contaminantes;<br/>Moda y calzado de lujo, ofreciendo alternativas elegantes y libres de crueldad;<br/>Interiores arquitectónicos, aislamiento y paneles acústicos;<br/>A largo plazo: biomateriales estructurales autorreparables e incluso hábitats cultivados en el espacio.<br/><br/>Las inversiones de la NASA no son solo experimentales: apuntan a un futuro donde los humanos no vivan sobre hormigón y acero, sino en hogares cultivados a partir de hongos. Eso podría sonar a ciencia ficción, pero con el micelio, la ciencia ficción se está convirtiendo en realidad científica."
            }
        ]
    }
};

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
            <div className="relative z-10 w-full bg-stone-900/90 backdrop-blur-md rounded-[11px] border border-stone-800/50 hover:border-white/10 transition-colors">
                {children}
            </div>
        </div>
    );
};

const MycoNewsPage: React.FC<MycoNewsPageProps> = ({ t, language }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
          requestAnimationFrame(() => {
              setOffset(window.pageYOffset);
          });
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nasaVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/NASA%20Mushroom%20Houses.mp4";
  
  // Get content for current language, fallback to English
  const article = MYCELIUM_ARTICLE[language] || MYCELIUM_ARTICLE.en;
  const mapArticle = FUNGAL_MAP_ARTICLE[language] || FUNGAL_MAP_ARTICLE.en;
  const isRtl = language === 'fa';

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 ${isRtl ? 'font-reishi-body' : ''}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .src-card:hover {
                border-color: #a78bfa;
                box-shadow: 0 10px 30px -10px rgba(167, 139, 250, 0.3);
            }
            /* New Styles for Mycelium Article */
            @keyframes rotate-border {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .neon-blue-border-box {
                position: relative;
                background: #0c0c0c; 
                border-radius: 1rem;
                z-index: 0;
                overflow: hidden;
            }
            .neon-blue-border-box::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(transparent 20%, #00f3ff 50%, transparent 80%);
                animation: rotate-border 6s linear infinite;
                z-index: -2;
            }
            .neon-blue-border-box::after {
                content: '';
                position: absolute;
                inset: 2px; 
                background: #141414; 
                border-radius: 0.9rem;
                z-index: -1;
            }
        `}</style>

      {/* Parallax Hero Section with NASA Video */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }} 
        >
             <video 
                src={nasaVideoUrl} 
                className="w-full h-full object-cover opacity-70"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-stone-950 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-purple-600/30 border border-purple-400/50 backdrop-blur-md">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Featured: NASA Mycotecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-2xl mb-6">
                Myco News
            </h1>
            <p className="text-xl sm:text-2xl text-stone-200 font-light tracking-wide drop-shadow-md">
                The Latest Frontiers in Mycelium Innovation
            </p>
        </div>
      </section>

      {/* Source List Section */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Top 30 Global Sources</h2>
                <p className="text-stone-400">Curated intelligence on Mycotecture, Materials Science, and Bio-Design.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sources.map((source, index) => (
                    <a 
                        key={index} 
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-6 rounded-xl bg-stone-800/50 border border-stone-700 transition-all duration-300 src-card group hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Ref {String(index + 1).padStart(2, '0')}</span>
                            <LinkIcon className="w-5 h-5 text-stone-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-purple-300 transition-colors">{source.title}</h3>
                        <div className="mt-auto pt-4 border-t border-stone-700/50">
                            <span className="text-xs text-stone-500 truncate block">{source.url.replace('https://', '').replace('www.', '').split('/')[0]}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </section>

      {/* FUNGAL MAP ARTICLE SECTION (NEW) */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-stone-950/80 to-black pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              
              <div className="mb-16 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative">
                  <div className="absolute inset-0 bg-black/60 z-10"></div>
                  <video 
                      src={FUNGAL_MAP_ARTICLE.videoUrl} 
                      className="w-full h-96 object-cover opacity-80"
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                      <h2 className="text-3xl sm:text-5xl font-black chrome-gold-text drop-shadow-2xl mb-6 tracking-tight leading-tight">
                          {mapArticle.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-amber-100 max-w-3xl font-light leading-relaxed drop-shadow-md">
                          {mapArticle.intro}
                      </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr" dir={isRtl ? 'rtl' : 'ltr'}>
                  {mapArticle.sections.map((section, idx) => (
                      <NeonBorderCard key={idx} color="gold" className="h-full">
                          <div className="p-8 h-full flex flex-col">
                              <div className="flex items-center gap-4 mb-6 border-b border-stone-800 pb-4">
                                  <span className="text-4xl">{section.icon}</span>
                                  <h3 className="text-xl font-bold text-amber-400 leading-tight">{section.title}</h3>
                              </div>
                              <div 
                                  className="text-stone-300 leading-loose text-sm font-light flex-grow"
                                  dangerouslySetInnerHTML={{ __html: section.content }}
                              />
                          </div>
                      </NeonBorderCard>
                  ))}
              </div>
          </div>
      </section>

      {/* Special Report: Mycelium Materials */}
      <section className="py-24 bg-black relative">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
              {/* Report Header */}
              <div className="text-center mb-16">
                  <div className="inline-block px-3 py-1 border border-amber-500/50 text-amber-500 text-[10px] tracking-[0.2em] uppercase mb-4 rounded-full">Special Report</div>
                  <h2 className="text-3xl sm:text-5xl font-black mb-4 chrome-gold-text leading-tight drop-shadow-2xl">
                      {article.mainTitle}
                  </h2>
                  <h3 className="text-xl text-blue-300 font-light tracking-wide mb-2">{article.subTitle}</h3>
                  <p className="text-stone-500 font-mono text-xs uppercase">{article.date}</p>
              </div>

              {/* Report Content Grid */}
              <div className="space-y-10" dir={isRtl ? 'rtl' : 'ltr'}>
                  {article.sections.map((section, idx) => (
                      <div key={idx} className="neon-blue-border-box p-1 transition-transform duration-500 hover:scale-[1.01]">
                          <div className="relative z-10 h-full p-8 rounded-xl bg-[#111]">
                              <h4 className="text-2xl font-bold mb-6 chrome-gold-text drop-shadow-md">{section.title}</h4>
                              <div 
                                className="text-stone-300 leading-loose text-lg font-light"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default MycoNewsPage;
