import { motion } from "framer-motion";
import { Divider, Diya, Mandala } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";

const QUOTES = [
    "दो दिलों का मिलन, सात जन्मों का संगम।",
    "सात फेरों के साथ शुरू हो एक खूबसूरत सफर।",
    "प्रेम, विश्वास और संस्कारों से सजे जीवन के नए अध्याय।",
    "शुभ मंगलमय हो यह पावन बंधन।",
    "रिश्तों की खुशबू, अपनों का प्यार, खुशियों से सजे जीवन के हर त्योहार।",
    "बने रहें एक-दूजे का सहारा, महकता रहे जीवन का हर किनारा।",
];

export default function Quotes() {
    const [featured, ...rest] = QUOTES;
    return (
        <section id="quotes" className="paper-texture relative overflow-hidden py-16 sm:py-24" data-testid="quotes-section">
            <div className="pointer-events-none absolute -left-20 bottom-10 opacity-[0.1]">
                <Mandala className="h-72 w-72 text-gold" />
            </div>

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center">
                    <MaskLineInView>
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">Shubh Vachan</p>
                    </MaskLineInView>
                    <MaskLineInView delay={0.1}>
                        <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl">शुभ वचन व मंगल आशीषें</h2>
                    </MaskLineInView>
                    <Reveal delay={0.15}>
                        <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                    </Reveal>
                </div>

                <Reveal delay={0.15}>
                    <figure className="relative mx-auto mt-12 max-w-2xl rounded-3xl border border-goldline/80 bg-ivory/85 px-6 py-12 text-center shadow-gold backdrop-blur-sm" data-testid="quote-featured">
                        <div className="pointer-events-none absolute -right-8 -top-8 opacity-40">
                            <Mandala className="h-40 w-40 text-gold" />
                        </div>
                        <Diya className="mx-auto h-10 w-14" />
                        <blockquote className="mt-6 font-devanagari text-2xl leading-relaxed text-maroon sm:text-3xl">
                            “{featured}”
                        </blockquote>
                        <figcaption className="mt-6 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                            A Timeless Blessing
                        </figcaption>
                    </figure>
                </Reveal>

                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                    {rest.map((q, i) => (
                        <motion.blockquote
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4 }}
                            className={`rounded-2xl border border-goldline/70 bg-gradient-to-b ${
                                i % 3 === 0
                                    ? "from-blush to-ivory"
                                    : i % 3 === 1
                                      ? "from-mint to-ivory"
                                      : "from-peach to-ivory"
                            } px-6 py-7 text-center shadow-card ${i === rest.length - 1 ? "sm:col-span-2" : ""}`}
                            data-testid={`quote-card-${i}`}
                        >
                            <p className="font-hindi text-lg leading-relaxed text-ink">“{q}”</p>
                            <Divider className="mx-auto mt-4 h-4 w-36 text-gold" />
                        </motion.blockquote>
                    ))}
                </div>
            </div>
        </section>
    );
}
