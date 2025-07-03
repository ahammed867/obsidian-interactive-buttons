# Interactive Buttons for Obsidian

Transform your Markdown notes into interactive dashboards with secure local script execution.

![Interactive Buttons Demo](demo.gif)

## 🚀 Features

- **Interactive UI Elements**: Add clickable buttons directly in your Markdown notes
- **Secure Script Execution**: Run Python scripts locally with permission-based security
- **Real-time Output**: See script results directly in your notes
- **No Cloud Dependencies**: Everything runs locally on your machine
- **Multiple Output Modes**: Display results inline, in modals, or below buttons
- **Execution History**: Track and review past script executions
- **Trusted Scripts**: Mark frequently used scripts as trusted for faster execution

## 📖 Quick Start

### Installation

1. Download the latest release from GitHub
2. Extract to your Obsidian plugins folder: `VaultFolder/.obsidian/plugins/interactive-buttons/`
3. Enable the plugin in Obsidian Settings → Community Plugins
4. Configure Python path in plugin settings

### Basic Usage

Add buttons to your notes using this syntax:

```markdown
[![Button Label] Button: !python "script_path.py"]
```

**Examples:**

```markdown
<!-- Simple button -->
[![Calculate Total] Button: !python "scripts/calculate.py"]

<!-- Button with parameters -->
[![Weather Update] Button: !python "weather.py" --city "New York"]

<!-- Button with inline output -->
[![Show Result] Button: !python "analyze.py" --output inline]
```

## 🔧 Syntax Reference

### Basic Syntax
```
[![Label] Button: !command "script_path" arguments]
```

### Components
- **Label**: Text displayed on the button
- **Command**: Script type (`python`, `node`, `shell`)
- **Script Path**: Relative path to your script file
- **Arguments**: Optional command-line arguments

### Arguments
```markdown
<!-- Named parameters -->
[![Process Data] Button: !python "process.py" --file "data.csv" --output "results"]

<!-- Boolean flags -->
[![Backup Files] Button: !python "backup.py" --compress --exclude-logs]

<!-- Output modes -->
[![Quick Calc] Button: !python "calc.py" --output inline]
[![Full Report] Button: !python "report.py" --output modal]
```

## 📁 File Structure

```
your-vault/
├── scripts/                 # Your Python scripts
│   ├── calculate_roi.py
│   ├── weather.py
│   └── system_info.py
├── Interactive Dashboard.md  # Notes with buttons
└── .obsidian/
    └── plugins/
        └── interactive-buttons/
```

## 🐍 Example Scripts

### Hello World (`scripts/hello_world.py`)
```python
#!/usr/bin/env python3
import sys
import json

def main():
    name = sys.argv[1] if len(sys.argv) > 1 else "World"
    result = {
        "message": f"Hello, {name}! 👋",
        "timestamp": "$(date)",
        "script": "hello_world.py"
    }
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
```

### ROI Calculator (`scripts/calculate_roi.py`)
```python
#!/usr/bin/env python3
import argparse
import json

def calculate_roi(initial, final):
    roi = ((final - initial) / initial) * 100
    return {
        "initial_investment": initial,
        "final_value": final,
        "roi_percentage": round(roi, 2),
        "profit": final - initial,
        "multiplier": round(final / initial, 2)
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--initial', type=float, default=10000)
    parser.add_argument('--final', type=float, default=15000)
    
    args = parser.parse_args()
    result = calculate_roi(args.initial, args.final)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
```

## ⚙️ Configuration

### Plugin Settings

Access settings via: `Settings → Community Plugins → Interactive Buttons`

#### Python Configuration
- **Python Path**: Path to your Python executable (e.g., `python3`, `/usr/bin/python3`)
- **Test Installation**: Verify Python is properly configured

#### Security Settings
- **Require Approval**: Ask permission before executing scripts
- **Allowed Script Paths**: Restrict execution to specific directories
- **Trusted Scripts**: Manage permanently trusted scripts

#### Execution Settings
- **Timeout**: Maximum execution time (1-60 seconds)
- **Concurrent Executions**: Max simultaneous scripts (1-10)
- **Output Limit**: Maximum lines to display (default: 100)

#### Appearance
- **Theme**: Choose from Default, Minimal, or Gradient button styles

### Security Features

**Permission System:**
- First-time scripts require explicit approval
- Option to "Always Trust & Run" for frequently used scripts
- Scripts are identified by content hash + file path

**Sandboxed Execution:**
- Configurable timeout limits
- Restricted environment variables
- Working directory isolation

**Path Validation:**
- Scripts must be in allowed directories (if configured)
- No parent directory (`../`) references allowed
- Automatic path sanitization

## 🎨 Use Cases

### Personal Finance
```markdown
# Financial Dashboard

## Investment Tracking
[![Calculate Portfolio ROI] Button: !python "finance/roi.py" --portfolio "main"]
[![Update Stock Prices] Button: !python "finance/stocks.py" --fetch --symbols "AAPL,GOOGL,MSFT"]

## Budget Analysis
[![Monthly Expenses] Button: !python "finance/expenses.py" --month "current"]
[![Savings Goal Progress] Button: !python "finance/savings.py" --goal 50000]
```

### Project Management
```markdown
# Project Status Board

## Git Operations
[![Commit Count] Button: !python "git/stats.py" --repo "current"]
[![Branch Status] Button: !python "git/branches.py" --show-ahead-behind]

## Build & Deploy
[![Run Tests] Button: !python "ci/test.py" --coverage]
[![Deploy to Staging] Button: !python "deploy/staging.py" --confirm]
```

### Data Science
```markdown
# Data Analysis Workspace

## Data Processing
[![Load Dataset] Button: !python "data/load.py" --file "raw_data.csv"]
[![Clean Data] Button: !python "data/clean.py" --remove-outliers]
[![Generate Report] Button: !python "data/report.py" --charts --export]

## Model Training
[![Train Model] Button: !python "ml/train.py" --algorithm "random_forest"]
[![Evaluate Performance] Button: !python "ml/evaluate.py" --metrics "accuracy,precision,recall"]
```

## 🔧 Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/your-username/obsidian-interactive-buttons.git
cd obsidian-interactive-buttons

# Install dependencies
npm install

# Development build (with hot reload)
npm run dev

# Production build
npm run build
```

### Project Structure

```
src/
├── main.ts              # Plugin entry point
├── parser.ts            # Button syntax parsing
├── renderer.ts          # UI rendering engine
├── executor.ts          # Script execution management
├── security.ts          # Permission & security
├── settings.ts          # Configuration UI
├── types.ts             # TypeScript definitions
└── utils.ts             # Utility functions
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🛡️ Security Considerations

**What's Protected:**
- Scripts require explicit permission before first execution
- Dangerous patterns detected and blocked
- Execution timeouts prevent infinite loops
- Sandboxed environment with restricted access

**Best Practices:**
- Only run scripts from trusted sources
- Review script content before trusting permanently
- Use allowed script paths to restrict execution locations
- Regularly audit trusted scripts in settings

**Limitations:**
- Plugin cannot prevent all possible security issues
- Users must exercise caution with script sources
- Local file system access is inherent to functionality

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [GitHub Wiki](https://github.com/your-username/obsidian-interactive-buttons/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/obsidian-interactive-buttons/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/obsidian-interactive-buttons/discussions)
- **Discord**: Join the [Obsidian Community](https://discord.gg/obsidianmd)

## 🎯 Roadmap

- [ ] Support for Node.js and shell scripts
- [ ] Advanced output formatting (tables, charts)
- [ ] Script template library
- [ ] Integration with external APIs
- [ ] Multi-language script support
- [ ] Visual script editor
- [ ] Scheduled script execution
- [ ] Script sharing marketplace

---

**Made with ❤️ for the Obsidian community**
