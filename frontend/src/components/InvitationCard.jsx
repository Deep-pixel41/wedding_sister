import { CornerFlourish, Diya, Divider } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";
import { useWedding } from "@/context/WeddingContext";
import { formatDateLong } from "@/lib/wedding";

const DEFAULT_MESSAGE =
    "Two beautiful souls, two loving families, and one sacred bond. With the blessings of our elders and the grace of the Almighty, we invite you to be a part of this joyous celebration.";

export default function InvitationCard() {
    const { details } = useWedding();
    const message = details.invitationMessage.trim() || DEFAULT_MESSAGE;

    return (
        <section id="invitation" className="relative overflow-hidden py-16 sm:py-24" data-testid="invitation-section">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <div className="text-center">
                    <MaskLineInView>
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">The Wedding Invitation</p>
                    </MaskLineInView>
                    <MaskLineInView delay={0.1}>
                        <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl">विवाह निमंत्रण</h2>
                    </MaskLineInView>
                    <Reveal delay={0.15}>
                        <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <div className="card-royal relative mt-10 rounded-3xl px-6 py-10 text-center sm:px-12 sm:py-14" data-testid="invitation-card">
                        <CornerFlourish className="absolute left-3 top-3 h-12 w-12 text-gold/70" />
                        <CornerFlourish className="absolute right-3 top-3 h-12 w-12 rotate-90 text-gold/70" />
                        <CornerFlourish className="absolute bottom-3 right-3 h-12 w-12 rotate-180 text-gold/70" />
                        <CornerFlourish className="absolute bottom-3 left-3 h-12 w-12 -rotate-90 text-gold/70" />

                        <p className="mx-auto max-w-xl font-script text-lg italic leading-relaxed text-ink sm:text-xl" data-testid="invitation-message">
                            {message}
                        </p>

                        <Divider className="mx-auto mt-8 h-6 w-48 text-gold" />

                        <div className="mt-8 grid gap-8 sm:grid-cols-2" data-testid="invitation-families">
                            <div>
                                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">The Bride</p>
                                <p className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl" data-testid="invitation-bride-name">{details.brideName}</p>
                                {details.brideParents.trim() ? (
                                    <p className="mt-2 font-script text-base italic text-cocoa">Daughter of {details.brideParents}</p>
                                ) : null}
                            </div>
                            <div>
                                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">The Groom</p>
                                <p className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl" data-testid="invitation-groom-name">{details.groomName}</p>
                                {details.groomParents.trim() ? (
                                    <p className="mt-2 font-script text-base italic text-cocoa">Son of {details.groomParents}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col items-center gap-3">
                            <Diya className="h-9 w-12" />
                            <p className="font-display text-lg font-semibold tracking-[0.15em] text-maroon" data-testid="invitation-date">
                                {formatDateLong(details.weddingDate)}
                            </p>
                            {details.ceremonyTime.trim() ? (
                                <p className="font-hindi text-sm text-cocoa" data-testid="invitation-time">मुहूर्त · {details.ceremonyTime}</p>
                            ) : null}
                            {details.hostFamilyName.trim() ? (
                                <p className="mt-4 font-script text-base italic text-cocoa" data-testid="invitation-host-family">
                                    With love & gratitude, {details.hostFamilyName}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
