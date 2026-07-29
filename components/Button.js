/**
 * Reusable Button Component
 * @param {Object} props
 * @param {string} props.text - Button text
 * @param {'primary' | 'outline' | 'secondary'} [props.variant='primary'] - Button style variant
 * @param {string} [props.icon] - Optional emoji/icon string
 * @param {Function} [props.onClick] - Click handler callback
 * @returns {HTMLButtonElement}
 */
export function createButton({ text, variant = 'primary', icon = '', onClick } = {}) {
  const btn = document.createElement('button');
  btn.className = `btn btn-${variant}`;
  
  if (icon) {
    btn.innerHTML = `<span style="font-size: 18px;">${icon}</span> <span>${text}</span>`;
  } else {
    btn.textContent = text;
  }

  if (typeof onClick === 'function') {
    btn.addEventListener('click', onClick);
  }

  return btn;
}
