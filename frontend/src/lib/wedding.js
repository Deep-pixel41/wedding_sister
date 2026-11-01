export const STORAGE_KEY = "royal_wedding_host_customization";

export const HOST_PIN = "2026";
export const HOST_UNLOCK_KEY = "royal_wedding_host_unlocked";

export const DEFAULT_WEDDING = {
    brideName: "Ragini Verma",
    groomName: "Pankaj Kumar Verma",

    brideParents: "Shri Banarsi Prasad Verma & Smt. Shakuntla Devi",
    groomParents: "Shri Nand Kumar Verma & Smt. Radhika Verma",

    weddingDate: "2026-12-11",
    ceremonyTime: "6:00 PM",

    venueName: "MG Banquet Hall",
    venueAddress: "Opposite Mathura Degree College, Near Kotwari Mod, Rasra, Uttar Pradesh - 221712",
    venueCityState: "Rasra, Ballia, Uttar Pradesh",

    mapsLink: "https://www.google.com/maps?q=25.85572203842347,83.8634528247932",

    hostFamilyName: "The Verma Family",
    invitationMessage: "🙏 श्री गणेशाय नमः 🙏\n\nWith the divine blessings of भगवान श्री गणेश जी and our respected elders,\n\nWe cordially invite you and your family to grace the auspicious wedding ceremony of our beloved Ragini & Pankaj Kumar Verma.\n\nYour gracious presence, love, and blessings will make this joyous occasion even more memorable.\n\nसपरिवार पधारकर नवविवाहित जोड़े को अपना स्नेह एवं शुभाशीष प्रदान करें।\n\nआपकी गरिमामयी उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है।\n\nसादर आमंत्रित\nसमस्त वर्मा परिवार ❤️",
};

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export function formatDateLong(dateStr) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((dateStr || "").trim());
    if (!m) return dateStr || "";
    return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

export function formatDateParts(dateStr) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((dateStr || "").trim());
    if (!m) return null;
    return {
        day: String(parseInt(m[3], 10)),
        month: MONTHS[parseInt(m[2], 10) - 1],
        year: m[1],
    };
}

// Epoch (ms) for the wedding moment in IST (UTC+05:30), regardless of the
// visitor's device timezone.
export function getWeddingTarget(dateStr, timeStr) {
    const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec((dateStr || "").trim());

    const y = d ? +d[1] : 2026;
    const mo = d ? +d[2] : 12;
    const day = d ? +d[3] : 11;

    let hh = 0;
    let mm = 0;

    const t = (timeStr || "").trim().toLowerCase()
        .match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?$/);

    if (t) {
        hh = +t[1] % 24;
        mm = t[2] ? +t[2] : 0;

        if (t[3] && t[3].startsWith("p") && hh !== 12) hh += 12;
        if (t[3] && t[3].startsWith("a") && hh === 12) hh = 0;
    }

    return Date.UTC(y, mo - 1, day, hh - 5, mm - 30);
}

export function mapsSearchUrl(venue) {
    const q = [venue.venueName, venue.venueAddress, venue.venueCityState]
        .map((s) => (s || "").trim())
        .filter(Boolean)
        .join(", ");
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
