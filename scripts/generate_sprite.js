const fs = require('fs');
const path = require('path');

// Generate 15 cols x 7 rows (105 characters) OpenPeeps style SVG sprite grid
const cols = 15;
const rows = 7;
const cellWidth = 100;
const cellHeight = 180;
const totalWidth = cols * cellWidth;
const totalHeight = rows * cellHeight;

let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <style>
    .bg { fill: transparent; }
    .skin { fill: #ffffff; stroke: #000000; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .hair { fill: #000000; }
    .feature { fill: none; stroke: #000000; stroke-width: 2.5; stroke-linecap: round; }
    .dot { fill: #000000; }
  </style>
`;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const x = c * cellWidth;
    const y = r * cellHeight;
    const idx = r * cols + c;

    const cx = x + cellWidth / 2;
    const cy = y + cellHeight * 0.4;
    const rHead = cellWidth * 0.3;

    svgContent += `
    <!-- Peep ${idx} -->
    <g id="peep_${idx}">
      <!-- Torso -->
      <path class="skin" d="M ${cx - 40} ${y + cellHeight} L ${cx - 32} ${y + cellHeight * 0.65} Q ${cx} ${y + cellHeight * 0.58} ${cx + 32} ${y + cellHeight * 0.65} L ${cx + 40} ${y + cellHeight} Z" />
      <!-- Collar -->
      <path class="feature" d="M ${cx - 15} ${y + cellHeight * 0.62} L ${cx} ${y + cellHeight * 0.75} L ${cx + 15} ${y + cellHeight * 0.62}" />
      <!-- Neck -->
      <rect class="skin" x="${cx - 8}" y="${cy + 15}" width="16" height="20" />
      <!-- Head -->
      <circle class="skin" cx="${cx}" cy="${cy}" r="${rHead}" />
    `;

    // Hair variations
    const hairType = idx % 8;
    if (hairType === 0) {
      // Big Afro
      svgContent += `
        <circle class="hair" cx="${cx - 20}" cy="${cy - 12}" r="${rHead * 0.65}" />
        <circle class="hair" cx="${cx}" cy="${cy - 24}" r="${rHead * 0.75}" />
        <circle class="hair" cx="${cx + 20}" cy="${cy - 12}" r="${rHead * 0.65}" />
      `;
    } else if (hairType === 1) {
      // Beanie
      svgContent += `
        <path class="hair" d="M ${cx - rHead} ${cy} A ${rHead} ${rHead} 0 0 1 ${cx + rHead} ${cy} Z" />
        <rect class="skin" x="${cx - rHead - 2}" y="${cy - 8}" width="${rHead * 2 + 4}" height="14" rx="3" />
      `;
    } else if (hairType === 2) {
      // Cap
      svgContent += `
        <rect class="hair" x="${cx - rHead}" y="${cy - rHead - 4}" width="${rHead * 2}" height="${rHead}" rx="4" />
        <path class="feature" d="M ${cx - rHead - 10} ${cy - 4} L ${cx - 5} ${cy - 4}" />
      `;
    } else if (hairType === 3) {
      // Wavy Long Hair
      svgContent += `
        <path class="hair" d="M ${cx - rHead - 5} ${cy + 25} L ${cx - rHead - 5} ${cy - 10} A ${rHead + 5} ${rHead + 5} 0 0 1 ${cx + rHead + 5} ${cy - 10} L ${cx + rHead + 5} ${cy + 25} Z" />
      `;
    } else if (hairType === 4) {
      // Spiky Hair
      svgContent += `
        <path class="hair" d="M ${cx - 25} ${cy - 10} L ${cx - 15} ${cy - 35} L ${cx - 5} ${cy - 15} L ${cx + 5} ${cy - 38} L ${cx + 15} ${cy - 15} L ${cx + 25} ${cy - 32} L ${cx + 30} ${cy - 5} Z" />
      `;
    } else {
      // Short Hair
      svgContent += `
        <path class="hair" d="M ${cx - rHead} ${cy - 5} A ${rHead} ${rHead} 0 0 1 ${cx + rHead} ${cy - 5} Z" />
      `;
    }

    // Glasses or Dot Eyes
    if (idx % 2 === 0) {
      svgContent += `
        <circle class="feature" cx="${cx - 12}" cy="${cy - 2}" r="9" />
        <circle class="feature" cx="${cx + 12}" cy="${cy - 2}" r="9" />
        <line class="feature" x1="${cx - 3}" y1="${cy - 2}" x2="${cx + 3}" y2="${cy - 2}" />
        <circle class="dot" cx="${cx - 12}" cy="${cy - 2}" r="2.5" />
        <circle class="dot" cx="${cx + 12}" cy="${cy - 2}" r="2.5" />
      `;
    } else {
      svgContent += `
        <circle class="dot" cx="${cx - 12}" cy="${cy - 2}" r="3" />
        <circle class="dot" cx="${cx + 12}" cy="${cy - 2}" r="3" />
      `;
    }

    // Nose & Mouth
    svgContent += `
      <circle class="dot" cx="${cx}" cy="${cy + 6}" r="2" />
      <path class="feature" d="M ${cx - 8} ${cy + 16} Q ${cx} ${cy + 22} ${cx + 8} ${cy + 16}" />
    </g>
    `;
  }
}

svgContent += `</svg>`;

const outputPath = path.join(__dirname, '..', 'public', 'images', 'peeps', 'all-peeps.png');
// Save SVG file as all-peeps.png / svg so browser can load natively
fs.writeFileSync(path.join(__dirname, '..', 'public', 'images', 'peeps', 'all-peeps.svg'), svgContent);
fs.writeFileSync(outputPath, svgContent);

console.log('OpenPeeps SVG & PNG sprite sheet generated successfully!');
