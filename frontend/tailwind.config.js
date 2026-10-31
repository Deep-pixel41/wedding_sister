/** @type {import('tailwindcss').Config} */
module.exports = {
    // `overline` is a Tailwind utility; without this an app's own eyebrow-label class draws a line above the text.
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        ivory: '#FFFDF7',
        cream: '#FDF8EE',
        paper: '#FAF3E0',
        blush: '#FDF2F4',
        peach: '#FFF3EB',
        mint: '#F2F9F6',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6CA65',
          pale: '#F3E3AC',
          deep: '#B8860B',
          dark: '#9C7A1E'
        },
        maroon: {
          DEFAULT: '#800020',
          deep: '#5E0018'
        },
        saffron: '#FF9933',
        ink: '#2C221E',
        cocoa: '#6B5B52',
        goldline: '#E2C87C'
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        devanagari: ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
        hindi: ['"Noto Serif Devanagari"', 'serif'],
        body: ['Montserrat', '"Noto Serif Devanagari"', 'sans-serif'],
        script: ['"Cormorant Garamond"', '"Noto Serif Devanagari"', 'serif']
      },
      boxShadow: {
        gold: '0 10px 40px rgba(184, 134, 11, 0.12)',
        card: '0 6px 24px rgba(184, 134, 11, 0.10)',
        royal: '0 24px 70px rgba(128, 0, 32, 0.10)',
        glow: '0 0 32px rgba(230, 202, 101, 0.45)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-slow': 'floaty 9s ease-in-out infinite',
        pop: 'pop 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
