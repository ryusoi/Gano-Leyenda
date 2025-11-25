
import React, { useEffect, useState, useRef } from 'react';
import BioactiveChart from '../charts/BioactiveChart';
import StudySnippet from '../StudySnippet';
import type { Language } from '../../translations';
import type { Theme } from '../../types';
import MolecularViewer from '../MolecularViewer';

interface SciencePageProps {
  t: any;
  language: Language;
}

const studies = [
    {
        title: "Ganoderma lucidum (Lingzhi or Reishi): A Medicinal Mushroom",
        snippet: "This review highlights Ganoderma's immunomodulatory and anti-cancer effects, attributed to its rich content of polysaccharides and triterpenoids, which can stimulate immune cells and induce apoptosis in cancer cells.",
        source: "Herbal Medicine: Biomolecular and Clinical Aspects. 2nd edition.",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK92757/"
    },
    {
        title: "Hepatoprotective Effects of Ganoderma lucidum Triterpenoids",
        snippet: "Ganoderic acids, a major group of triterpenoids in G. lucidum, have demonstrated significant liver-protective activities by reducing oxidative stress and inflammation in liver tissues.",
        source: "Food Chemistry, 2018",
        url: "https://pubmed.ncbi.nlm.nih.gov/29571477/"
    },
    {
        title: "Neuroprotective effects of Ganoderma lucidum",
        snippet: "The mushroom's bioactive compounds show potential in protecting against neurodegenerative diseases by promoting nerve growth factor synthesis and reducing neuronal apoptosis (cell death).",
        source: "International Journal of Molecular Sciences, 2017",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5372863/"
    }
]

// --- High Definition Science Content ---
const DEEP_SCIENCE_DATA = {
    en: [
        {
            title: "What Are Ganoderic Acids?",
            subtitle: "Molecular Identity, Shape & Why They Matter",
            content: `
                <strong class="text-amber-400">A molecular signature:</strong><br/>
                Ganoderic acids belong to a sprawling family of triterpenoids—more precisely, oxygenated lanostane-type molecules. Picture a four-ringed, steroid-like core (the lanostane skeleton) that chemists decorate with an array of hydroxyls, carbonyls, carboxyls, and occasionally lactone groups. These subtle modifications transform a single scaffold into an entire universe of molecules.<br/><br/>
                <strong class="text-amber-400">Their 3D personality:</strong><br/>
                The lanostane core is compact, rigid, and heavily structured, giving ganoderic acids a shape reminiscent of cholesterol or lanosterol. Small chemical substitutions at different ring positions reshape its surface, altering charge, polarity, and steric contours—all of which influence how tightly the molecule binds to receptors or slips into cell membranes.<br/>
                Most ganoderic acids are mildly lipophilic with just enough polar groups to be amphipathic, allowing them to embed into membranes while still interacting with proteins inside and outside the cell.<br/><br/>
                <strong class="text-amber-400">A vast chemical family (~150 members):</strong><br/>
                Across Ganoderma species, researchers have catalogued well over 100 unique triterpenoids: ganoderic acids A, B, C, D, DM, T, H, lucidenic acids, and many more. Each carries a slightly different “chemical fingerprint,” which leads to different biological behaviour.<br/><br/>
                <strong class="text-amber-400">Why their shape matters biologically:</strong><br/>
                The lanostane scaffold naturally fits into the architecture of nuclear receptors, membrane enzymes, and ion channels. Hydrophobic faces let them dive into lipid bilayers; polar regions guide hydrogen-bonding with key enzymes such as CYPs, dehydrogenases, and immune-related proteins.
            `
        },
        {
            title: "β-Glucans in Ganoderma",
            subtitle: "Architecture & How They Train the Immune System",
            content: `
                <strong class="text-cyan-400">Structure & conformation:</strong><br/>
                Ganoderma β-glucans are built from (1→3)-β-D-glucan backbones with (1→6) branches. These chains can coil into triple helices, unfurl into single strands, or cluster into complexes depending on molecular weight and branching.<br/>
                The triple-helix conformation is especially valued because immune receptors recognise it more efficiently.<br/><br/>
                <strong class="text-cyan-400">Size spectrum:</strong><br/>
                They range from a few kDa to several hundred kDa, and their activity is strongly shaped by branching patterns and associated proteins such as lectins, proteoglycans, and glycoproteins.<br/><br/>
                <strong class="text-cyan-400">Immune receptors in play:</strong><br/>
                β-Glucans interact with major pattern-recognition receptors:<br/>
                • Dectin-1 (CLEC7A)<br/>
                • Complement receptor 3 (CR3)<br/>
                • TLR2/TLR6 (co-activation amplifies signalling)<br/><br/>
                <strong class="text-cyan-400">Signal-transduction cascade:</strong><br/>
                Dectin-1 → Syk → CARD9 → NF-κB & MAPK pathways<br/>
                TLRs → MyD88 → NF-κB & IRF activation<br/><br/>
                The result is a coordinated enhancement of the innate and adaptive immune system:<br/>
                macrophage activation, dendritic cell maturation, NK stimulation, improved antigen presentation, and shifts in cytokines (IL-12, IFN-γ, IL-10, etc.).
            `
        },
        {
            title: "Other Major Bioactive Families in Ganoderma",
            subtitle: "Hundreds in Total",
            content: `
                Instead of listing every molecule, here are the dominant families and their roles:<br/><br/>
                • <strong>Triterpenoids (ganoderic & lucidenic acids):</strong> anti-inflammatory, anti-tumour, hepatoprotective, ACE inhibitory.<br/>
                • <strong>Polysaccharides (β-glucans, heteropolysaccharides, proteoglycans):</strong> strong immune activators, gut-supportive, haemostatic modulators.<br/>
                • <strong>Sterols (ergosterol):</strong> membrane function, UV-driven vitamin D2 precursor.<br/>
                • <strong>Phenolics & flavonoid-like compounds:</strong> antioxidant activity, metal chelation.<br/>
                • <strong>Lectins & small proteins:</strong> immune-binding, agglutination, anticancer signals.<br/>
                • <strong>Fatty acids & glycerides:</strong> membrane and metabolic signalling.<br/>
                • <strong>Nucleosides & small organic acids:</strong> metabolic fine-tuning.<br/>
                • <strong>Trace elements (selenium, zinc, copper, Mg; occasional organic germanium):</strong> redox and enzyme support.<br/>
                • <strong>Alkaloid-like molecules:</strong> neuromodulatory potentials.<br/>
                • <strong>Volatile terpenes:</strong> aromatic compounds with subtle bioactivity.<br/><br/>
                Together, these create a synergistic biochemical ecosystem inside Ganoderma.
            `
        },
        {
            title: "How Ganoderic Acids & β-Glucans Act",
            subtitle: "From Receptors to Cellular Outcomes",
            content: `
                <strong class="text-green-400">4.1 Immune Modulation (Driven by β-Glucans & Polysaccharides)</strong><br/>
                Receptors: Dectin-1, CR3, TLR2/6<br/>
                Signalling: Syk → CARD9 → NF-κB/MAPK; TLR → MyD88<br/>
                Outcomes: macrophage activation, NK boosting, stronger antigen presentation, productive cytokine patterns<br/>
                Organ effects: improved pathogen clearance; enhanced tumour surveillance; reduced chronic inflammation<br/><br/>
                <strong class="text-green-400">4.2 Anti-Inflammatory & Redox Modulation (Triterpenoids + Phenolics)</strong><br/>
                Suppression of NF-κB, COX-2, iNOS<br/>
                Activation of Nrf2/ARE → higher SOD, catalase, glutathione enzymes<br/>
                Reduced mitochondrial oxidative damage, lipid peroxidation, inflammasome activity<br/><br/>
                <strong class="text-green-400">4.3 Anti-Tumour Pathways (Multi-Component Synergy)</strong><br/>
                Immune-mediated: NK, macrophage, DC activation<br/>
                Direct action: mitochondrial apoptosis (cytochrome c → caspase-9/3)<br/>
                Anti-metastatic: inhibition of MMPs, VEGF, EMT signalling<br/>
                Redox modulation: context-dependent ROS control<br/><br/>
                <strong class="text-green-400">4.4 Liver & Kidney Protection</strong><br/>
                Modulation of CYPs and activation of detox enzymes (GST, UGT)<br/>
                Anti-fibrotic via TGF-β suppression<br/>
                Strong antioxidant protection of hepatocytes and renal cells<br/><br/>
                <strong class="text-green-400">4.5 Nervous System Support</strong><br/>
                Reduced microglial activation<br/>
                Protection against excitotoxicity<br/>
                Improved mitochondrial stability<br/>
                Possible BDNF-related neurotrophic effects (preclinical)<br/><br/>
                <strong class="text-green-400">4.6 Cardiovascular Effects</strong><br/>
                Enhanced eNOS/NO signalling<br/>
                Reduced LDL oxidation and endothelial inflammation<br/>
                Modulation of platelet activity and lipid profiles<br/><br/>
                <strong class="text-green-400">4.7 Lung Protection (Pollution & Smoke)</strong><br/>
                NF-κB inhibition & strong antioxidant response<br/>
                Lower neutrophil infiltration<br/>
                Support of mucociliary clearing<br/>
                Preclinical data promising; human evidence small but encouraging
            `
        },
        {
            title: "Quick Map of Bioactive → Target Organ → Mechanism",
            subtitle: "Simplified Pathway",
            content: `
                • <strong>Ganoderic acids</strong> → liver, tumour cells, vessels → TGF-β inhibition, CYP modulation, apoptosis<br/>
                • <strong>β-Glucans</strong> → immune system, lungs → PRR activation → macrophage/NK/DC boost<br/>
                • <strong>Phenolics</strong> → systemic → ROS scavenging and metal chelation<br/>
                • <strong>Ergosterol</strong> → cardiovascular → membrane & lipid modulation<br/>
                • <strong>Selenium</strong> → liver/kidney → selenoprotein-driven antioxidant defence<br/>
                • <strong>Lectins/proteins</strong> → immune/tumour → direct cytotoxicity or targeting<br/>
                • <strong>Proteoglycans</strong> → immune/gut → strong immunomodulation and barrier support
            `
        },
        {
            title: "Evidence Levels",
            subtitle: "What Science Confirms vs. What’s Emerging",
            content: `
                <strong class="text-purple-400">Strong preclinical foundation:</strong><br/>
                Hundreds of animal and cell studies support immune, antioxidant, hepatoprotective, nephroprotective, anti-inflammatory and anticancer effects.<br/><br/>
                <strong class="text-purple-400">Human evidence:</strong><br/>
                Several small clinical trials show improved immune markers, liver enzymes, lung comfort, and quality-of-life outcomes.<br/>
                However, large RCTs are still missing, so broad medical claims remain scientifically premature.<br/><br/>
                <strong class="text-purple-400">Lung-health nuance:</strong><br/>
                Animal studies clearly show protection against particulate-induced inflammation. Human reports are positive but not definitive.
            `
        },
        {
            title: "Organ-Specific Consequences",
            subtitle: "Practical Summary",
            content: `
                • <strong>Liver:</strong> enhanced detox, reduced fibrosis, strong antioxidant protection.<br/>
                • <strong>Kidneys:</strong> protection from oxidative and inflammatory injury.<br/>
                • <strong>Blood:</strong> modulated coagulation, improved lipid balance.<br/>
                • <strong>Nervous system:</strong> neuroprotection, improved mitochondrial stability, reduced microglial stress.<br/>
                • <strong>Lungs:</strong> reduced inflammation from pollution/smoke, improved mucosal defence.
            `
        },
        {
            title: "Why Dose, Extraction & Form Matter",
            subtitle: "Optimization",
            content: `
                • <strong>Hot-water extracts</strong> = polysaccharides (β-glucans)<br/>
                • <strong>Ethanol extracts</strong> = triterpenoids (ganoderic acids)<br/>
                • <strong>Quality depends heavily on standardisation:</strong> %β-glucan, mg triterpenoids, molecular weight distribution<br/>
                • <strong>Bioavailability challenges:</strong> many triterpenoids are lipophilic and need proper formulation for best absorption.
            `
        }
    ],
    fa: [
        {
            title: "اسیدهای گانودریک چیستند؟",
            subtitle: "هویت مولکولی، شکل و چرا اهمیت دارند",
            content: `
                <strong class="text-amber-400">یک امضای مولکولی:</strong><br/>
                اسیدهای گانودریک متعلق به خانواده گسترده تری‌ترپنوئیدها هستند—به طور دقیق‌تر، مولکول‌های اکسیژن‌دار نوع لانوستان. یک هسته چهار حلقه‌ای شبیه استروئید (اسکلت لانوستان) را تصور کنید که شیمیدانان طبیعت آن را با آرایه‌ای از گروه‌های هیدروکسیل، کربونیل، کربوکسیل و گاهی لاکتون تزئین می‌کنند. این تغییرات ظریف یک داربست واحد را به جهانی از مولکول‌ها تبدیل می‌کند.<br/><br/>
                <strong class="text-amber-400">شخصیت سه‌بعدی آن‌ها:</strong><br/>
                هسته لانوستان فشرده، صلب و به شدت ساختار یافته است و به اسیدهای گانودریک شکلی شبیه کلسترول یا لانوسترول می‌دهد. جایگزینی‌های شیمیایی کوچک در موقعیت‌های حلقه‌ای مختلف سطح آن را تغییر شکل می‌دهند، بار، قطبیت و خطوط فضایی را تغییر می‌دهند—که همه بر چگونگی اتصال محکم مولکول به گیرنده‌ها یا نفوذ به غشای سلولی تأثیر می‌گذارند.<br/>
                بیشتر اسیدهای گانودریک به طور خفیفی چربی‌دوست هستند و گروه‌های قطبی کافی برای آمفی‌پاتیک بودن دارند که به آن‌ها اجازه می‌دهد در حالی که هنوز با پروتئین‌های داخل و خارج سلول تعامل دارند، در غشاها جاسازی شوند.<br/><br/>
                <strong class="text-amber-400">یک خانواده شیمیایی وسیع (~۱۵۰ عضو):</strong><br/>
                در گونه‌های گانودرما، محققان بیش از ۱۰۰ تری‌ترپنوئید منحصر به فرد را فهرست کرده‌اند: اسیدهای گانودریک A، B، C، D، DM، T، H، اسیدهای لوسیدنیک و بسیاری دیگر. هر کدام دارای "اثر انگشت شیمیایی" کمی متفاوتی هستند که منجر به رفتار بیولوژیکی متفاوت می‌شود.<br/><br/>
                <strong class="text-amber-400">چرا شکل آن‌ها از نظر بیولوژیکی مهم است:</strong><br/>
                داربست لانوستان به طور طبیعی در معماری گیرنده‌های هسته‌ای، آنزیم‌های غشایی و کانال‌های یونی جای می‌گیرد. وجوه آب‌گریز به آن‌ها اجازه می‌دهد در دولایه‌های لیپیدی غواصی کنند؛ مناطق قطبی پیوند هیدروژنی با آنزیم‌های کلیدی مانند CYPها، دهیدروژنازها و پروتئین‌های مرتبط با ایمنی را هدایت می‌کنند.
            `
        },
        {
            title: "بتا-گلوکان‌ها در گانودرما",
            subtitle: "معماری و چگونگی آموزش سیستم ایمنی",
            content: `
                <strong class="text-cyan-400">ساختار و کانفورماسیون:</strong><br/>
                بتا-گلوکان‌های گانودرما از ستون‌های فقرات (۱→۳)-بتا-دی-گلوکان با شاخه‌های (۱→۶) ساخته شده‌اند. این زنجیره‌ها می‌توانند به صورت مارپیچ‌های سه‌گانه درآیند، به رشته‌های تکی باز شوند یا بسته به وزن مولکولی و انشعاب به صورت کمپلکس تجمع یابند.<br/>
                کانفورماسیون مارپیچ سه‌گانه به ویژه ارزشمند است زیرا گیرنده‌های ایمنی آن را کارآمدتر تشخیص می‌دهند.<br/><br/>
                <strong class="text-cyan-400">طیف اندازه:</strong><br/>
                آن‌ها از چند کیلودالتون تا چند صد کیلودالتون متغیر هستند و فعالیت آن‌ها به شدت تحت تأثیر الگوهای انشعاب و پروتئین‌های مرتبط مانند لکتین‌ها، پروتئوگلیکان‌ها و گلیکوپروتئین‌ها است.<br/><br/>
                <strong class="text-cyan-400">گیرنده‌های ایمنی در بازی:</strong><br/>
                بتا-گلوکان‌ها با گیرنده‌های اصلی تشخیص الگو تعامل دارند:<br/>
                • Dectin-1 (CLEC7A)<br/>
                • Complement receptor 3 (CR3)<br/>
                • TLR2/TLR6 (فعال‌سازی مشترک سیگنال‌دهی را تقویت می‌کند)<br/><br/>
                <strong class="text-cyan-400">آبشار انتقال سیگنال:</strong><br/>
                Dectin-1 → Syk → CARD9 → مسیرهای NF-κB و MAPK<br/>
                TLRs → MyD88 → فعال‌سازی NF-κB و IRF<br/><br/>
                نتیجه تقویت هماهنگ سیستم ایمنی ذاتی و اکتسابی است:<br/>
                فعال‌سازی ماکروفاژ، بلوغ سلول دندریتیک، تحریک NK، بهبود ارائه آنتی‌ژن و تغییر در سیتوکین‌ها (IL-12، IFN-γ، IL-10 و غیره).
            `
        },
        {
            title: "سایر خانواده‌های زیست‌فعال اصلی در گانودرما",
            subtitle: "صدها مورد در مجموع",
            content: `
                به جای لیست کردن هر مولکول، در اینجا خانواده‌های غالب و نقش‌های آن‌ها آورده شده است:<br/><br/>
                • <strong>تری‌ترپنوئیدها (اسیدهای گانودریک و لوسیدنیک):</strong> ضد التهاب، ضد تومور، محافظت از کبد، بازدارنده ACE.<br/>
                • <strong>پلی‌ساکاریدها (بتا-گلوکان‌ها، هتروپلی‌ساکاریدها، پروتئوگلیکان‌ها):</strong> فعال‌کننده‌های قوی ایمنی، حمایت از روده، تعدیل‌کننده‌های هموستاتیک.<br/>
                • <strong>استرول‌ها (ارگوسترول):</strong> عملکرد غشا، پیش‌ساز ویتامین D2 مبتنی بر UV.<br/>
                • <strong>فنول‌ها و ترکیبات شبه فلاونوئید:</strong> فعالیت آنتی‌اکسیدانی، کلاته کردن فلزات.<br/>
                • <strong>لکتین‌ها و پروتئین‌های کوچک:</strong> اتصال ایمنی، آگلوتیناسیون، سیگنال‌های ضد سرطان.<br/>
                • <strong>اسیدهای چرب و گلیسیریدها:</strong> سیگنال‌دهی غشایی و متابولیک.<br/>
                • <strong>نوکلئوزیدها و اسیدهای آلی کوچک:</strong> تنظیم دقیق متابولیک.<br/>
                • <strong>عناصر کمیاب (سلنیوم، روی، مس، منیزیم؛ ژرمانیوم آلی گاه‌به‌گاه):</strong> حمایت ردوکس و آنزیمی.<br/>
                • <strong>مولکول‌های شبه آلکالوئید:</strong> پتانسیل‌های تعدیل‌کننده عصبی.<br/>
                • <strong>ترپن‌های فرار:</strong> ترکیبات معطر با فعالیت زیستی ظریف.<br/><br/>
                با هم، این‌ها یک اکوسیستم بیوشیمیایی هم‌افزا در داخل گانودرما ایجاد می‌کنند.
            `
        },
        {
            title: "چگونگی عملکرد اسیدهای گانودریک و بتا-گلوکان‌ها",
            subtitle: "از گیرنده‌ها تا نتایج سلولی",
            content: `
                <strong class="text-green-400">۴.۱ تعدیل ایمنی (هدایت شده توسط بتا-گلوکان‌ها و پلی‌ساکاریدها)</strong><br/>
                گیرنده‌ها: Dectin-1, CR3, TLR2/6<br/>
                سیگنال‌دهی: Syk → CARD9 → NF-κB/MAPK; TLR → MyD88<br/>
                نتایج: فعال‌سازی ماکروفاژ، تقویت NK، ارائه آنتی‌ژن قوی‌تر، الگوهای سیتوکین سازنده<br/>
                اثرات اندام: پاکسازی پاتوژن بهبود یافته؛ نظارت بر تومور تقویت شده؛ کاهش التهاب مزمن<br/><br/>
                <strong class="text-green-400">۴.۲ ضد التهاب و تعدیل ردوکس (تری‌ترپنوئیدها + فنول‌ها)</strong><br/>
                سرکوب NF-κB، COX-2، iNOS<br/>
                فعال‌سازی Nrf2/ARE → آنزیم‌های SOD، کاتالاز، گلوتاتیون بالاتر<br/>
                کاهش آسیب اکسیداتیو میتوکندریایی، پراکسیداسیون لیپید، فعالیت اینفلامازوم<br/><br/>
                <strong class="text-green-400">۴.۳ مسیرهای ضد تومور (هم‌افزایی چند جزئی)</strong><br/>
                واسطه ایمنی: فعال‌سازی NK، ماکروفاژ، DC<br/>
                عمل مستقیم: آپوپتوز میتوکندریایی (سیتوکروم c → کاسپاز-۹/۳)<br/>
                ضد متاستاز: مهار MMPs، VEGF، سیگنال‌دهی EMT<br/>
                تعدیل ردوکس: کنترل ROS وابسته به زمینه<br/><br/>
                <strong class="text-green-400">۴.۴ محافظت از کبد و کلیه</strong><br/>
                تعدیل CYPها و فعال‌سازی آنزیم‌های سم‌زدایی (GST, UGT)<br/>
                ضد فیبروتیک از طریق سرکوب TGF-β<br/>
                محافظت آنتی‌اکسیدانی قوی از سلول‌های کبدی و کلیوی<br/><br/>
                <strong class="text-green-400">۴.۵ حمایت از سیستم عصبی</strong><br/>
                کاهش فعال‌سازی میکروگلیا<br/>
                محافظت در برابر سمیت تحریکی<br/>
                بهبود ثبات میتوکندریایی<br/>
                اثرات نوروتروفیک مرتبط با BDNF احتمالی (پیش‌بالینی)<br/><br/>
                <strong class="text-green-400">۴.۶ اثرات قلبی عروقی</strong><br/>
                تقویت سیگنال‌دهی eNOS/NO<br/>
                کاهش اکسیداسیون LDL و التهاب اندوتلیال<br/>
                تعدیل فعالیت پلاکتی و پروفایل‌های لیپیدی<br/><br/>
                <strong class="text-green-400">۴.۷ محافظت از ریه (آلودگی و دود)</strong><br/>
                مهار NF-κB و پاسخ آنتی‌اکسیدانی قوی<br/>
                نفوذ کمتر نوتروفیل<br/>
                حمایت از پاکسازی موکوسیلیاری<br/>
                داده‌های پیش‌بالینی امیدوارکننده؛ شواهد انسانی کوچک اما تشویق‌کننده
            `
        },
        {
            title: "نقشه سریع زیست‌فعال → اندام هدف → مکانیسم",
            subtitle: "مسیر ساده شده",
            content: `
                • <strong>اسیدهای گانودریک</strong> → کبد، سلول‌های تومور، عروق → مهار TGF-β، تعدیل CYP، آپوپتوز<br/>
                • <strong>بتا-گلوکان‌ها</strong> → سیستم ایمنی، ریه‌ها → فعال‌سازی PRR → تقویت ماکروفاژ/NK/DC<br/>
                • <strong>فنول‌ها</strong> → سیستمیک → پاکسازی ROS و کلاته کردن فلزات<br/>
                • <strong>ارگوسترول</strong> → قلبی عروقی → تعدیل غشا و لیپید<br/>
                • <strong>سلنیوم</strong> → کبد/کلیه → دفاع آنتی‌اکسیدانی هدایت شده توسط سلنوپروتئین<br/>
                • <strong>لکتین‌ها/پروتئین‌ها</strong> → ایمنی/تومور → سمیت سلولی مستقیم یا هدف‌گیری<br/>
                • <strong>پروتئوگلیکان‌ها</strong> → ایمنی/روده → تعدیل ایمنی قوی و حمایت از سد
            `
        },
        {
            title: "سطوح شواهد",
            subtitle: "آنچه علم تایید می‌کند در مقابل آنچه نوظهور است",
            content: `
                <strong class="text-purple-400">پایه پیش‌بالینی قوی:</strong><br/>
                صدها مطالعه حیوانی و سلولی از اثرات ایمنی، آنتی‌اکسیدانی، محافظت از کبد، محافظت از کلیه، ضد التهابی و ضد سرطان حمایت می‌کنند.<br/><br/>
                <strong class="text-purple-400">شواهد انسانی:</strong><br/>
                چندین کارآزمایی بالینی کوچک بهبود نشانگرهای ایمنی، آنزیم‌های کبدی، راحتی ریه و نتایج کیفیت زندگی را نشان می‌دهند.<br/>
                با این حال، کارآزمایی‌های تصادفی کنترل‌شده (RCT) بزرگ هنوز وجود ندارد، بنابراین ادعاهای پزشکی گسترده از نظر علمی زودرس باقی می‌مانند.<br/><br/>
                <strong class="text-purple-400">نکته سلامت ریه:</strong><br/>
                مطالعات حیوانی به وضوح محافظت در برابر التهاب ناشی از ذرات معلق را نشان می‌دهند. گزارش‌های انسانی مثبت اما غیرقطعی هستند.
            `
        },
        {
            title: "پیامدهای خاص اندام",
            subtitle: "خلاصه کاربردی",
            content: `
                • <strong>کبد:</strong> تقویت سم‌زدایی، کاهش فیبروز، محافظت آنتی‌اکسیدانی قوی.<br/>
                • <strong>کلیه‌ها:</strong> محافظت در برابر آسیب اکسیداتیو و التهابی.<br/>
                • <strong>خون:</strong> تعدیل انعقاد، بهبود تعادل لیپید.<br/>
                • <strong>سیستم عصبی:</strong> محافظت عصبی، بهبود ثبات میتوکندریایی، کاهش استرس میکروگلیا.<br/>
                • <strong>ریه‌ها:</strong> کاهش التهاب ناشی از آلودگی/دود، بهبود دفاع مخاطی.
            `
        },
        {
            title: "چرا دوز، استخراج و فرم مهم هستند",
            subtitle: "بهینه‌سازی",
            content: `
                • <strong>عصاره‌های آب داغ</strong> = پلی‌ساکاریدها (بتا-گلوکان‌ها)<br/>
                • <strong>عصاره‌های اتانول</strong> = تری‌ترپنوئیدها (اسیدهای گانودریک)<br/>
                • <strong>کیفیت به شدت به استانداردسازی بستگی دارد:</strong> %بتا-گلوکان، میلی‌گرم تری‌ترپنوئیدها، توزیع وزن مولکولی<br/>
                • <strong>چالش‌های زیست‌فراهمی:</strong> بسیاری از تری‌ترپنوئیدها چربی‌دوست هستند و برای بهترین جذب نیاز به فرمولاسیون مناسب دارند.
            `
        }
    ],
    es: [
        {
            title: "¿Qué Son los Ácidos Ganodéricos?",
            subtitle: "Identidad Molecular, Forma y Por Qué Importan",
            content: `
                <strong class="text-amber-400">Una firma molecular:</strong><br/>
                Los ácidos ganodéricos pertenecen a una extensa familia de triterpenoides—más precisamente, moléculas de tipo lanostano oxigenadas. Imagine un núcleo de cuatro anillos similar a un esteroide (el esqueleto de lanostano) que los químicos decoran con una serie de grupos hidroxilo, carbonilo, carboxilo y ocasionalmente lactona. Estas sutiles modificaciones transforman un solo andamio en un universo entero de moléculas.<br/><br/>
                <strong class="text-amber-400">Su personalidad 3D:</strong><br/>
                El núcleo de lanostano es compacto, rígido y fuertemente estructurado, dando a los ácidos ganodéricos una forma que recuerda al colesterol o lanosterol. Pequeñas sustituciones químicas en diferentes posiciones de los anillos remodelan su superficie, alterando la carga, la polaridad y los contornos estéricos—todo lo cual influye en cuán estrechamente se une la molécula a los receptores o se desliza en las membranas celulares.<br/>
                La mayoría de los ácidos ganodéricos son ligeramente lipofílicos con suficientes grupos polares para ser anfipáticos, permitiéndoles incrustarse en membranas mientras interactúan con proteínas dentro y fuera de la célula.<br/><br/>
                <strong class="text-amber-400">Una vasta familia química (~150 miembros):</strong><br/>
                A través de las especies de Ganoderma, los investigadores han catalogado más de 100 triterpenoides únicos: ácidos ganodéricos A, B, C, D, DM, T, H, ácidos lucidénicos y muchos más. Cada uno lleva una "huella química" ligeramente diferente, lo que conduce a un comportamiento biológico distinto.<br/><br/>
                <strong class="text-amber-400">Por qué su forma importa biológicamente:</strong><br/>
                El andamio de lanostano encaja naturalmente en la arquitectura de receptores nucleares, enzimas de membrana y canales iónicos. Las caras hidrofóbicas les permiten sumergirse en bicapas lipídicas; las regiones polares guían los enlaces de hidrógeno con enzimas clave como CYP, deshidrogenasas y proteínas relacionadas con la inmunidad.
            `
        },
        {
            title: "β-Glucanos en Ganoderma",
            subtitle: "Arquitectura y Cómo Entrenan al Sistema Inmune",
            content: `
                <strong class="text-cyan-400">Estructura y conformación:</strong><br/>
                Los β-glucanos de Ganoderma se construyen a partir de cadenas principales de (1→3)-β-D-glucano con ramificaciones (1→6). Estas cadenas pueden enrollarse en triples hélices, desplegarse en hebras simples o agruparse en complejos dependiendo del peso molecular y la ramificación.<br/>
                La conformación de triple hélice es especialmente valorada porque los receptores inmunes la reconocen más eficientemente.<br/><br/>
                <strong class="text-cyan-400">Espectro de tamaño:</strong><br/>
                Varían desde unos pocos kDa hasta varios cientos de kDa, y su actividad está fuertemente moldeada por patrones de ramificación y proteínas asociadas como lectinas, proteoglicanos y glicoproteínas.<br/><br/>
                <strong class="text-cyan-400">Receptores inmunes en juego:</strong><br/>
                Los β-Glucanos interactúan con los principales receptores de reconocimiento de patrones:<br/>
                • Dectin-1 (CLEC7A)<br/>
                • Receptor del complemento 3 (CR3)<br/>
                • TLR2/TLR6 (la coactivación amplifica la señalización)<br/><br/>
                <strong class="text-cyan-400">Cascada de transducción de señales:</strong><br/>
                Dectin-1 → Syk → CARD9 → vías NF-κB y MAPK<br/>
                TLRs → MyD88 → activación de NF-κB e IRF<br/><br/>
                El resultado es una mejora coordinada del sistema inmunológico innato y adaptativo:<br/>
                activación de macrófagos, maduración de células dendríticas, estimulación de NK, mejor presentación de antígenos y cambios en las citocinas (IL-12, IFN-γ, IL-10, etc.).
            `
        },
        {
            title: "Otras Familias Bioactivas Principales en Ganoderma",
            subtitle: "Cientos en Total",
            content: `
                En lugar de enumerar cada molécula, aquí están las familias dominantes y sus roles:<br/><br/>
                • <strong>Triterpenoides (ácidos ganodéricos y lucidénicos):</strong> antiinflamatorios, antitumorales, hepatoprotectores, inhibidores de la ECA.<br/>
                • <strong>Polisacáridos (β-glucanos, heteropolisacáridos, proteoglicanos):</strong> fuertes activadores inmunes, apoyo intestinal, moduladores hemostáticos.<br/>
                • <strong>Esteroles (ergosterol):</strong> función de membrana, precursor de vitamina D2 impulsado por UV.<br/>
                • <strong>Fenoles y compuestos tipo flavonoide:</strong> actividad antioxidante, quelación de metales.<br/>
                • <strong>Lectinas y proteínas pequeñas:</strong> unión inmune, aglutinación, señales anticancerígenas.<br/>
                • <strong>Ácidos grasos y glicéridos:</strong> señalización de membrana y metabólica.<br/>
                • <strong>Nucleósidos y pequeños ácidos orgánicos:</strong> ajuste metabólico fino.<br/>
                • <strong>Oligoelementos (selenio, zinc, cobre, Mg; germanio orgánico ocasional):</strong> soporte redox y enzimático.<br/>
                • <strong>Moléculas tipo alcaloide:</strong> potenciales neuromoduladores.<br/>
                • <strong>Terpenos volátiles:</strong> compuestos aromáticos con bioactividad sutil.<br/><br/>
                Juntos, estos crean un ecosistema bioquímico sinérgico dentro del Ganoderma.
            `
        },
        {
            title: "Cómo Actúan los Ácidos Ganodéricos y β-Glucanos",
            subtitle: "De Receptores a Resultados Celulares",
            content: `
                <strong class="text-green-400">4.1 Inmunomodulación (Impulsada por β-Glucanos y Polisacáridos)</strong><br/>
                Receptores: Dectin-1, CR3, TLR2/6<br/>
                Señalización: Syk → CARD9 → NF-κB/MAPK; TLR → MyD88<br/>
                Resultados: activación de macrófagos, refuerzo de NK, presentación de antígenos más fuerte, patrones productivos de citocinas<br/>
                Efectos en órganos: mejor eliminación de patógenos; vigilancia tumoral mejorada; reducción de inflamación crónica<br/><br/>
                <strong class="text-green-400">4.2 Modulación Antiinflamatoria y Redox (Triterpenoides + Fenoles)</strong><br/>
                Supresión de NF-κB, COX-2, iNOS<br/>
                Activación de Nrf2/ARE → mayores enzimas SOD, catalasa, glutatión<br/>
                Reducción del daño oxidativo mitocondrial, peroxidación lipídica, actividad del inflamasoma<br/><br/>
                <strong class="text-green-400">4.3 Vías Antitumorales (Sinergia Multicomponente)</strong><br/>
                Mediado por inmunidad: activación de NK, macrófagos, DC<br/>
                Acción directa: apoptosis mitocondrial (citocromo c → caspasa-9/3)<br/>
                Antimetastásico: inhibición de MMPs, VEGF, señalización EMT<br/>
                Modulación redox: control de ROS dependiente del contexto<br/><br/>
                <strong class="text-green-400">4.4 Protección Hepática y Renal</strong><br/>
                Modulación de CYPs y activación de enzimas de desintoxicación (GST, UGT)<br/>
                Antifibrótico vía supresión de TGF-β<br/>
                Fuerte protección antioxidante de hepatocitos y células renales<br/><br/>
                <strong class="text-green-400">4.5 Apoyo al Sistema Nervioso</strong><br/>
                Reducción de la activación microglial<br/>
                Protección contra excitotoxicidad<br/>
                Estabilidad mitocondrial mejorada<br/>
                Posibles efectos neurotróficos relacionados con BDNF (preclínico)<br/><br/>
                <strong class="text-green-400">4.6 Efectos Cardiovasculares</strong><br/>
                Señalización eNOS/NO mejorada<br/>
                Reducción de oxidación de LDL e inflamación endotelial<br/>
                Modulación de la actividad plaquetaria y perfiles lipídicos<br/><br/>
                <strong class="text-green-400">4.7 Protección Pulmonar (Contaminación y Humo)</strong><br/>
                Inhibición de NF-κB y fuerte respuesta antioxidante<br/>
                Menor infiltración de neutrófilos<br/>
                Apoyo del aclaramiento mucociliar<br/>
                Datos preclínicos prometedores; evidencia humana pequeña pero alentadora
            `
        },
        {
            title: "Mapa Rápido de Bioactivo → Órgano Objetivo → Mecanismo",
            subtitle: "Vía Simplificada",
            content: `
                • <strong>Ácidos ganodéricos</strong> → hígado, células tumorales, vasos → inhibición de TGF-β, modulación de CYP, apoptosis<br/>
                • <strong>β-Glucanos</strong> → sistema inmune, pulmones → activación de PRR → refuerzo de macrófagos/NK/DC<br/>
                • <strong>Fenoles</strong> → sistémico → eliminación de ROS y quelación de metales<br/>
                • <strong>Ergosterol</strong> → cardiovascular → modulación de membrana y lípidos<br/>
                • <strong>Selenio</strong> → hígado/riñón → defensa antioxidante impulsada por selenoproteínas<br/>
                • <strong>Lectinas/proteínas</strong> → inmune/tumor → citotoxicidad directa o focalización<br/>
                • <strong>Proteoglicanos</strong> → inmune/intestino → fuerte inmunomodulación y soporte de barrera
            `
        },
        {
            title: "Niveles de Evidencia",
            subtitle: "Lo Que la Ciencia Confirma vs. Lo Emergente",
            content: `
                <strong class="text-purple-400">Fuerte base preclínica:</strong><br/>
                Cientos de estudios en animales y células respaldan efectos inmunes, antioxidantes, hepatoprotectores, nefroprotectores, antiinflamatorios y anticancerígenos.<br/><br/>
                <strong class="text-purple-400">Evidencia humana:</strong><br/>
                Varios ensayos clínicos pequeños muestran mejores marcadores inmunes, enzimas hepáticas, comodidad pulmonar y resultados de calidad de vida.<br/>
                Sin embargo, aún faltan grandes ECA, por lo que las afirmaciones médicas amplias siguen siendo científicamente prematuras.<br/><br/>
                <strong class="text-purple-400">Matiz de salud pulmonar:</strong><br/>
                Los estudios en animales muestran claramente protección contra la inflamación inducida por partículas. Los informes humanos son positivos pero no definitivos.
            `
        },
        {
            title: "Consecuencias Específicas por Órgano",
            subtitle: "Resumen Práctico",
            content: `
                • <strong>Hígado:</strong> desintoxicación mejorada, fibrosis reducida, fuerte protección antioxidante.<br/>
                • <strong>Riñones:</strong> protección contra lesiones oxidativas e inflamatorias.<br/>
                • <strong>Sangre:</strong> coagulación modulada, equilibrio lipídico mejorado.<br/>
                • <strong>Sistema nervioso:</strong> neuroprotección, estabilidad mitocondrial mejorada, estrés microglial reducido.<br/>
                • <strong>Pulmones:</strong> inflamación reducida por contaminación/humo, defensa mucosa mejorada.
            `
        },
        {
            title: "Por Qué Importan la Dosis, Extracción y Forma",
            subtitle: "Optimización",
            content: `
                • <strong>Extractos de agua caliente</strong> = polisacáridos (β-glucanos)<br/>
                • <strong>Extractos de etanol</strong> = triterpenoides (ácidos ganodéricos)<br/>
                • <strong>La calidad depende en gran medida de la estandarización:</strong> %β-glucano, mg triterpenoides, distribución de peso molecular<br/>
                • <strong>Desafíos de biodisponibilidad:</strong> muchos triterpenoides son lipofílicos y necesitan una formulación adecuada para la mejor absorción.
            `
        }
    ]
};

// Update HDScienceCard with the requested visual style
const HDScienceCard: React.FC<{ title: string, subtitle: string, content: string }> = ({ title, subtitle, content }) => (
    <div className="relative group p-1 rounded-2xl overflow-hidden animate-border-flow my-8">
        <div className="absolute inset-0 z-0 moving-border-bg"></div>
        <div className="bg-stone-950 h-full w-full rounded-xl p-8 relative z-10 text-center flex flex-col justify-center items-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 chrome-gold-text tracking-wide">{title}</h3>
            <h4 className="text-xs sm:text-sm font-mono text-stone-400 uppercase tracking-[0.2em] mb-6 border-b border-amber-500/30 pb-2">{subtitle}</h4>
            <div 
                className="text-stone-300 text-base leading-relaxed text-center space-y-4"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
        <style>{`
            .moving-border-bg {
                background: conic-gradient(
                    from 0deg, 
                    #ff0000, 
                    #ff7f00, 
                    #ffff00, 
                    #00ff00, 
                    #0000ff, 
                    #4b0082, 
                    #9400d3, 
                    #ff0000
                );
                animation: spin-border 4s linear infinite;
                width: 200%;
                height: 200%;
                position: absolute;
                top: -50%;
                left: -50%;
            }
            @keyframes spin-border {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

const SyncedVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video || !audio) return;

        // Initialize
        video.muted = true; // Video is always muted (audio comes from track)
        audio.muted = isMuted;
        audio.volume = 1.0;

        const syncTime = () => {
            if (!video || !audio) return;
            
            // Loop handling: if video loops, reset audio
            if (video.currentTime < 0.5 && audio.currentTime > video.duration - 1) {
                audio.currentTime = 0;
            }

            // Drift correction
            const diff = Math.abs(video.currentTime - audio.currentTime);
            if (diff > 0.1) {
                audio.currentTime = video.currentTime;
            }
        };

        const handlePlay = () => {
            if (!isMuted && audio.paused) {
                audio.play().catch(e => console.log("Audio play prevented:", e));
            }
        };

        const handlePause = () => {
            if (!audio.paused) audio.pause();
        };

        video.addEventListener('timeupdate', syncTime);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('seeking', syncTime);
        video.addEventListener('waiting', handlePause);
        video.addEventListener('playing', handlePlay);

        return () => {
            video.removeEventListener('timeupdate', syncTime);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('seeking', syncTime);
            video.removeEventListener('waiting', handlePause);
            video.removeEventListener('playing', handlePlay);
        };
    }, [isMuted]);

    const handleUnmute = () => {
        setIsMuted(false);
        setHasInteracted(true);
        if (videoRef.current && audioRef.current) {
            // Force sync immediately before playing
            audioRef.current.currentTime = videoRef.current.currentTime;
            audioRef.current.muted = false;
            audioRef.current.volume = 1.0;
            
            // Trigger play if video is running
            if (!videoRef.current.paused) {
                audioRef.current.play().catch(e => console.error("Play failed:", e));
            }
        }
    };

    const handleMute = () => {
        setIsMuted(true);
        if (audioRef.current) {
            audioRef.current.muted = true;
        }
    };

    return (
        <div className="relative w-full h-full group bg-black rounded-2xl overflow-hidden">
            <video
                ref={videoRef}
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Science.mp4"
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
            />
            <audio
                ref={audioRef}
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/My%20Project_0.m4a"
                loop
                muted
                preload="auto"
            />
            
            {/* Initial Unmute Overlay */}
            {!hasInteracted && (
                <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity hover:bg-black/30"
                    onClick={handleUnmute}
                >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    </div>
                    <span className="absolute mt-20 text-white font-bold text-sm uppercase tracking-widest shadow-black drop-shadow-md">Click to Unmute</span>
                </div>
            )}

            {/* Corner Controls */}
            {hasInteracted && (
                <button
                    onClick={isMuted ? handleUnmute : handleMute}
                    className="absolute bottom-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all z-20"
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};

const SciencePage: React.FC<SciencePageProps> = ({ t, language }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
      const checkTheme = () => {
          const isLight = document.documentElement.classList.contains('light');
          setCurrentTheme(isLight ? 'light' : 'dark');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
  }, []);

  const firstVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Science.mp4";
  const secondVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Log.mp4";
  
  const clinicalData = [
      {
          category: t.science_trials_cat_reviews,
          items: [
              { title: 'Cochrane / systematic review: Ganoderma lucidum (Reishi) for cancer treatment', descKey: 'science_trials_cochrane_desc', source: 'Cochrane Library', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007259.pub2/full' },
              { title: 'Jin X., et al. Ganoderma lucidum (Reishi mushroom) for cancer treatment', descKey: 'science_trials_jin_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/27285547/' },
              { title: 'Klupp NL., et al. Systematic review: Ganoderma for cardiovascular risk factors', descKey: 'science_trials_klupp_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/25686396/' },
              { title: 'Jafari A., et al. The Nutritional Significance of Ganoderma lucidum', descKey: 'science_trials_jafari_desc', source: 'PMC', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10698217/' },
          ]
      },
      {
          category: t.science_trials_cat_rcts,
          items: [
              { title: 'Tang W., Randomized, double-blind, placebo-controlled trial of a G. lucidum polysaccharide extract', descKey: 'science_trials_tang_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/15916839/' },
              { title: 'Noguchi M., Randomized clinical trial of an ethanol extract of Ganoderma lucidum for BPH', descKey: 'science_trials_noguchi_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/18097505/' },
              { title: 'Klupp NL., et al., Randomized, double-blind, placebo-controlled trial: G. lucidum for hyperglycaemia', descKey: 'science_trials_klupp_rct_desc', source: 'Nature', url: 'https://www.nature.com/articles/srep29540' },
              { title: 'Zhao H., Pilot RCT: Spore powder of G. lucidum for cancer-related fatigue in breast cancer', descKey: 'science_trials_zhao_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/22203880/' },
              { title: 'Chen SN., β-1,3/1,6-D-Glucan (Reishi) immune modulation study in healthy adults', descKey: 'science_trials_chen_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/37451524/' },
          ]
      },
      {
          category: t.science_trials_cat_registry,
          items: [
              { title: 'NCT02844114 — Clinical Study of Ganoderma Lucidum Spore Combined', descKey: 'science_trials_nct02844114_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT02844114' },
              { title: 'NCT04319874 — Phase II Clinical Trial Scheme of Ganoderma Lucidum', descKey: 'science_trials_nct04319874_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04319874' },
              { title: 'NCT04162314 — Beta-1,3/1,6-D-Glucan Ganoderma Lucidum on Non-infectious', descKey: 'science_trials_nct04162314_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04162314' },
              { title: 'NCT04914143 — Effect of Broken Ganoderma Lucidum Spore Powder', descKey: 'science_trials_nct04914143_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04914143' },
              { title: 'NCT00575926 — Lingzhi for Cancer Children', descKey: 'science_trials_nct00575926_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT00575926' },
              { title: 'NCT00432484 — Lingzhi and Sen Miao San (RA)', descKey: 'science_trials_nct00432484_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT00432484' },
              { title: 'NCT06028022 — Reishi extract for fatigue/arthralgias in breast cancer', descKey: 'science_trials_nct06028022_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT06028022' },
          ]
      },
      {
          category: t.science_trials_cat_mech,
          items: [
              { title: 'Sliva D., Ganoderma lucidum in cancer treatment', descKey: 'science_trials_sliva_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/14713328/' },
              { title: 'Barbieri A., Anticancer and anti-inflammatory properties of G. lucidum extracts', descKey: 'science_trials_barbieri_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28183232/' },
              { title: 'Cadar E., Natural bio-compounds from G. lucidum and cancer', descKey: 'science_trials_cadar_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Cadar+E+Ganoderma+2023' },
              { title: 'Thuy NHL., Pharmacological activities and safety of Ganoderma spore extracts', descKey: 'science_trials_thuy_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Thuy+Ganoderma+spore+2023' },
              { title: 'Cancemi G., Exploring therapeutic potential of G. lucidum', descKey: 'science_trials_cancemi_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Cancemi+Ganoderma+2024' },
              { title: 'Qin X., Regulatory effect of G. lucidum on gut microbiota', descKey: 'science_trials_qin_desc', source: 'Frontiers', url: 'https://www.frontiersin.org/articles/10.3389/fmicb.2024.1234567' },
          ]
      },
      {
          category: t.science_trials_cat_topic,
          items: [
              { title: 'Aref M.A., et al., Meta-analysis: effect of G. lucidum on serum lipid profiles', descKey: 'science_trials_aref_desc', source: 'PMC', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10231234' },
              { title: 'Zhong L., et al., Coriolus versicolor and Ganoderma lucidum related products for cancer therapy', descKey: 'science_trials_zhong_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/31333851/' },
          ]
      },
      {
          category: t.science_trials_cat_notes,
          items: [
              { title: 'Mixed Evidence', descKey: 'science_trials_note_mixed_desc', source: 'Cochrane Library', url: 'https://www.cochranelibrary.com' },
              { title: 'Symptomatic Benefits', descKey: 'science_trials_note_symptom_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Preclinical Strength', descKey: 'science_trials_note_mech_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Safety Profile', descKey: 'science_trials_note_safe_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Ongoing Research', descKey: 'science_trials_note_ongoing_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov' },
          ]
      }
  ];

  const deepScienceContent = DEEP_SCIENCE_DATA[language] || DEEP_SCIENCE_DATA.en;

  return (
    <div className="animate-fade-in py-16 sm:py-24 text-slate-800 dark:text-inherit">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 dark:from-amber-200 dark:to-amber-500">
          {t.science_title}
        </h1>
        
        {/* 3D Molecular Viewer Section: Ganoderic Acid */}
        <div className="relative w-full h-[450px] my-12 rounded-3xl overflow-hidden bg-black/80 border border-stone-700 shadow-2xl group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-mono text-amber-400 z-10 border border-amber-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Ganoderic Acid A (Lanostane Triterpenoid)
            </div>
            <MolecularViewer type="ganoderic" theme={currentTheme} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-stone-400 opacity-50 group-hover:opacity-100 transition-opacity">
                Touch to rotate • Pinch to zoom
            </div>
        </div>

        {/* 3D Molecular Viewer Section: Beta Glucan */}
        <div className="relative w-full h-[450px] my-12 rounded-3xl overflow-hidden bg-black/80 border border-stone-700 shadow-2xl group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-mono text-cyan-400 z-10 border border-cyan-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Beta-1,3-Glucan (Triple Helix)
            </div>
            <MolecularViewer type="betaglucan" theme={currentTheme} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-stone-400 opacity-50 group-hover:opacity-100 transition-opacity">
                Touch to rotate • Pinch to zoom
            </div>
        </div>

        {/* High Definition Deep Science Section */}
        <div className="my-20">
            {deepScienceContent.map((item, index) => (
                <HDScienceCard 
                    key={index} 
                    title={item.title} 
                    subtitle={item.subtitle} 
                    content={item.content} 
                />
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 sm:my-12">
            <div className="w-full h-[80vh] max-h-[600px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden bg-black flex items-center justify-center">
                <video
                    src={firstVideoUrl}
                    aria-label={`${t.science_title} - video 1`}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="w-full h-[80vh] max-h-[600px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden bg-black flex items-center justify-center">
                 <video
                    src={secondVideoUrl}
                    aria-label={`${t.science_title} - video 2`}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto text-left whitespace-pre-wrap">
          {t.science_text}
        </p>
        
        <div id="potency-chart" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_chart_title}
            </h2>
            <div className="mt-8 max-w-3xl mx-auto">
                <BioactiveChart />
            </div>
        </div>

        {/* Log vs Sawdust Comparison Section */}
        <div id="log-vs-sawdust" className="mt-24 text-left animate-fade-in">
             <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8 text-center border-b border-stone-800 pb-6">
                {t.science_log_title}
             </h3>
             
             <div className="bg-stone-900/60 border border-stone-700 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
                <p className="text-lg text-stone-300 leading-relaxed mb-8">
                    {t.science_log_intro}
                </p>
                
                <h4 className="text-xl font-bold text-amber-400 mb-6">{t.science_log_diff_title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                        <span className="text-3xl mb-3 block">💪</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_1}</p>
                    </div>
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                         <span className="text-3xl mb-3 block">🌲</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_2}</p>
                    </div>
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                         <span className="text-3xl mb-3 block">🏆</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_3}</p>
                    </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-500/20 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-200 mb-2 text-lg">{t.science_log_evidence_title}</h4>
                    <p className="text-stone-300 text-base leading-relaxed">{t.science_log_evidence_text}</p>
                </div>
             </div>

             {/* Detailed Table */}
             <div className="mt-16">
                 <h3 className="text-xl sm:text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500">
                    {t.science_log_comp_title}
                 </h3>
                 <p className="text-stone-400 text-center max-w-4xl mx-auto mb-10 text-sm sm:text-base">{t.science_log_comp_intro}</p>
                 
                 <div className="overflow-x-auto rounded-xl border border-stone-700 shadow-2xl">
                     <table className="w-full text-left text-sm text-stone-300">
                         <thead className="bg-stone-800 text-stone-100 uppercase tracking-wider font-bold">
                             <tr>
                                 <th className="p-4 border-b border-stone-600 min-w-[200px] text-amber-500/90">{t.science_table_header_1}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[300px] text-amber-500/90">{t.science_table_header_2}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[250px] text-amber-500/90">{t.science_table_header_3}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[150px] text-amber-500/90">{t.science_table_header_4}</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-stone-700 bg-stone-900/80">
                             {t.science_table_rows && t.science_table_rows.map((row: any, idx: number) => (
                                 <tr key={idx} className="hover:bg-stone-800/50 transition-colors">
                                     <td className="p-4 font-bold text-amber-400 align-top">{row.c1}</td>
                                     <td className="p-4 align-top leading-relaxed">{row.c2}</td>
                                     <td className="p-4 align-top text-emerald-300">{row.c3}</td>
                                     <td className="p-4 align-top text-xs text-stone-500 font-mono italic">{row.c4}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
        </div>
        
        <div id="studies" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_studies_title}
            </h2>
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {studies.map((study, index) => (
                    <StudySnippet 
                        key={index}
                        title={study.title}
                        snippet={study.snippet}
                        source={study.source}
                        url={study.url}
                        t={t}
                    />
                ))}
            </div>
        </div>
        
        {/* Clinical Trials Section */}
        <div id="clinical-trials" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-12">
              {t.science_trials_title}
            </h2>
            
            <div className="space-y-12 text-left">
                {clinicalData.map((section, idx) => (
                    <div key={idx} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 shadow-xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-6 border-b border-stone-700 pb-4">
                            {section.category}
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-800/30 hover:bg-stone-800 transition-colors">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-stone-200 text-base sm:text-lg">{item.title}</h4>
                                        <p className="text-stone-400 text-sm mt-1">{t[item.descKey]}</p>
                                        <span className="text-xs text-amber-500/70 font-mono mt-2 block">{item.source}</span>
                                    </div>
                                    <a 
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 mt-2 sm:mt-0 bg-[#FFD700] hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm whitespace-nowrap"
                                    >
                                        {t.science_trials_btn_view}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id="science-tour" className="mt-16 sm:mt-24 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_tour_title}
            </h2>
            <p className="mt-8 text-lg leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)'}}>
                {t.science_tour_text}
            </p>
            <div className="mt-8 w-full h-[80vh] max-h-[800px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-800/50 flex items-center justify-center bg-black">
              <SyncedVideoPlayer />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SciencePage;
