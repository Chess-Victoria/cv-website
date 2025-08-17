# Makefile for Contentful Management
# Usage: make [target]

# Load environment variables from .env files
ifneq (,$(wildcard .env.local))
    include .env.local
    export
endif

ifneq (,$(wildcard .env))
    include .env
    export
endif

# Default target
.PHONY: help
help: ## Show this help message
	@echo "Contentful Management Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Environment Variables:"
	@echo "  CONTENTFUL_SPACE_ID       - Your Contentful Space ID"
	@echo "  CONTENTFUL_ACCESS_TOKEN   - Your Contentful Access Token"
	@echo "  CONTENTFUL_ENVIRONMENT_ID - Your Contentful Environment ID (optional, defaults to 'master')"
	@echo ""
	@echo "Examples:"
	@echo "  make login     # Login to Contentful"
	@echo "  make push      # Push content types to Contentful"
	@echo "  make pull      # Pull content types from Contentful"

# Contentful CLI Commands
.PHONY: login
login: ## Login to Contentful
	@echo "Logging in to Contentful..."
	./scripts/contentful.sh login

.PHONY: setup
setup: ## Set up space and environment
	@echo "Setting up Contentful space and environment..."
	./scripts/contentful.sh setup

.PHONY: push
push: ## Push content types to Contentful
	@echo "Pushing content types to Contentful..."
	./scripts/contentful.sh push

.PHONY: pull
pull: ## Pull content types from Contentful
	@echo "Pulling content types from Contentful..."
	./scripts/contentful.sh pull

.PHONY: generate
generate: ## Generate migration
	@echo "Generating migration..."
	./scripts/contentful.sh generate

.PHONY: apply
apply: ## Apply migration
	@echo "Applying migration..."
	./scripts/contentful.sh apply

.PHONY: validate
validate: ## Validate content type definitions
	@echo "Validating content type definitions..."
	./scripts/contentful.sh validate

.PHONY: clean-exports
clean-exports: ## Clean up Contentful exports folder
	@echo "Cleaning up Contentful exports folder..."
	./scripts/contentful.sh clean

# Development Commands
.PHONY: dev
dev: ## Start development server
	@echo "Starting development server..."
	npm run dev

.PHONY: build
build: ## Build the project
	@echo "Building the project..."
	npm run build

.PHONY: start
start: ## Start production server
	@echo "Starting production server..."
	npm run start

.PHONY: lint
lint: ## Run linting
	@echo "Running linting..."
	npm run lint

# Contentful Workflow Commands
.PHONY: contentful-init
contentful-init: ## Initialize Contentful setup (login + setup)
	@echo "Initializing Contentful setup..."
	./scripts/contentful.sh login
	./scripts/contentful.sh setup

.PHONY: contentful-sync
contentful-sync: ## Sync content types (validate + push)
	@echo "Syncing content types..."
	./scripts/contentful.sh validate
	./scripts/contentful.sh push

.PHONY: contentful-backup
contentful-backup: ## Backup content types from Contentful
	@echo "Backing up content types..."
	./scripts/contentful.sh pull

# Utility Commands
.PHONY: clean
clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	rm -rf .next
	rm -rf out
	rm -rf node_modules/.cache

.PHONY: install
install: ## Install dependencies
	@echo "Installing dependencies..."
	npm install

.PHONY: update
update: ## Update dependencies
	@echo "Updating dependencies..."
	npm update

# Check environment variables
.PHONY: check-env
check-env: ## Check if required environment variables are set
	@echo "Checking environment variables..."
	@if [ -z "$(CONTENTFUL_SPACE_ID)" ]; then \
		echo "ERROR: CONTENTFUL_SPACE_ID is not set"; \
		exit 1; \
	fi
	@if [ -z "$(CONTENTFUL_ACCESS_TOKEN)" ]; then \
		echo "ERROR: CONTENTFUL_ACCESS_TOKEN is not set"; \
		exit 1; \
	fi
	@echo "Environment variables are set correctly"

# Contentful commands with environment check
.PHONY: push-safe
push-safe: check-env push ## Push content types with environment validation

.PHONY: pull-safe
pull-safe: check-env pull ## Pull content types with environment validation

.PHONY: generate-safe
generate-safe: check-env generate ## Generate migration with environment validation

.PHONY: apply-safe
apply-safe: check-env apply ## Apply migration with environment validation

# Quick setup for new developers
.PHONY: setup-dev
setup-dev: ## Setup development environment
	@echo "Setting up development environment..."
	make install
	@echo "Please set up your .env.local file with Contentful credentials"
	@echo "Then run: make contentful-init"

# Show current environment
.PHONY: env
env: ## Show current environment variables
	@echo "Current environment variables:"
	@echo "CONTENTFUL_SPACE_ID: $(CONTENTFUL_SPACE_ID)"
	@echo "CONTENTFUL_ENVIRONMENT_ID: $(CONTENTFUL_ENVIRONMENT_ID)"
	@echo "CONTENTFUL_ACCESS_TOKEN: $(shell echo $(CONTENTFUL_ACCESS_TOKEN) | cut -c1-10)..."
