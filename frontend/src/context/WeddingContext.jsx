import { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_WEDDING, STORAGE_KEY } from "@/lib/wedding";

const Ctx = createContext(null);

export function WeddingProvider({ children }) {
    const [details, setDetails] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? { ...DEFAULT_WEDDING, ...JSON.parse(raw) } : DEFAULT_WEDDING;
        } catch {
            return DEFAULT_WEDDING;
        }
    });

    const value = useMemo(
        () => ({
            details,
            saveDetails(next) {
                const merged = { ...details, ...next };
                setDetails(merged);
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                } catch {
                    /* storage unavailable (private mode) — session-only */
                }
                return merged;
            },
            resetDetails() {
                try {
                    localStorage.removeItem(STORAGE_KEY);
                } catch {
                    /* ignore */
                }
                setDetails(DEFAULT_WEDDING);
            },
        }),
        [details],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWedding() {
    return useContext(Ctx);
}
