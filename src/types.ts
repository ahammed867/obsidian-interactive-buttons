export interface ButtonData {
  id: string;
  label: string;
  command: string;
  scriptPath: string;
  args: string[];
  outputMode: 'inline' | 'modal' | 'below';
  element?: HTMLElement;
}

export interface ExecutionConfig {
  timeout: number;
  maxMemory: string;
  allowedPaths: string[];
  pythonPath: string;
  env: Record<string, string>;
  workingDirectory?: string;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  buttonId: string;
}

export interface ScriptPermission {
  hash: string;
  path: string;
  trusted: boolean;
  lastModified: number;
  permissions: string[];
}

export interface InteractiveButtonsSettings {
  pythonPath: string;
  allowedScriptPaths: string[];
  requireApproval: boolean;
  trustedScripts: Record<string, ScriptPermission>;
  executionTimeout: number;
  outputLineLimit: number;
  theme: 'default' | 'minimal' | 'gradient';
  maxConcurrentExecutions: number;
  enableLogging: boolean;
}

export interface ButtonState {
  isExecuting: boolean;
  lastOutput?: string;
  lastError?: string;
  executionCount: number;
}

export interface ValidationResult {
  safe: boolean;
  warnings: string[];
  errors: string[];
}

export const DEFAULT_SETTINGS: InteractiveButtonsSettings = {
  pythonPath: 'python3',
  allowedScriptPaths: [],
  requireApproval: true,
  trustedScripts: {},
  executionTimeout: 5000,
  outputLineLimit: 100,
  theme: 'default',
  maxConcurrentExecutions: 3,
  enableLogging: false
};
