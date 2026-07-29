/**
 * RadarChart Component (SVG-based 6-axis radar polygon chart)
 * @param {Object} props
 * @param {Object} props.scores - { idea, maker, strategy, collabo, analyst, action } (values 0 ~ 100)
 * @returns {HTMLElement}
 */
export function createRadarChart({ scores = {} } = {}) {
  const container = document.createElement('div');
  container.className = 'radar-chart-container';

  const defaultScores = {
    idea: scores.idea || 70,
    maker: scores.maker || 60,
    strategy: scores.strategy || 80,
    collabo: scores.collabo || 90,
    analyst: scores.analyst || 50,
    action: scores.action || 85,
  };

  const labels = [
    { key: 'idea', text: '아이디어' },
    { key: 'maker', text: '제작' },
    { key: 'strategy', text: '전략' },
    { key: 'collabo', text: '협업' },
    { key: 'analyst', text: '분석' },
    { key: 'action', text: '실행' },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 100;
  const numAxes = 6;
  const angleStep = (2 * Math.PI) / numAxes;

  // Helper to calculate coordinates
  const getCoords = (valueRatio, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const r = radius * valueRatio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate grid webs (3 concentric polygons)
  let gridPolygons = '';
  [0.33, 0.66, 1.0].forEach(level => {
    const points = labels.map((_, i) => {
      const { x, y } = getCoords(level, i);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    gridPolygons += `<polygon points="${points}" fill="none" stroke="#E9ECEF" stroke-width="1.5"/>`;
  });

  // Generate axis lines
  let axisLines = '';
  labels.forEach((_, i) => {
    const { x, y } = getCoords(1.0, i);
    axisLines += `<line x1="${center}" y1="${center}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E9ECEF" stroke-width="1.5"/>`;
  });

  // Data polygon points
  const dataPoints = labels.map((item, i) => {
    const scoreVal = Math.min(100, Math.max(10, defaultScores[item.key] || 20));
    const ratio = scoreVal / 100;
    const { x, y } = getCoords(ratio, i);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Labels positioned outside the outer radius
  let textLabels = '';
  labels.forEach((item, i) => {
    const { x, y } = getCoords(1.22, i);
    textLabels += `
      <text x="${x.toFixed(1)}" y="${y.toFixed(1)}" 
            text-anchor="middle" dominant-baseline="middle" 
            font-size="13" font-weight="700" fill="#2D3436">
        ${item.text}
      </text>
    `;
  });

  container.innerHTML = `
    <svg class="radar-chart-svg" viewBox="0 0 ${size} ${size}">
      ${gridPolygons}
      ${axisLines}
      <!-- Data Area -->
      <polygon points="${dataPoints}" 
               fill="rgba(108, 92, 231, 0.25)" 
               stroke="#6C5CE7" 
               stroke-width="2.5" 
               stroke-linejoin="round"/>
      ${textLabels}
    </svg>
  `;

  return container;
}
