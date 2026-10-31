import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Divider, Mandala } from "@/lib/ornaments";
import { MaskLineInView, Reveal } from "@/lib/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlessingWall() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [blessings, setBlessings] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const load = async () => {
        try {
            const res = await fetch(`${API}/blessings`);
            const data = await res.json();
            setBlessings(Array.isArray(data) ? data : []);
        } catch {
            /* offline — keep whatever we have */
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) {
            toast.error("Please add your name and a small blessing.");
            return;
        }
        setSending(true);
        try {
            const res = await fetch(`${API}/blessings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim().slice(0, 80),
                    message: message.trim().slice(0, 500),
                }),
            });
            if (!res.ok) throw new Error("failed");
            toast.success("Your blessings have reached the couple. धन्यवाद!");
            setName("");
            setMessage("");
            load();
        } catch {
            toast.error("Could not send your blessing. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="ashirwad" className="paper-texture relative overflow-hidden py-16 sm:py-24" data-testid="blessing-wall-section">
            <div className="pointer-events-none absolute -left-24 top-16 opacity-[0.1]">
                <Mandala className="h-72 w-72 text-gold" />
            </div>

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center">
                    <MaskLineInView>
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-deep">Ashirwad Wall</p>
                    </MaskLineInView>
                    <MaskLineInView delay={0.1}>
                        <h2 className="mt-3 font-devanagari text-3xl text-maroon sm:text-4xl">आपका आशीर्वाद</h2>
                    </MaskLineInView>
                    <Reveal delay={0.15}>
                        <Divider className="mx-auto mt-4 h-6 w-56 text-gold" />
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mx-auto mt-4 max-w-xl font-script text-base italic text-cocoa sm:text-lg">
                            Write a small blessing for the couple — your words will be treasured on this wall.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <form onSubmit={submit} className="card-royal mx-auto mt-10 max-w-2xl rounded-3xl px-6 py-8 sm:px-10" data-testid="blessing-form">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label htmlFor="blessing-name" className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-deep">Your Name</label>
                                <Input
                                    id="blessing-name"
                                    data-testid="blessing-name-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Priya & Family"
                                    maxLength={80}
                                    className="mt-2 border-goldline/70 bg-ivory focus-visible:ring-gold"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="blessing-message" className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-deep">Your Blessing</label>
                            <Textarea
                                id="blessing-message"
                                data-testid="blessing-message-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="May your bond grow stronger with every sunrise…"
                                rows={4}
                                maxLength={500}
                                className="mt-2 border-goldline/70 bg-ivory focus-visible:ring-gold"
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <Button
                                type="submit"
                                disabled={sending}
                                data-testid="blessing-submit-button"
                                className="btn-shimmer rounded-full border border-gold-deep/40 bg-gradient-to-b from-[#E6CA65] to-[#C9A227] px-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#4A3308] shadow-gold hover:from-[#F0D67C] hover:to-[#D4AF37]"
                            >
                                <Heart className="mr-2 h-4 w-4" />
                                {sending ? "Sending…" : "Send Blessings"}
                            </Button>
                        </div>
                    </form>
                </Reveal>

                <div className="mt-12">
                    {loaded && blessings.length === 0 ? (
                        <p className="text-center font-script text-base italic text-cocoa" data-testid="blessing-empty-state">
                            The wall awaits its first blessing — be the one to grace it.
                        </p>
                    ) : (
                        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3" data-testid="blessing-wall">
                            {blessings.map((b) => (
                                <Reveal key={b.id} className="mb-5 break-inside-avoid">
                                    <figure
                                        data-testid="blessing-card"
                                        className="rounded-2xl border border-goldline/70 bg-gradient-to-b from-ivory to-cream px-6 py-6 shadow-card"
                                    >
                                        <blockquote className="font-hindi text-base leading-relaxed text-ink">“{b.message}”</blockquote>
                                        <figcaption className="mt-4 font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                                            — {b.name}
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
