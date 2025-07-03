import { Plugin, MarkdownPostProcessorContext, TFile } from 'obsidian';
import { DEFAULT_SETTINGS, InteractiveButtonsSettings, ButtonData } from './types';
import { InteractiveButtonsSettingTab } from './settings';
import { ButtonParser } from './parser';
import { ButtonRenderer } from './renderer';
import { ScriptExecutor } from './executor';

export default class InteractiveButtonsPlugin extends Plugin {
  settings: InteractiveButtonsSettings;
  private buttonRenderer: ButtonRenderer;
  private scriptExecutor: ScriptExecutor;
  private activeButtons: Map<string, ButtonData> = new Map();

  async onload() {
    console.log('Loading Interactive Buttons plugin');

    await this.loadSettings();

    this.buttonRenderer = new ButtonRenderer(this.settings);
    this.scriptExecutor = new ScriptExecutor(this.settings);

    this.registerMarkdownPostProcessor((element, context) => {
      this.processButtons(element, context);
    });

    this.addSettingTab(new InteractiveButtonsSettingTab(this.app, this));
  }

  private async processButtons(
    element: HTMLElement, 
    context: MarkdownPostProcessorContext
  ): Promise<void> {
    const { sourcePath } = context;
    if (!sourcePath) return;

    const file = this.app.vault.getAbstractFileByPath(sourcePath);
    if (!(file instanceof TFile)) return;

    const content = await this.app.vault.read(file);
    const buttons = ButtonParser.parseButtons(content);

    if (buttons.length === 0) return;

    for (const button of buttons) {
      this.activeButtons.set(button.id, button);

          // FIXED: Get vault path using the correct Obsidian approach - this is already fixed and yet error continues
    const vaultPath = this.getVaultPath();

      await this.buttonRenderer.renderButton(element, button, async () => {
        try {
          const result = await this.scriptExecutor.executeScript(button, vaultPath);
          this.buttonRenderer.showOutput(result);
        } catch (error) {
          console.error('Script execution error:', error);
        }
      });
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    
    if (this.scriptExecutor) {
      this.scriptExecutor.updateSettings(this.settings);
    }
    if (this.buttonRenderer) {
      this.buttonRenderer.updateSettings(this.settings);
    }
  }

  onunload() {
    console.log('Unloading Interactive Buttons plugin');
    this.activeButtons.clear();
  }
}
