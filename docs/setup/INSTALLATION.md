# CC-Deck Installation Guide

## Prerequisites

### Required Software

1. **Node.js** (v16.0.0 or higher)
2. **Rust/Cargo** (for similarity-ts installation)
3. **Git** (for version control)
4. **Claude Code** (development environment)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cc-deck.git
cd cc-deck
```

### 2. Install Node.js Dependencies

```bash
npm install
```

or using Yarn:

```bash
yarn install
```

### 3. Install Similarity Tool for TypeScript

The similarity-refactoring agent requires the similarity-ts tool:

```bash
cargo install similarity-ts
```

This installs the command-line tool that analyzes TypeScript code for similarity patterns and refactoring opportunities.

### 4. Verify Installation

Check that similarity-ts is properly installed:

```bash
similarity-ts --version
```

## Environment Setup

### Claude Code Environment

This project is designed to work within the Claude Code environment. Ensure you have:

1. Claude Code properly configured
2. MCP servers enabled (DeepWiki, Context7, Serena, Playwright)
3. Access to the custom slash commands

### Optional: Global Tool Installation

If you prefer system-wide availability:

```bash
# Install globally with npm
npm install -g cc-deck

# Or ensure cargo bin is in PATH
export PATH="$HOME/.cargo/bin:$PATH"
```

## Troubleshooting

### Cargo Not Found

If you get "cargo: command not found", install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Permission Issues

If you encounter permission errors during installation:

```bash
# For npm global installs
sudo npm install -g cc-deck

# For cargo installs, ensure proper ownership
chmod +x ~/.cargo/bin/similarity-ts
```

## Next Steps

After installation, you can start using CC-Deck:

```bash
/orchestrator
```

See [README.md](../README.md) for usage instructions and examples.