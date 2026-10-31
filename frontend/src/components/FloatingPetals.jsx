import { useEffect, useRef } from "react";

const PETAL_COLORS = [
    ["#F6C6C9", 0.9],
    ["#FBE3D6", 0.9],
    ["#F3D9B1", 0.8],
    ["#F7D8D8", 0.85],
    ["#DCE9DC", 0.8],
];

export default function FloatingPetals() {
    const ref = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return undefined;
        }
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let W = 0, H = 0, raf;

        const resize = () => {
            W = canvas.clientWidth;
            H = canvas.clientHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const spawn = (anyY) => ({
            x: Math.random() * W,
            y: anyY ? Math.random() * H : -24,
            s: 5 + Math.random() * 8,
            vy: 0.3 + Math.random() * 0.55,
            vx: (Math.random() - 0.5) * 0.35,
            a: Math.random() * Math.PI * 2,
            va: (Math.random() - 0.5) * 0.02,
            c: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
            sway: Math.random() * 6,
        });

        const petals = Array.from({ length: 16 }, () => spawn(true));
        const sparkles = Array.from({ length: 12 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 0.8 + Math.random() * 1.5,
            ph: Math.random() * Math.PI * 2,
            sp: 0.5 + Math.random(),
        }));

        let t = 0;
        const draw = () => {
            t += 0.016;
            ctx.clearRect(0, 0, W, H);
            for (const p of petals) {
                p.y += p.vy;
                p.x += p.vx + Math.sin(t + p.sway) * 0.3;
                p.a += p.va;
                if (p.y > H + 30) Object.assign(p, spawn(false));
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.a);
                ctx.globalAlpha = p.c[1];
                ctx.fillStyle = p.c[0];
                ctx.beginPath();
                ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            for (const s of sparkles) {
                const al = 0.3 + 0.3 * Math.sin(t * s.sp + s.ph);
                ctx.globalAlpha = al;
                ctx.fillStyle = "#E6C15C";
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = al * 0.45;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            className="pointer-events-none fixed inset-0 z-[5]"
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
        />
    );
}
