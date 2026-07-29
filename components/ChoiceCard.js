/**
 * ChoiceCard Component for Quiz Options
 * @param {Object} props
 * @param {string} props.letter - Option letter (A, B, C, D)
 * @param {string} props.text - Choice text content
 * @param {boolean} [props.isSelected=false] - Whether option is selected
 * @param {Function} [props.onClick] - Click event handler
 * @returns {HTMLButtonElement}
 */
export function createChoiceCard({ letter = 'A', text = '', isSelected = false, onClick } = {}) {
  const card = document.createElement('button');
  card.className = `choice-card ${isSelected ? 'selected' : ''}`;
  card.type = 'button';

  card.innerHTML = `
    <span class="choice-index">${letter}</span>
    <span style="flex: 1;">${text}</span>
  `;

  if (typeof onClick === 'function') {
    card.addEventListener('click', (e) => {
      onClick(e, { letter, text });
    });
  }

  return card;
}
