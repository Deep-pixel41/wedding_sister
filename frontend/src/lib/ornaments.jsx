import { useId } from "react";

export function LogoMark({ className = "h-9 w-9" }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
            <circle cx="32" cy="32" r="29" fill="#FFFDF7" stroke="#D4AF37" strokeWidth="2" />
            <g fill="none" stroke="#D4AF37" strokeWidth="1.6">
                <ellipse cx="32" cy="32" rx="24" ry="9" />
                <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(45 32 32)" />
                <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(90 32 32)" />
                <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(135 32 32)" />
            </g>
            <circle cx="32" cy="32" r="7" fill="#800020" />
            <circle cx="32" cy="32" r="3" fill="#E6CA65" />
        </svg>
    );
}

export function Mandala({ className = "w-96 h-96 text-gold", strokeWidth = 0.6 }) {
    const petals = [...Array(12)];
    return (
        <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
            <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth={strokeWidth} />
            <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeDasharray="1 4" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth={strokeWidth} />
            <circle cx="100" cy="100" r="34" stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeDasharray="2 3" />
            {petals.map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                    <ellipse cx="100" cy="26" rx="10" ry="22" stroke="currentColor" strokeWidth={strokeWidth} />
                    <circle cx="100" cy="8" r="3" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
                </g>
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle key={i} cx="100" cy="47" r="2.2" fill="currentColor" opacity="0.5" transform={`rotate(${i * 60 + 30} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.75" />
        </svg>
    );
}

export function Divider({ className = "h-6 w-56 text-gold" }) {
    return (
        <svg viewBox="0 0 240 24" className={className} fill="none" aria-hidden="true">
            <line x1="8" y1="12" x2="88" y2="12" stroke="currentColor" strokeWidth="1" />
            <line x1="152" y1="12" x2="232" y2="12" stroke="currentColor" strokeWidth="1" />
            <circle cx="8" cy="12" r="2" fill="currentColor" />
            <circle cx="232" cy="12" r="2" fill="currentColor" />
            <path d="M120 4 L128 12 L120 20 L112 12 Z" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="120" cy="12" r="2.4" fill="currentColor" />
            <path d="M96 12 c4 -6 12 -6 16 0 c-4 6 -12 6 -16 0 Z" fill="currentColor" opacity="0.55" />
            <path d="M128 12 c4 -6 12 -6 16 0 c-4 6 -12 6 -16 0 Z" fill="currentColor" opacity="0.55" />
        </svg>
    );
}

export function CornerFlourish({ className = "h-16 w-16 text-gold" }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
            <path d="M2 40 C2 18 18 2 40 2" stroke="currentColor" strokeWidth="2" />
            <path d="M2 58 C2 26 26 2 58 2" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
            <path d="M10 10 c16 -3 26 6 28 20 c-14 -2 -24 -8 -28 -20 Z" fill="currentColor" opacity="0.5" />
            <circle cx="42" cy="42" r="3" fill="currentColor" />
            <circle cx="54" cy="30" r="2" fill="currentColor" opacity="0.7" />
            <circle cx="30" cy="54" r="2" fill="currentColor" opacity="0.7" />
        </svg>
    );
}

export function Diya({ className = "h-10 w-14" }) {
    const id = useId();
    return (
        <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
            <defs>
                <radialGradient id={id} cx="50%" cy="72%" r="65%">
                    <stop offset="0%" stopColor="#FFF3D6" />
                    <stop offset="55%" stopColor="#FFC24B" />
                    <stop offset="100%" stopColor="#E07B2A" />
                </radialGradient>
            </defs>
            <g className="diya-flame">
                <path d="M32 8 C27 16 26 20 26 24 a6 7 0 0 0 12 0 C38 20 37 16 32 8 Z" fill={`url(#${id})`} />
            </g>
            <path d="M8 30 C14 26 22 24 32 24 C42 24 50 26 56 30 C50 38 42 42 32 42 C22 42 14 38 8 30 Z" fill="#B8860B" opacity="0.92" />
            <path d="M8 30 C14 30 22 32 32 32 C42 32 50 30 56 30" stroke="#7A5608" strokeWidth="1" fill="none" />
        </svg>
    );
}

export function MarigoldGarland({ className = "h-14 w-full", count = 13, width = 1300 }) {
    const step = width / (count - 1);
    return (
        <svg viewBox={`0 0 ${width} 96`} preserveAspectRatio="none" className={className} aria-hidden="true">
            <path d={`M0 4 Q ${width / 2} 66 ${width} 4`} stroke="#C98A2B" strokeWidth="2.5" fill="none" />
            {[...Array(count)].map((_, i) => {
                const x = i * step;
                const t = i / (count - 1);
                const y = 4 + (1 - Math.pow(2 * t - 1, 2)) * 60;
                const r = i % 2 === 0 ? 15 : 10;
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r={r} fill={i % 2 === 0 ? "#F09819" : "#F7B733"} stroke="#C9772B" strokeWidth="1.4" />
                        <circle cx={x} cy={y} r={r * 0.42} fill="#FBC02D" />
                        <circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.16} fill="#FDE9C8" opacity="0.8" />
                    </g>
                );
            })}
        </svg>
    );
}
