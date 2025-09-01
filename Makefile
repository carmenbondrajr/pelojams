# PeloJams - Cosmic Cycling Collective Makefile 🛸
# For maximum developer experience and code quality

.PHONY: help install dev build start clean lint lint-fix format format-check typecheck quality test setup

# Default target
help: ## Show this help message
	@echo "🛸 PeloJams - Cosmic Cycling Collective 🚴‍♂️"
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Setup and Installation
install: ## Install all cosmic dependencies
	npm install

setup: install ## Complete project setup (install + quality tools)
	@echo "🚀 Setting up PeloJams development environment..."
	@echo "✅ Dependencies installed"
	@echo "🧹 Code quality tools configured" 
	@echo "🛸 Ready for cosmic development!"

# Development
dev: ## Start development server with hot reload
	npm run dev

build: ## Build the cosmic application for production
	npm run build

start: ## Start production server
	npm run start

clean: ## Clean build artifacts and node_modules
	rm -rf build/ .react-router/ node_modules/
	@echo "🧹 Cleaned up build artifacts and dependencies"

# Code Quality
typecheck: ## Run TypeScript type checking
	@echo "🔍 Checking cosmic types..."
	npm run typecheck

lint: ## Run ESLint to check code quality
	@echo "🧐 Linting the cosmic codebase..."
	npx eslint . --ext .ts,.tsx,.js,.jsx

lint-fix: ## Fix ESLint issues automatically
	@echo "🔧 Auto-fixing cosmic code issues..."
	npx eslint . --ext .ts,.tsx,.js,.jsx --fix

format: ## Format code with Prettier
	@echo "✨ Formatting cosmic code..."
	npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"

format-check: ## Check if code is properly formatted
	@echo "👀 Checking cosmic code formatting..."
	npx prettier --check "**/*.{ts,tsx,js,jsx,json,css,md}"

# Comprehensive Quality Checks
quality: typecheck lint format-check ## Run all code quality checks
	@echo "🎉 All cosmic quality checks passed!"

quality-fix: format lint-fix ## Format code and fix linting issues
	@echo "🔧 Fixed all cosmic code quality issues!"

# Testing (future)
test: ## Run all tests
	@echo "🧪 Running cosmic tests..."
	@echo "⚠️  Test suite not yet implemented - coming in Phase 3!"

# Git hooks (future)
pre-commit: quality ## Run pre-commit quality checks
	@echo "🚀 Pre-commit checks complete - ready for cosmic commits!"

# Development helpers
watch-typecheck: ## Watch for TypeScript errors
	npm run typecheck -- --watch

watch-lint: ## Watch for linting errors  
	npx eslint . --ext .ts,.tsx,.js,.jsx --watch

# Project info
info: ## Show project information
	@echo "🛸 PeloJams - The Cosmic Cycling Collective 🚴‍♂️"
	@echo "📍 Project: Dynamic workout playlist generator with 90s cult aesthetic"
	@echo "🔗 Tech Stack: React Router 7, TypeScript, Tailwind CSS, Vite"
	@echo "🎵 APIs: Spotify, YouTube Music, GetSongBPM"
	@echo "🎨 Theme: Heaven's Gate meets GeoCities energy"
	@echo ""
	@echo "📊 Project Stats:"
	@wc -l app/**/*.{ts,tsx} | tail -1 | awk '{print "📝 Lines of Code: " $$1}'
	@find app -name "*.tsx" -type f | wc -l | awk '{print "🧩 Components: " $$1}'
	@find app -name "*.ts" -not -name "*.tsx" -type f | wc -l | awk '{print "⚙️  Services/Utils: " $$1}'

# Quick development workflow
quick-check: typecheck lint ## Quick quality check (no formatting)
	@echo "⚡ Quick cosmic quality check complete!"

full-check: quality ## Full quality check (all tools)
	@echo "🌟 Full cosmic quality verification complete!"

# Environment
env-example: ## Show environment variables needed
	@echo "🔑 Required environment variables:"
	@cat .env.example

# Documentation
docs: ## Open project documentation
	@echo "📚 Opening cosmic documentation..."
	@echo "🔗 README.md - Project overview and setup"
	@echo "🧠 CLAUDE.md - AI context and development guidelines"
	@echo "📖 Check the files for complete documentation"