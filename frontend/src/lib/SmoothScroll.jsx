import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

const Ctx = createContext(() => {});

export function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return undefined;
        }
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        lenisRef.current = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const scrollTo = useCallback((target, opts = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
            lenis.scrollTo(target, { offset: -72, ...opts });
        } else if (typeof target === "string") {
            document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: target, behavior: "smooth" });
        }
    }, []);

    return <Ctx.Provider value={scrollTo}>{children}</Ctx.Provider>;
}

export function useSmoothScroll() {
    return useContext(Ctx);
}
