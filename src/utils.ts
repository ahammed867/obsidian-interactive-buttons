export function generateId(): string {
  return 'btn_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

export function formatExecutionTime(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  }
}

export function truncateOutput(output: string, maxLines: number = 100): string {
  const lines = output.split('\n');
  if (lines.length <= maxLines) {
    return output;
  }
  
  const truncated = lines.slice(0, maxLines).join('\n');
  const remainingLines = lines.length - maxLines;
  return `${truncated}\n\n... (${remainingLines} more lines truncated)`;
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function sanitizePath(inputPath: string): string {
  return inputPath.replace(/\.\./g, '').replace(/[<>:"|?*]/g, '').trim();
}

export function formatOutput(output: string): { formatted: string; type: 'text' | 'json' } {
  try {
    const parsed = JSON.parse(output.trim());
    return {
      formatted: JSON.stringify(parsed, null, 2),
      type: 'json'
    };
  } catch {
    return {
      formatted: output.trim(),
      type: 'text'
    };
  }
}
