# Contentful Quick Reference

## 🚀 Quick Start

```bash
# 1. Set up environment variables in .env.local
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_token
CONTENTFUL_ENVIRONMENT_ID=master

# 2. Initialize Contentful
make contentful-init

# 3. Push content types
make push
```

## 📋 Essential Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make login` | Login to Contentful |
| `make push` | Push content types to Contentful |
| `make pull` | Pull content types from Contentful |
| `make validate` | Validate JSON definitions |
| `make check-env` | Check environment variables |

## 🔄 Workflow Commands

| Command | Description |
|---------|-------------|
| `make contentful-init` | Login + setup (first time) |
| `make contentful-sync` | Validate + push (daily workflow) |
| `make contentful-backup` | Pull from Contentful (backup) |

## 🛡️ Safe Commands (with validation)

| Command | Description |
|---------|-------------|
| `make push-safe` | Push with environment check |
| `make pull-safe` | Pull with environment check |
| `make generate-safe` | Generate migration safely |
| `make apply-safe` | Apply migration safely |

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start development server |
| `make build` | Build the project |
| `make lint` | Run linting |
| `make clean` | Clean build artifacts |

## 📁 File Structure

```
contentful/
├── config.json              # Contentful configuration
├── content-types/           # Content type definitions
│   ├── homePage.json
│   └── announcement.json
└── exports/                 # Auto-generated exports

scripts/
└── contentful.sh           # Management script

Makefile                    # Easy command wrapper
```

## 🔧 Adding New Content Type

1. **Create JSON file** in `contentful/content-types/`
2. **Add to config.json** in `contentTypes` array
3. **Push to Contentful**:
   ```bash
   make push
   ```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Environment not set | `make check-env` |
| Login required | `make login` |
| JSON validation error | `make validate` |
| Permission denied | Check access token permissions |

## 💡 Pro Tips

- **Always validate** before pushing: `make validate`
- **Use safe commands** in production: `make push-safe`
- **Backup before changes**: `make contentful-backup`
- **Check environment**: `make env`
- **Get help**: `make help`
