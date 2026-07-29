/**
 * ProgressBar Component
 * @param {Object} props
 * @param {number} props.current - Current question number (1-indexed)
 * @param {number} props.total - Total question count
 * @returns {HTMLElement & { updateProgress: (current: number, total: number) => void }}
 */
export function createProgressBar({ current = 1, total = 12 } = {}) {
  const container = document.createElement('div');
  container.className = 'progress-container';

  const percentage = Math.min(100, Math.round((current / total) * 100));

  container.innerHTML = `
    <div class="progress-header">
      <span class="progress-text" id="progress-step">${current} / ${total}</span>
      <span class="text-caption" id="progress-percent">${percentage}%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" id="progress-fill" style="width: ${percentage}%;"></div>
    </div>
  `;

  /**
   * Updates the progress bar state smoothly
   * @param {number} newCurrent 
   * @param {number} newTotal 
   */
  container.updateProgress = function(newCurrent, newTotal = total) {
    const newPercent = Math.min(100, Math.round((newCurrent / newTotal) * 100));
    const stepEl = container.querySelector('#progress-step');
    const percentEl = container.querySelector('#progress-percent');
    const fillEl = container.querySelector('#progress-fill');

    if (stepEl) stepEl.textContent = `${newCurrent} / ${newTotal}`;
    if (percentEl) percentEl.textContent = `${newPercent}%`;
    if (fillEl) fillEl.style.width = `${newPercent}%`;
  };

  return container;
}
