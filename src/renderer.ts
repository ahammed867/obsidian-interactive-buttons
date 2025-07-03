import { ButtonData, ExecutionResult, InteractiveButtonsSettings } from './types';
import { formatExecutionTime, formatOutput } from './utils';

export class ButtonRenderer {
  private settings: InteractiveButtonsSettings;

  constructor(settings: InteractiveButtonsSettings) {
    this.settings = settings;
  }

  async renderButton(
    container: HTMLElement,
    buttonData: ButtonData,
    onClick: () => void
  ): Promise<void> {
    const wrapper = container.createDiv({
      cls: 'interactive-button-wrapper',
      attr: { 'data-button-id': buttonData.id }
    });

    const button = wrapper.createEl('button', {
      cls: 'interactive-button',
      text: buttonData.label
    });

    const outputContainer = wrapper.createDiv({
      cls: 'button-output-container hidden'
    });

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      await onClick();
    });

    buttonData.element = button;
  }

  showOutput(result: ExecutionResult): void {
    const wrapper = document.querySelector(`[data-button-id="${result.buttonId}"]`);
    if (!wrapper) return;

    const outputContainer = wrapper.querySelector('.button-output-container') as HTMLElement;
    if (!outputContainer) return;

    outputContainer.removeClass('hidden');
    outputContainer.empty();

    if (result.success) {
      outputContainer.createEl('div', {
        cls: 'output-success',
        text: `✓ Completed in ${formatExecutionTime(result.executionTime)}`
      });
      
      if (result.output) {
        const { formatted } = formatOutput(result.output);
        outputContainer.createEl('pre', {
          cls: 'output-content',
          text: formatted
        });
      }
    } else {
      outputContainer.createEl('div', {
        cls: 'output-error',
        text: `✗ Error: ${result.error}`
      });
    }
  }

  updateSettings(settings: InteractiveButtonsSettings): void {
    this.settings = settings;
  }
}
