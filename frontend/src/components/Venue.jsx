import { MapPin, Navigation } from "lucide-react";
import { CornerFlourish, Diya, Divider, Mandala } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";
import { useWedding } from "@/context/WeddingContext";
import { formatDateLong, mapsSearchUrl } from "@/lib/wedding";

export default function Venue() {
    const { details } = useWedding();
    const hasVenue =
        details.venueName.trim() || details.venueAddress.trim() || details.venueCityState.trim();
    const directionsUrl = details.mapsLink.trim() || mapsSearchUrl(details);

    return (
        <section id="venue" className="relative overflow-hidden py-16 sm:py-24" data-testid="venue-section">
            <div className="pointer-events-none absolute -right-24 bottom-8 opacity-[0.09]">
                <Mandala className="h-80 w-80 text-gold" />
            </div>

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center">
                    <MaskLineInView>
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">Where The Celebration Unfolds</p>
                    </MaskLineInView>
                    <MaskLineInView delay={0.1}>
                        <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl">विवाह स्थल</h2>
                    </MaskLineInView>
                    <Reveal delay={0.15}>
                        <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <div className="card-royal mt-10 overflow-hidden rounded-3xl" data-testid="venue-card">
                        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
                            {/* Decorative left panel */}
                            <div className="relative flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-blush via-cream to-peach px-6 py-12 text-center md:py-14">
                                <div className="pointer-events-none absolute inset-3 rounded-2xl border border-goldline/60" />
                                <div className="rounded-t-full rounded-b-3xl border-2 border-gold/70 bg-ivory/80 px-8 pb-8 pt-10">
                                    <Diya className="mx-auto h-12 w-16" />
                                    <p className="mt-4 font-devanagari text-4xl text-maroon">वेन्यू</p>
                                    <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">The Venue</p>
                                </div>
                                <p className="font-display text-sm font-semibold tracking-[0.2em] text-maroon">{formatDateLong(details.weddingDate)}</p>
                                {details.ceremonyTime.trim() ? (
                                    <p className="font-hindi text-sm text-cocoa">मुहूर्त · {details.ceremonyTime}</p>
                                ) : null}
                            </div>

                            {/* Details panel */}
                            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
                                <CornerFlourish className="absolute right-4 top-4 h-10 w-10 text-gold/60" />
                                {hasVenue ? (
                                    <div>
                                        <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl" data-testid="venue-name">
                                            {details.venueName.trim() || "Wedding Venue"}
                                        </h3>
                                        <Divider className="mt-4 h-5 w-44 text-gold" />
                                        {details.venueAddress.trim() ? (
                                            <p className="mt-5 flex items-start gap-3 text-base leading-relaxed text-cocoa" data-testid="venue-address">
                                                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
                                                <span>{details.venueAddress}</span>
                                            </p>
                                        ) : null}
                                        {details.venueCityState.trim() ? (
                                            <p className="mt-2 pl-7 text-base text-cocoa" data-testid="venue-city-state">{details.venueCityState}</p>
                                        ) : null}
                                        <a
                                            href={directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-testid="get-directions-google-maps-button"
                                            className="btn-shimmer mt-8 inline-flex items-center gap-3 rounded-full border border-gold-deep/40 bg-gradient-to-b from-[#E6CA65] to-[#C9A227] px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#4A3308] shadow-gold transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                                        >
                                            <Navigation className="h-4 w-4" />
                                            Get Directions
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 py-6 text-center" data-testid="venue-empty-state">
                                        <Diya className="h-10 w-14" />
                                        <h3 className="font-devanagari text-2xl text-maroon">स्थल शीघ्र ही घोषित होगा</h3>
                                        <p className="max-w-xs font-script text-base italic text-cocoa">
                                            The wedding venue will be lovingly revealed here by the family. Please check back soon.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
