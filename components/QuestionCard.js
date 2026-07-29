import { createChoiceCard } from './ChoiceCard.js';

/**
 * QuestionCard Component
 * @param {Object} props
 * @param {string} props.question - Question text
 * @param {Array<{ letter: string, text: string, type: string }>} props.options - Option list
 * @param {Function} props.onSelectOption - Callback when an option is selected
 * @returns {HTMLElement}
 */
export function createQuestionCard({ question, options = [], onSelectOption } = {}) {
  const container = document.createElement('div');
  container.className = 'question-card';

  const title = document.createElement('h2');
  title.className = 'question-title';
  title.textContent = question;
  container.appendChild(title);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  const letters = ['A', 'B', 'C', 'D'];

  options.forEach((opt, idx) => {
    const letter = opt.letter || letters[idx] || `${idx + 1}`;
    const choiceCard = createChoiceCard({
      letter,
      text: opt.text,
      onClick: () => {
        // Highlight selection visually before triggering callback
        optionsContainer.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
        choiceCard.classList.add('selected');
        
        if (typeof onSelectOption === 'function') {
          setTimeout(() => onSelectOption(opt), 180);
        }
      }
    });
    optionsContainer.appendChild(choiceCard);
  });

  container.appendChild(optionsContainer);
  return container;
}
