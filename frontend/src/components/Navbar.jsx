import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/lib/ornaments";
import { useWedding } from "@/context/WeddingContext";
import { useSmoothScroll } from "@/lib/SmoothScroll";
import { formatDateLong } from "@/lib/wedding";

const LINKS = [
    { id: "invitation", en: "Invitation", hi: "निमंत्रण" },
    { id: "ceremonies", en: "Ceremonies", hi: "समारोह" },
    { id: "quotes", en: "Blessings", hi: "शुभ वचन" },
    { id: "venue", en: "Venue", hi: "स्थल" },
    { id: "ashirwad", en: "Wishes", hi: "आशीर्वाद" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const scrollTo = useSmoothScroll();
    const { details } = useWedding();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => (e) => {
        e.preventDefault();
        setOpen(false);
        scrollTo(`#${id}`);
    };
    const home = (e) => {
        e.preventDefault();
        setOpen(false);
        scrollTo(0);
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                scrolled || open
                    ? "bg-ivory/90 shadow-gold backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                <a
                    href="#"
                    data-testid="wedding-nav-logo"
                    onClick={home}
                    className="flex items-center gap-2.5"
                    aria-label="Shubh Vivah — home"
                >
                    <LogoMark className="h-9 w-9 drop-shadow-sm" />
                    <span className="leading-tight">
                        <span className="block font-devanagari text-lg leading-tight text-maroon">शुभ विवाह</span>
                        <span className="block font-display text-[9px] uppercase tracking-[0.3em] text-gold-deep">Shubh Vivah</span>
                    </span>
                </a>

                <div className="hidden items-center gap-7 md:flex">
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            data-testid={`nav-link-${l.id}`}
                            onClick={go(l.id)}
                            className="group relative font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/80 transition-colors hover:text-maroon"
                        >
                            {l.en}
                            <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <button
                    data-testid="nav-mobile-menu-button"
                    onClick={() => setOpen(!open)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-goldline bg-ivory/80 text-maroon transition-transform active:scale-95 md:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-goldline/50 bg-ivory/95 backdrop-blur-md md:hidden"
                    >
                        <div className="flex flex-col px-6 py-4">
                            {LINKS.map((l) => (
                                <a
                                    key={l.id}
                                    href={`#${l.id}`}
                                    data-testid={`nav-link-${l.id}`}
                                    onClick={go(l.id)}
                                    className="flex items-baseline justify-between border-b border-goldline/30 py-3 last:border-0"
                                >
                                    <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink/85">{l.en}</span>
                                    <span className="font-hindi text-base text-gold-deep">{l.hi}</span>
                                </a>
                            ))}
                            <p className="pt-3 text-center font-script text-sm italic text-cocoa">
                                {details.brideName} & {details.groomName} · {formatDateLong(details.weddingDate)}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
