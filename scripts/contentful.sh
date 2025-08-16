#!/bin/bash

# Contentful Management Script
# Usage: ./scripts/contentful.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if environment variables are set
check_env() {
	if [ -z "$CONTENTFUL_SPACE_ID" ]; then
		print_error "CONTENTFUL_SPACE_ID is not set"
		exit 1
	fi
	
	if [ -z "$CONTENTFUL_ACCESS_TOKEN" ]; then
		print_error "CONTENTFUL_ACCESS_TOKEN is not set"
		exit 1
	fi
	
	# Export environment variables for Contentful CLI
	export CONTENTFUL_SPACE_ID
	export CONTENTFUL_ACCESS_TOKEN
	export CONTENTFUL_ENVIRONMENT_ID=${CONTENTFUL_ENVIRONMENT_ID:-master}
}

# Function to login to Contentful
login() {
    print_status "Logging in to Contentful..."
    contentful login
    print_success "Login successful"
}

# Function to set up space and environment
setup() {
	print_status "Setting up Contentful space and environment..."
	contentful space use --space-id $CONTENTFUL_SPACE_ID
	contentful space environment use --environment-id ${CONTENTFUL_ENVIRONMENT_ID:-master}
	print_success "Setup complete"
}

# Function to push content types to Contentful
push() {
	print_status "Pushing content types to Contentful..."
	print_warning "Note: Contentful CLI import requires a content file, not a config file."
	print_warning "To push content types, you need to:"
	print_warning "1. Export current content: make pull"
	print_warning "2. Modify the exported JSON file"
	print_warning "3. Import the modified file: contentful space import --content-file contentful/exports/latest.json"
	print_warning ""
	print_warning "For now, use the Contentful web interface to create content types."
	print_warning "Then use 'make pull' to download them locally."
	print_success "Content types workflow explained"
}

# Function to pull content types from Contentful
pull() {
	print_status "Pulling content types from Contentful..."
	mkdir -p contentful/exports
	contentful space export --config-file contentful/config.json --export-dir contentful/exports
	print_success "Content types pulled successfully"
}

# Function to generate migration
generate() {
	print_status "Generating migration..."
	print_warning "Migration generation requires a different approach with the new Contentful CLI."
	print_warning "Consider using the Contentful web interface for content type management."
	print_success "Migration workflow explained"
}

# Function to apply migration
apply() {
	print_status "Applying migration..."
	print_warning "Migration application requires a different approach with the new Contentful CLI."
	print_warning "Consider using the Contentful web interface for content type management."
	print_success "Migration workflow explained"
}

# Function to validate content types
validate() {
    print_status "Validating content type definitions..."
    
    for file in contentful/content-types/*.json; do
        if [ -f "$file" ]; then
            print_status "Validating $(basename $file)..."
            if jq empty "$file" 2>/dev/null; then
                print_success "$(basename $file) is valid JSON"
            else
                print_error "$(basename $file) has invalid JSON"
                exit 1
            fi
        fi
    done
    
    print_success "All content type definitions are valid"
}

# Function to show help
show_help() {
    echo "Contentful Management Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  login     - Login to Contentful"
    echo "  setup     - Set up space and environment"
    echo "  push      - Push content types to Contentful"
    echo "  pull      - Pull content types from Contentful"
    echo "  generate  - Generate migration"
    echo "  apply     - Apply migration"
    echo "  validate  - Validate content type definitions"
    echo "  help      - Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  CONTENTFUL_SPACE_ID       - Your Contentful Space ID"
    echo "  CONTENTFUL_ACCESS_TOKEN   - Your Contentful Access Token"
    echo "  CONTENTFUL_ENVIRONMENT_ID - Your Contentful Environment ID (optional, defaults to 'master')"
}

# Main script logic
case "$1" in
    "login")
        login
        ;;
    "setup")
        check_env
        setup
        ;;
    "push")
        check_env
        push
        ;;
    "pull")
        check_env
        pull
        ;;
    "generate")
        check_env
        generate
        ;;
    "apply")
        check_env
        apply
        ;;
    "validate")
        validate
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
