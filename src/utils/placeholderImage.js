// Generates deterministic, offline SVG "photos" for mock vehicle listings.
// No network dependency — keeps the demo self-contained, per the SRS's
// note that mock data may be used in place of real assets.

const PALETTES = [
  ["#8F330B", "#5C210A"], // canyon rust shadow
  ["#3A2417", "#241206"], // canyon-shadow brown-black
  ["#5F7355", "#3E4E38"], // desert sage shadow
  ["#1F6E66", "#153F3B"], // turquoise stone shadow
  ["#B08F5C", "#7A6238"], // sandstone shadow
  ["#52453B", "#2E251F"], // warm taupe shadow
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const CAR_PATH =
  "M40 130 L58 90 Q66 74 88 74 H212 Q234 74 242 90 L260 130 Z M40 130 H260 V150 Q260 158 252 158 H228 Q220 158 220 150 V146 H80 V150 Q80 158 72 158 H48 Q40 158 40 150 Z";
const BIKE_PATH =
  "M70 150 L96 96 L150 96 L136 118 H176 L210 150 M96 96 L86 78 H70";

function vehiclePlaceholderSVG({ brand, model, type, label = "" }) {
  const seed = hashString(`${brand}-${model}-${label}`);
  const [c1, c2] = PALETTES[seed % PALETTES.length];
  const isBike = type === "Bike";
  const path = isBike ? BIKE_PATH : CAR_PATH;
  const title = `${brand} ${model}`.trim();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <g transform="translate(150,110) scale(1.15)" opacity="0.9">
    <path d="${path}" fill="none" stroke="#40E0D0" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    ${isBike ? '<circle cx="82" cy="150" r="20" fill="none" stroke="#FAF3E8" stroke-width="5"/><circle cx="196" cy="150" r="20" fill="none" stroke="#FAF3E8" stroke-width="5"/>' : '<circle cx="88" cy="158" r="18" fill="none" stroke="#FAF3E8" stroke-width="5"/><circle cx="212" cy="158" r="18" fill="none" stroke="#FAF3E8" stroke-width="5"/>'}
  </g>
  <text x="300" y="330" font-family="Oswald, sans-serif" font-size="28" font-weight="600" fill="#FAF3E8" text-anchor="middle" letter-spacing="1">${title}</text>
  ${label ? `<text x="300" y="360" font-family="Inter, sans-serif" font-size="15" fill="#E2793D" text-anchor="middle" letter-spacing="2">${label.toUpperCase()}</text>` : ""}
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getVehicleMainImage(vehicle) {
  return vehiclePlaceholderSVG({ ...vehicle, label: "Front View" });
}

export function getVehicleGallery(vehicle) {
  return ["Front View", "Side View", "Rear View", "Interior"].map((label) =>
    vehiclePlaceholderSVG({ ...vehicle, label })
  );
}
