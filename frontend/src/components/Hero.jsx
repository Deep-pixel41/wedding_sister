import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mandala, MarigoldGarland } from "@/lib/ornaments";
import { MaskLine } from "@/lib/Reveal";
import { useWedding } from "@/context/WeddingContext";
import { formatDateParts } from "@/lib/wedding";
import { useSmoothScroll } from "@/lib/SmoothScroll";

export default function Hero() {
    const ref = useRef(null);
    const scrollTo = useSmoothScroll();
    const { details } = useWedding();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const dp = formatDateParts(details.weddingDate);

    return (
        <section
            ref={ref}
            className="paper-texture relative flex min-h-[100svh] flex-col items-center overflow-hidden px-4 pb-16 pt-24 sm:pt-28"
            data-testid="hero-section"
        >
            <motion.div style={{ rotate: mandalaRotate }} className="pointer-events-none absolute -right-28 -top-24 opacity-[0.16] sm:opacity-[0.2]">
                <Mandala className="h-[420px] w-[420px] text-gold" />
            </motion.div>
            <motion.div style={{ rotate: mandalaRotate }} className="pointer-events-none absolute -bottom-32 -left-28 opacity-[0.14]">
                <Mandala className="h-[380px] w-[380px] text-gold" />
            </motion.div>

            <MarigoldGarland className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full sm:h-16" />

            <motion.div style={{ opacity: fade }} className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
                <MaskLine delay={0.15}>
                    <p className="font-hindi text-lg font-semibold tracking-[0.2em] text-maroon sm:text-xl" data-testid="hero-sanskrit-blessing">
                        ॥ श्री गणेशाय नमः ॥
                    </p>
                </MaskLine>

                <motion.div
                    style={{ y: imgY }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-6"
                >
                    <div className="absolute -inset-3 rounded-t-full rounded-b-[2rem] border border-goldline/70" />
                    <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] border-2 border-gold bg-cream shadow-royal">
                        <img
                            src="/images/ganesha_hero.jpeg"
                            alt="Traditional illustration of Lord Ganesha bestowing blessings"
                            data-testid="hero-ganesha-illustration"
                            className="h-56 w-44 object-cover sm:h-72 sm:w-56"
                        />
                    </div>
                </motion.div>

                <MaskLine delay={0.5} className="mt-7">
                    <h1 className="font-devanagari text-5xl leading-tight text-maroon drop-shadow-[0_2px_14px_rgba(212,175,55,0.3)] sm:text-6xl lg:text-7xl" data-testid="hero-title">
                        <span className="gold-text">शुभ विवाह</span>
                    </h1>
                </MaskLine>

                <MaskLine delay={0.75} className="mt-5 max-w-xl">
                    <p className="font-script text-base italic leading-relaxed text-cocoa sm:text-lg" data-testid="hero-invitation-message">
                        With the divine blessings of Lord Ganesha and the love of our families, we joyfully invite you to celebrate the beginning of a beautiful new journey.
                    </p>
                </MaskLine>

                <MaskLine delay={0.95} className="mt-6">
                    <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1" data-testid="hero-names">
                        <span className="font-display text-2xl font-semibold tracking-wide text-ink sm:text-4xl">{details.brideName}</span>
                        <span className="font-devanagari text-2xl text-gold-deep sm:text-3xl">&</span>
                        <span className="font-display text-2xl font-semibold tracking-wide text-ink sm:text-4xl">{details.groomName}</span>
                    </div>
                </MaskLine>

                {dp && (
                    <MaskLine delay={1.1} className="mt-5">
                        <div className="flex items-center gap-3 rounded-full border border-goldline bg-ivory/80 px-6 py-2.5 shadow-gold" data-testid="hero-date-badge">
                            <span className="font-display text-sm font-semibold tracking-[0.25em] text-maroon sm:text-base">
                                {dp.day} {dp.month.toUpperCase()} {dp.year}
                            </span>
                        </div>
                    </MaskLine>
                )}

                <motion.button
                    data-testid="hero-scroll-down-button"
                    onClick={() => scrollTo("#countdown")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-10 flex flex-col items-center gap-2"
                    aria-label="Scroll down to the countdown"
                >
                    <span className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-deep">Scroll</span>
                    <span className="scroll-hint-bar block h-9 w-px bg-gradient-to-b from-gold to-transparent" />
                </motion.button>
            </motion.div>
        </section>
    );
}
