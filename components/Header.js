/**
 * Header Component
 * @param {Object} props
 * @param {string} [props.logoText='나의 창업 DNA']
 * @param {string} [props.badgeText='STI Test']
 * @returns {HTMLElement}
 */
export function createHeader({ logoText = '나의 창업 DNA', badgeText = 'STI Test' } = {}) {
  const header = document.createElement('header');
  header.className = 'app-header';

  header.innerHTML = `
    <a href="#" class="header-logo">
      <span style="font-size: 20px;">🚀</span>
      <span>${logoText}</span>
    </a>
    <span class="header-tag">${badgeText}</span>
  `;

  return header;
}
