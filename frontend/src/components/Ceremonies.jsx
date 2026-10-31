import { motion } from "framer-motion";
import { Divider, Mandala } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";

const CEREMONIES = [
    { hi: "गणेश वंदना", en: "Ganesh Vandana", desc: "Invoking Lord Ganesha's blessings for an auspicious beginning.", img: "/images/ceremony_ganesh_vandana.jpeg" },
    { hi: "हल्दी समारोह", en: "Haldi Ceremony", desc: "A golden ritual of turmeric, laughter and love.", img: "/images/ceremony_haldi.jpeg" },
    { hi: "मेहंदी समारोह", en: "Mehndi Ceremony", desc: "Intricate henna art, folk songs and festive cheer.", img: "/images/ceremony_mehndi.jpeg" },
    { hi: "संगीत संध्या", en: "Sangeet Sandhya", desc: "An evening of music, dance and family performances.", img: "/images/ceremony_sangeet.jpeg" },
    { hi: "बारात", en: "Baraat", desc: "The groom's royal arrival, with music and fanfare.", img: "/images/ceremony_baraat.jpeg" },
    { hi: "वरमाला", en: "Varmala", desc: "The exchange of garlands — a promise of acceptance.", img: "/images/ceremony_varmala.jpeg" },
    { hi: "सात फेरे", en: "Saat Phere", desc: "Seven sacred vows around the holy fire.", img: "/images/ceremony_pheras.jpeg" },
    { hi: "शुभ विदाई", en: "Shubh Vidaai", desc: "Heartfelt farewell as a beautiful new journey begins.", img: "/images/ceremony_vidai.jpeg" },
];

export default function Ceremonies() {
    return (
        <section id="ceremonies" className="relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory py-16 sm:py-24" data-testid="ceremonies-section">
            <div className="pointer-events-none absolute -right-24 top-16 opacity-[0.09]">
                <Mandala className="h-80 w-80 text-gold" />
            </div>
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center">
                    <MaskLineInView>
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">Sacred Traditions</p>
                    </MaskLineInView>
                    <MaskLineInView delay={0.1}>
                        <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl">पारंपरिक समारोह</h2>
                    </MaskLineInView>
                    <Reveal delay={0.15}>
                        <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mx-auto mt-4 max-w-xl font-script text-base italic text-cocoa sm:text-lg">
                            The timeless rituals of a Hindu wedding, each one a blessing strung together with love.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {CEREMONIES.map((c, i) => (
                        <motion.article
                            key={c.en}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6 }}
                            className="group overflow-hidden rounded-3xl border border-goldline/70 bg-ivory shadow-card transition-shadow hover:shadow-gold"
                            data-testid={`ceremony-card-${c.en.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <div className="overflow-hidden border-b border-goldline/50">
                                <img
                                    src={c.img}
                                    alt={`${c.en} — traditional illustration`}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="font-devanagari text-xl text-maroon">{c.hi}</h3>
                                <p className="mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-deep">{c.en}</p>
                                <p className="mt-3 text-sm leading-relaxed text-cocoa">{c.desc}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <Reveal delay={0.1} className="mt-10 text-center">
                    <p className="font-script text-sm italic text-cocoa">Dates & timings for each ceremony will be lovingly shared by the family.</p>
                </Reveal>
            </div>
        </section>
    );
}
