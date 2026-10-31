import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className, once = true }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.15 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

// Hero-only: masked line-by-line reveal fired on load.
export function MaskLine({ children, delay = 0, className = "" }) {
    return (
        <span className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// Scroll-triggered masked reveal for section headlines.
export function MaskLineInView({ children, delay = 0, className = "" }) {
    return (
        <span className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block"
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}
