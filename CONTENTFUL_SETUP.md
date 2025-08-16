# Contentful CLI Setup Guide

This guide explains how to use the Contentful CLI to manage content types locally and sync them to your Contentful workspace.

## Prerequisites

1. **Contentful CLI**: Already installed globally
2. **Contentful Account**: You need access to a Contentful space
3. **Environment Variables**: Set up in your `.env.local` file

## Environment Variables

Add these to your `.env.local` file:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT_ID=master
```

### Environment Loading

The Makefile automatically loads environment variables from:
1. `.env.local` (highest priority)
2. `.env` (fallback)

This means you don't need to manually export variables or source files - just run `make` commands and they'll work!

## Project Structure

```
contentful/
├── config.json              # Contentful configuration
├── content-types/           # Content type definitions
│   ├── homePage.json
│   └── announcement.json
└── exports/                 # Exported content types (auto-generated)
```

## Quick Start

### 1. Login to Contentful

```bash
# Using Makefile (Recommended)
make login

# Using the script
./scripts/contentful.sh login

# Or using npm
npm run contentful:login
```

### 2. Set up Space and Environment

```bash
# Using Makefile (Recommended)
make setup

# Using the script
./scripts/contentful.sh setup

# Or using npm
npm run contentful:space && npm run contentful:environment
```

### 3. Pull Existing Content Types

```bash
# Using Makefile (Recommended)
make pull

# Using the script
./scripts/contentful.sh pull

# Or using npm
npm run contentful:pull
```

### 4. Create Content Types in Contentful Web Interface

1. Go to your Contentful space
2. Navigate to Content Model
3. Create your content types (homePage, announcement, etc.)
4. Use `make pull` to download them locally

## Available Commands

### Using Makefile (Recommended)

The Makefile automatically loads environment variables from `.env.local` and `.env` files, making it the easiest way to run commands.

```bash
make [command]
```

### Using the Script

```bash
./scripts/contentful.sh [command]
```

### Using NPM Scripts

```bash
npm run contentful:[command]
```

### Commands

| Command | Description |
|---------|-------------|
| `make login` | Login to Contentful |
| `make setup` | Set up space and environment |
| `make push` | Push content types to Contentful |
| `make pull` | Pull content types from Contentful |
| `make generate` | Generate migration |
| `make apply` | Apply migration |
| `make validate` | Validate content type definitions |
| `make help` | Show help message |

### Additional Makefile Commands

| Command | Description |
|---------|-------------|
| `make contentful-init` | Initialize Contentful setup (login + setup) |
| `make contentful-sync` | Sync content types (validate + push) |
| `make contentful-backup` | Backup content types from Contentful |
| `make push-safe` | Push with environment validation |
| `make pull-safe` | Pull with environment validation |
| `make check-env` | Check if environment variables are set |
| `make env` | Show current environment variables |
| `make setup-dev` | Setup development environment |

## Content Type Management

### Current Workflow (Recommended)

Due to changes in the Contentful CLI, the recommended workflow is:

1. **Create content types in Contentful web interface**
2. **Pull them locally** for version control:
   ```bash
   make pull
   ```
3. **Modify locally** if needed
4. **Use Contentful web interface** for updates

### Alternative Workflow (Advanced)

For advanced users who want to work with JSON files:

1. **Export current content**:
   ```bash
   make pull
   ```

2. **Modify the exported JSON file** in `contentful/exports/`

3. **Import the modified file**:
   ```bash
   contentful space import --content-file contentful/exports/latest.json
   ```

### Adding a New Content Type

1. **Create in Contentful web interface** (recommended)
2. **Pull locally** for version control:
   ```bash
   make pull
   ```

### Example: Adding a Blog Post Content Type

1. Create `contentful/content-types/blogPost.json`:
```json
{
  "name": "Blog Post",
  "description": "Blog post content type",
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true
    },
    {
      "id": "content",
      "name": "Content",
      "type": "RichText",
      "required": true
    }
  ]
}
```

2. Add to `contentful/config.json`:
```json
{
  "contentTypes": [
    "contentful/content-types/homePage.json",
    "contentful/content-types/announcement.json",
    "contentful/content-types/blogPost.json"
  ]
}
```

3. Push to Contentful:
```bash
./scripts/contentful.sh push
```

### Modifying Existing Content Types

1. **Edit the JSON file** in `contentful/content-types/`
2. **Push changes**:
   ```bash
   ./scripts/contentful.sh push
   ```

### Pulling Changes from Contentful

If content types were modified in the Contentful web app:

```bash
./scripts/contentful.sh pull
```

This will update your local JSON files with the current Contentful definitions.

## Migration Management

### Generate Migration

Create a migration file for complex changes:

```bash
./scripts/contentful.sh generate
```

### Apply Migration

Apply the generated migration:

```bash
./scripts/contentful.sh apply
```

## Validation

Validate your content type definitions:

```bash
./scripts/contentful.sh validate
```

This checks that all JSON files are valid.

## Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   ./scripts/contentful.sh login
   ```

2. **Space ID Not Found**
   - Check your `CONTENTFUL_SPACE_ID` environment variable
   - Ensure you have access to the space

3. **Permission Denied**
   - Make sure your access token has the right permissions
   - Use a Management Token for content type operations

### Getting Help

```bash
./scripts/contentful.sh help
```

## Best Practices

1. **Version Control**: Commit your content type definitions to git
2. **Validation**: Always validate before pushing
3. **Backup**: Pull existing content types before making changes
4. **Testing**: Test in a development environment first
5. **Documentation**: Keep your content type definitions well-documented

## Content Type Reference

### Field Types

- `Symbol`: Short text (255 characters)
- `Text`: Long text
- `RichText`: Rich text editor
- `Number`: Numeric values
- `Boolean`: True/false values
- `Date`: Date and time
- `Location`: Geographic coordinates
- `Object`: JSON object
- `Array`: Array of values
- `Link`: Reference to another entry or asset
- `Asset`: Media files

### Validations

```json
{
  "validations": [
    {
      "size": {
        "min": 1,
        "max": 100
      }
    },
    {
      "range": {
        "min": 0,
        "max": 100
      }
    },
    {
      "linkContentType": ["blogPost", "author"]
    }
  ]
}
```

## Next Steps

1. **Set up your environment variables**
2. **Login to Contentful**
3. **Push your content types**
4. **Create content entries in Contentful**
5. **Test your integration**

For more information, visit the [Contentful CLI documentation](https://github.com/contentful/contentful-cli).
