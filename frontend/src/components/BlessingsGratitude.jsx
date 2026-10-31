import { Diya, Divider, LogoMark, Mandala, MarigoldGarland } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";
import { useWedding } from "@/context/WeddingContext";
import { formatDateLong } from "@/lib/wedding";

export default function BlessingsGratitude() {
    const { details } = useWedding();
    return (
        <section id="blessings" className="relative overflow-hidden bg-gradient-to-b from-ivory via-blush to-cream py-16 sm:py-24" data-testid="gratitude-section">
            <div className="pointer-events-none absolute -right-28 top-10 opacity-[0.1]">
                <Mandala className="h-96 w-96 text-gold" />
            </div>

            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                <MaskLineInView>
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">With Gratitude & Love</p>
                </MaskLineInView>

                <Reveal delay={0.1}>
                    <div className="mt-8 flex items-end justify-center gap-5" data-testid="gratitude-diyas">
                        <Diya className="h-8 w-12 opacity-80" />
                        <Diya className="h-11 w-16" />
                        <Diya className="h-8 w-12 opacity-80" />
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <p className="mx-auto mt-8 max-w-xl font-script text-lg italic leading-relaxed text-ink sm:text-xl" data-testid="gratitude-english">
                        Your presence, love, and blessings will make this celebration even more special. Join us as we celebrate the beautiful beginning of a lifetime of togetherness.
                    </p>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-10 font-devanagari text-3xl leading-relaxed text-maroon drop-shadow-[0_2px_16px_rgba(212,175,55,0.35)] sm:text-4xl" data-testid="gratitude-hindi">
                        <span className="gold-text">आपका आशीर्वाद ही हमारा सबसे अनमोल उपहार है।</span>
                    </p>
                </Reveal>

                <Reveal delay={0.25}>
                    <Divider className="mx-auto mt-10 h-6 w-56 text-gold" />
                </Reveal>

                <Reveal delay={0.3}>
                    <p className="mt-8 font-devanagari text-xl text-maroon sm:text-2xl" data-testid="gratitude-invitation-line">सादर आमंत्रित – परिवार सहित</p>
                    {details.hostFamilyName.trim() ? (
                        <p className="mt-2 font-script text-base italic text-cocoa">{details.hostFamilyName}</p>
                    ) : null}
                </Reveal>
            </div>

            <footer className="relative mt-16 border-t border-goldline/50 pt-10 text-center" data-testid="site-footer">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 sm:px-6">
                    <LogoMark className="h-12 w-12" />
                    <p className="font-devanagari text-2xl text-maroon">शुभ विवाह | शुभ मंगलमय जीवन</p>
                    <p className="font-script text-base italic text-cocoa" data-testid="footer-names">
                        {details.brideName} & {details.groomName} · {formatDateLong(details.weddingDate)}
                    </p>
                    <MarigoldGarland className="mt-4 h-10 w-full max-w-xl" count={9} />
                </div>
            </footer>
        </section>
    );
}
