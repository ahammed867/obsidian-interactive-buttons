import { ButtonData } from './types';
import { generateId } from './utils';

export class ButtonParser {
  private static readonly BUTTON_REGEX = /\[\!\[(.*?)\]\s*Button:\s*!(\w+)\s+"([^"]+)"(.*?)\]/g;

  static parseButtons(text: string): ButtonData[] {
    const buttons: ButtonData[] = [];
    let match;

    this.BUTTON_REGEX.lastIndex = 0;

    while ((match = this.BUTTON_REGEX.exec(text)) !== null) {
      const button = this.parseButtonMatch(match);
      if (button) {
        buttons.push(button);
      }
    }

    return buttons;
  }

  private static parseButtonMatch(match: RegExpExecArray): ButtonData | null {
    try {
      const [, label, command, scriptPath, argsString] = match;
      
      if (!label || !command || !scriptPath) {
        return null;
      }

      const args = argsString ? argsString.trim().split(/\s+/).filter(arg => arg.length > 0) : [];
      
      return {
        id: generateId(),
        label: label.trim(),
        command: command.toLowerCase(),
        scriptPath: scriptPath.trim(),
        args,
        outputMode: 'below'
      };
    } catch (error) {
      console.error('Error parsing button:', error);
      return null;
    }
  }
}
