import { spawn } from 'child_process';
import { ExecutionResult, ButtonData, InteractiveButtonsSettings } from './types';
import { formatExecutionTime, truncateOutput } from './utils';

export class ScriptExecutor {
  private settings: InteractiveButtonsSettings;

  constructor(settings: InteractiveButtonsSettings) {
    this.settings = settings;
  }

  async executeScript(buttonData: ButtonData, vaultPath: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    return new Promise((resolve) => {
      let output = '';
      let error = '';

      const scriptPath = vaultPath + '/' + buttonData.scriptPath;
      const process = spawn(this.settings.pythonPath, [scriptPath, ...buttonData.args], {
        cwd: vaultPath,
        timeout: this.settings.executionTimeout
      });

      process.stdout?.on('data', (data) => {
        output += data.toString();
      });

      process.stderr?.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        const executionTime = Date.now() - startTime;
        
        resolve({
          success: code === 0,
          output: truncateOutput(output, this.settings.outputLineLimit),
          error: error || undefined,
          executionTime,
          buttonId: buttonData.id
        });
      });

      process.on('error', (err) => {
        resolve({
          success: false,
          output: '',
          error: `Failed to start process: ${err.message}`,
          executionTime: Date.now() - startTime,
          buttonId: buttonData.id
        });
      });
    });
  }

  updateSettings(settings: InteractiveButtonsSettings): void {
    this.settings = settings;
  }
}
