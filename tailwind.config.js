/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep canyon-shadow brown-black — dark surfaces (nav/hero/footer) + body/heading text
        ink: {
          DEFAULT: "#2B1810",
          light: "#4A2C1C",
          dark: "#1A0E08",
        },
        // Warm sand — page background
        cream: "#FAF3E8",
        // Canyon Rust — primary brand accent / CTAs
        amber: {
          DEFAULT: "#B7410E",
          dark: "#8F330B",
          light: "#E2793D",
        },
        // Warm taupe — muted secondary text
        asphalt: {
          DEFAULT: "#7A6A5D",
          light: "#A89A8A",
          dark: "#52453B",
        },
        // Desert Sage, deepened — success / price / positive accents
        deal: {
          DEFAULT: "#5F7355",
          light: "#E9EFE3",
        },
        danger: "#A13A2A",
        // Desert Sage, true tone — secondary accents, borders, tints
        sage: {
          DEFAULT: "#9AA992",
          light: "#C7D0C0",
          dark: "#74846A",
        },
        // Turquoise Stone — vivid highlight accent, used sparingly
        turquoise: {
          DEFAULT: "#40E0D0",
          dark: "#2BB5A8",
          light: "#A8ECE4",
        },
        // Sandstone Beige, true tone — warm neutral surfaces
        sandstone: {
          DEFAULT: "#D2B48C",
          light: "#E9DAC0",
          dark: "#B08F5C",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(43,24,16,0.07), 0 1px 12px rgba(43,24,16,0.07)",
        "card-hover": "0 8px 24px rgba(43,24,16,0.16)",
      },
    },
  },
  plugins: [],
};
