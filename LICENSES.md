# Third-Party Licenses and Acknowledgments

## Referenced Projects

This project references and draws inspiration from the following open-source projects:

### mizchi/similarity
- **Repository**: https://github.com/mizchi/similarity
- **License**: MIT License
- **Usage**: Command-line tool invoked by AI agents for code similarity analysis
- **Copyright**: Copyright (c) mizchi
- **Installation**: Installed via `cargo install similarity-ts` for TypeScript projects
- **Invocation**: Called by similarity-refactoring agent via command-line interface
- **Compliance**: Used under MIT License terms with full attribution

#### MIT License Text
```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### gotalab/claude-code-spec
- **Repository**: https://github.com/gotalab/claude-code-spec
- **License**: To be confirmed (no explicit license found)
- **Usage**: Substantial reference for Kiro SDD implementation including:
  - Specification-driven development workflow patterns
  - Directory structure concepts (`.kiro/` inspired by their approach)
  - Phase-based development methodology
  - Specification file formats and organization
- **Attribution**: This project heavily references and adapts concepts from gotalab/claude-code-spec
- **Implementation**: While implementation code is original, the overall SDD methodology and workflow design are significantly influenced by their work

**Important Note**: We acknowledge substantial conceptual and structural influence from gotalab/claude-code-spec in our Kiro SDD implementation. While the actual code is independently written, the methodology, workflow patterns, and organizational concepts are adapted from their pioneering work. We recommend users also refer to the original project for deeper understanding of the SDD approach.

**Recommendation**: As there is no explicit license in the original repository, we recommend:
1. Contacting the original author for clarification on usage terms
2. Providing clear attribution in all relevant documentation
3. Contributing back improvements to the original project where appropriate

## Disclaimer

All third-party projects are acknowledged and credited appropriately. This project respects all intellectual property rights and licensing requirements. If you are a rights holder and have concerns about attribution or usage, please contact the project maintainers.

## Our License

This project (CC-Deck) is released under the MIT License. See the main LICENSE file for details.