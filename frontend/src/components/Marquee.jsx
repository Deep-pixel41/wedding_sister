const ITEMS = [
    "शुभ विवाह",
    "सात फेरे",
    "वरमाला",
    "दो दिलों का मिलन",
    "सात जन्मों का संगम",
    "मंगलमय",
    "शुभ आशीर्वाद",
    "शुभ मंगलमय जीवन",
];

function Diamond() {
    return (
        <svg className="h-3 w-3 shrink-0 text-gold" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
        </svg>
    );
}

function Row({ hidden }) {
    return (
        <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {ITEMS.map((it, i) => (
                <span key={i} className="flex items-center">
                    <span className="whitespace-nowrap px-6 font-devanagari text-xl text-maroon sm:text-2xl">{it}</span>
                    <Diamond />
                </span>
            ))}
        </div>
    );
}

// One slow editorial marquee — a single looping track.
export default function Marquee() {
    return (
        <div className="relative overflow-hidden border-y border-goldline/60 bg-gradient-to-r from-blush via-cream to-peach py-4" data-testid="wedding-marquee">
            <div className="animate-marquee flex w-max">
                <Row />
                <Row hidden />
            </div>
        </div>
    );
}
