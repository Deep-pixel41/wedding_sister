import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, KeyRound, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useWedding } from "@/context/WeddingContext";
import { HOST_PIN, HOST_UNLOCK_KEY } from "@/lib/wedding";
import { LogoMark } from "@/lib/ornaments";

const BLANK_FORM = {
    brideName: "",
    groomName: "",
    brideParents: "",
    groomParents: "",
    weddingDate: "2026-12-11",
    ceremonyTime: "",
    venueName: "",
    venueAddress: "",
    venueCityState: "",
    mapsLink: "",
    hostFamilyName: "",
    invitationMessage: "",
};

function PinGate({ onUnlock }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (pin.trim() === HOST_PIN) {
            sessionStorage.setItem(HOST_UNLOCK_KEY, "1");
            onUnlock();
        } else {
            setError(true);
            setPin("");
        }
    };

    return (
        <div className="paper-texture flex min-h-screen items-center justify-center px-4" data-testid="host-pin-gate">
            <form onSubmit={submit} className="card-royal w-full max-w-sm rounded-3xl px-8 py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-goldline bg-cream">
                    <KeyRound className="h-6 w-6 text-gold-deep" />
                </div>
                <h1 className="mt-5 font-devanagari text-2xl text-maroon">Host Mode</h1>
                <p className="mt-2 font-script text-sm italic text-cocoa">Enter your host PIN to open the customization panel.</p>
                <Input
                    type="password"
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => {
                        setPin(e.target.value);
                        setError(false);
                    }}
                    placeholder="• • • •"
                    data-testid="host-pin-input"
                    aria-label="Host PIN"
                    className="mt-6 border-goldline/70 bg-ivory text-center font-display text-xl tracking-[0.5em] focus-visible:ring-gold"
                />
                {error ? (
                    <p className="mt-3 text-sm font-medium text-maroon" data-testid="host-pin-error">Incorrect PIN. Please try again.</p>
                ) : null}
                <Button
                    type="submit"
                    data-testid="host-pin-submit-button"
                    className="btn-shimmer mt-6 w-full rounded-full border border-gold-deep/40 bg-gradient-to-b from-[#E6CA65] to-[#C9A227] font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#4A3308] shadow-gold hover:from-[#F0D67C] hover:to-[#D4AF37]"
                >
                    Unlock Panel
                </Button>
                <Link to="/" className="mt-5 block font-display text-[10px] uppercase tracking-[0.25em] text-cocoa hover:text-maroon" data-testid="host-back-to-invitation-link">
                    ← Back to invitation
                </Link>
            </form>
        </div>
    );
}

export default function HostPanel() {
    const { details, saveDetails, resetDetails } = useWedding();
    const [unlocked, setUnlocked] = useState(
        () => sessionStorage.getItem(HOST_UNLOCK_KEY) === "1",
    );
    const [form, setForm] = useState(details);

    useEffect(() => {
        setForm(details);
    }, [details]);

    if (!unlocked) {
        return <PinGate onUnlock={() => setUnlocked(true)} />;
    }

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const save = (e) => {
        e.preventDefault();
        if (!form.brideName.trim() || !form.groomName.trim()) {
            toast.error("Bride's and groom's full names are required.");
            return;
        }
        if (!form.weddingDate) {
            toast.error("Please choose the wedding date.");
            return;
        }
        saveDetails(form);
        toast.success("Wedding details saved — the invitation now shows your details.");
    };

    const reset = () => {
        resetDetails();
        setForm(BLANK_FORM);
        toast("All details were reset to the demo invitation on this device.");
    };

    const field = (key, label, opts = {}) => (
        <div className={opts.full ? "sm:col-span-2" : ""}>
            <Label htmlFor={`host-${key}`} className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                {label}
            </Label>
            {opts.textarea ? (
                <Textarea
                    id={`host-${key}`}
                    data-testid={`host-field-${key}`}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={opts.placeholder}
                    rows={opts.rows || 3}
                    maxLength={opts.maxLength}
                    className="mt-2 border-goldline/70 bg-ivory focus-visible:ring-gold"
                />
            ) : (
                <Input
                    id={`host-${key}`}
                    data-testid={`host-field-${key}`}
                    type={opts.type || "text"}
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={opts.placeholder}
                    maxLength={opts.maxLength}
                    className="mt-2 border-goldline/70 bg-ivory focus-visible:ring-gold"
                />
            )}
        </div>
    );

    return (
        <div className="paper-texture min-h-screen px-4 py-10 sm:px-6" data-testid="host-panel">
            <div className="mx-auto max-w-3xl">
                <header className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
                    <div className="flex items-center gap-3">
                        <LogoMark className="h-10 w-10" />
                        <div>
                            <h1 className="font-devanagari text-2xl text-maroon" data-testid="host-panel-title">Host Customization Panel</h1>
                            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-deep">Shubh Vivah · Private Host Mode</p>
                        </div>
                    </div>
                    <Link
                        to="/"
                        data-testid="host-form-preview-button"
                        className="inline-flex items-center gap-2 rounded-full border border-goldline bg-ivory px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/80 shadow-card transition hover:text-maroon"
                    >
                        <Eye className="h-4 w-4" />
                        Preview Invitation
                    </Link>
                </header>

                <form onSubmit={save} className="card-royal mt-8 rounded-3xl px-6 py-8 sm:px-10 sm:py-10" data-testid="host-form">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {field("brideName", "Bride's Full Name *", { placeholder: "e.g. Ananya Sharma" })}
                        {field("groomName", "Groom's Full Name *", { placeholder: "e.g. Vivaan Malhotra" })}
                        {field("brideParents", "Bride's Parents' Names (optional)", { placeholder: "e.g. Mr. & Mrs. Rajesh Sharma" })}
                        {field("groomParents", "Groom's Parents' Names (optional)", { placeholder: "e.g. Mr. & Mrs. Devraj Malhotra" })}
                        {field("weddingDate", "Wedding Date *", { type: "date" })}
                        {field("ceremonyTime", "Ceremony Time (optional)", { placeholder: "e.g. 7:00 PM" })}
                        {field("venueName", "Venue Name", { placeholder: "e.g. The Royal Palace Lawns" })}
                        {field("venueCityState", "City & State", { placeholder: "e.g. Jaipur, Rajasthan" })}
                        {field("venueAddress", "Complete Venue Address", { textarea: true, rows: 3, full: true, placeholder: "House / hotel / street / landmark…" })}
                        {field("mapsLink", "Google Maps Link (optional)", { full: true, placeholder: "Paste a Google Maps share link for exact directions" })}
                        {field("hostFamilyName", "Host / Family Name (optional)", { placeholder: "e.g. The Sharma Family" })}
                        {field("invitationMessage", "Personal Invitation Message (optional)", { textarea: true, rows: 3, full: true, placeholder: "A heartfelt line from your family… (leave empty to use the classic wording)" })}
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button
                            type="submit"
                            data-testid="host-form-save-button"
                            className="btn-shimmer w-full rounded-full border border-gold-deep/40 bg-gradient-to-b from-[#E6CA65] to-[#C9A227] px-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#4A3308] shadow-gold hover:from-[#F0D67C] hover:to-[#D4AF37] sm:w-auto"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Wedding Details
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    data-testid="host-form-reset-button"
                                    className="w-full rounded-full border-maroon/40 px-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-maroon hover:bg-blush hover:text-maroon-deep sm:w-auto"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset Details
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-goldline bg-ivory" data-testid="host-reset-confirm-dialog">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="font-devanagari text-xl text-maroon">Reset all wedding details?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-cocoa">
                                        This clears the saved details on this device and restores the demo invitation. This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel data-testid="host-reset-cancel-button">Cancel</AlertDialogCancel>
                                    <AlertDialogAction data-testid="host-reset-confirm-button" className="bg-maroon text-ivory hover:bg-maroon-deep" onClick={reset}>
                                        Yes, reset details
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>

                <div className="mt-6 rounded-2xl border border-goldline/60 bg-cream/80 px-6 py-5 text-sm leading-relaxed text-cocoa" data-testid="host-panel-note">
                    <p className="font-medium text-ink">How saving works</p>
                    <p className="mt-2">
                        Details are stored privately in this browser's storage (localStorage), so they stay after refreshing or reopening on this device. The
                        invitation at the home address always shows these details on this device. The PIN keeps casual guests out of this panel, but it is not
                        real security — don't store anything sensitive here.
                    </p>
                </div>
            </div>
        </div>
    );
}
