import { useEffect, useState } from "react";
import { Divider, Mandala } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";
import { useWedding } from "@/context/WeddingContext";
import { getWeddingTarget } from "@/lib/wedding";

const UNITS = [
    { key: "days", en: "Days", hi: "दिन", pad: 3 },
    { key: "hours", en: "Hours", hi: "घंटे", pad: 2 },
    { key: "minutes", en: "Minutes", hi: "मिनट", pad: 2 },
    { key: "seconds", en: "Seconds", hi: "सेकंड", pad: 2 },
];

function computeLeft(target) {
    const diff = Math.max(0, target - Date.now());
    const s = Math.floor(diff / 1000);
    return {
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
        reached: diff <= 0,
    };
}

export default function Countdown() {
    const { details } = useWedding();
    const [left, setLeft] = useState(() =>
        computeLeft(getWeddingTarget(details.weddingDate, details.ceremonyTime)),
    );

    useEffect(() => {
        const tick = () => setLeft(computeLeft(getWeddingTarget(details.weddingDate, details.ceremonyTime)));
        tick();
        const t = setInterval(tick, 1000);
        return () => clearInterval(t);
    }, [details.weddingDate, details.ceremonyTime]);

    return (
        <section id="countdown" className="paper-texture relative overflow-hidden py-16 sm:py-24" data-testid="countdown-section">
            <div className="pointer-events-none absolute -left-24 top-6 opacity-[0.1]">
                <Mandala className="h-72 w-72 text-gold" />
            </div>
            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                <MaskLineInView>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">The Auspicious Countdown</p>
                </MaskLineInView>
                <MaskLineInView delay={0.1}>
                    <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl" data-testid="countdown-title">शुभ मुहूर्त</h2>
                </MaskLineInView>
                <Reveal delay={0.15}>
                    <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                </Reveal>

                {left.reached ? (
                    <Reveal delay={0.2}>
                        <p className="mt-10 font-devanagari text-2xl leading-relaxed text-maroon sm:text-3xl" data-testid="countdown-complete-message">
                            आज शुभ विवाह का मंगलमय दिन है!
                        </p>
                    </Reveal>
                ) : (
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5" data-testid="live-wedding-countdown">
                        {UNITS.map((u, i) => (
                            <Reveal key={u.key} delay={i * 0.08}>
                                <div
                                    data-testid={`live-wedding-countdown-card-${u.key}`}
                                    className="relative overflow-hidden rounded-2xl border border-goldline/80 bg-gradient-to-b from-[#FFF8E1] to-[#F6E7BD] px-2 py-6 text-center shadow-gold sm:py-8"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.75),transparent_65%)]" />
                                    <div className="relative">
                                        <span key={left[u.key]} className="block animate-pop font-display text-4xl font-bold tabular-nums text-maroon sm:text-5xl">
                                            {String(left[u.key]).padStart(u.pad, "0")}
                                        </span>
                                        <span className="mt-2 block font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">{u.en}</span>
                                        <span className="block font-hindi text-sm text-cocoa">{u.hi}</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}

                <Reveal delay={0.3}>
                    <p className="mt-8 font-script text-sm italic text-cocoa">Counted to the wedding moment in Indian Standard Time (IST)</p>
                </Reveal>
            </div>
        </section>
    );
}
