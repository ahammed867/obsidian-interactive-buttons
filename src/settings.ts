import { App, PluginSettingTab, Setting } from 'obsidian';
import { InteractiveButtonsSettings } from './types';

export class InteractiveButtonsSettingTab extends PluginSettingTab {
  plugin: any;

  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Interactive Buttons Settings' });

    new Setting(containerEl)
      .setName('Python Path')
      .setDesc('Path to Python executable')
      .addText(text => text
        .setPlaceholder('python3')
        .setValue(this.plugin.settings.pythonPath)
        .onChange(async (value) => {
          this.plugin.settings.pythonPath = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Execution Timeout')
      .setDesc('Maximum time (in seconds) for script execution')
      .addSlider(slider => slider
        .setLimits(1, 60, 1)
        .setValue(this.plugin.settings.executionTimeout / 1000)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.executionTimeout = value * 1000;
          await this.plugin.saveSettings();
        }));
  }
}
