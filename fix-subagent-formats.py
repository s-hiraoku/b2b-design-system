#!/usr/bin/env python3
import os
import re
import glob

def fix_subagent_file(filepath):
    """Fix a single sub-agent file format"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file already has proper frontmatter
    if content.startswith('---\n') and '\n---\n' in content[4:]:
        lines = content.split('\n')
        frontmatter_end = -1
        for i, line in enumerate(lines[1:], 1):
            if line == '---':
                frontmatter_end = i
                break
        
        if frontmatter_end > 0:
            # Extract frontmatter
            frontmatter_lines = lines[1:frontmatter_end]
            body = '\n'.join(lines[frontmatter_end+1:])
            
            # Process frontmatter
            new_frontmatter = []
            for line in frontmatter_lines:
                if line.startswith('name:'):
                    # Fix name format
                    name = line.split(':', 1)[1].strip()
                    name = name.lower().replace(' ', '-')
                    new_frontmatter.append(f'name: {name}')
                elif line.startswith('color:'):
                    # Remove color field
                    continue
                else:
                    new_frontmatter.append(line)
            
            # Reconstruct file
            new_content = '---\n' + '\n'.join(new_frontmatter) + '\n---\n' + body
            
            # Write back if changed
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  Updated: {filepath}")
            return
    
    # File has no proper frontmatter, add basic one
    filename = os.path.basename(filepath).replace('.md', '')
    basic_frontmatter = f"""---
name: {filename}
description: {filename.replace('-', ' ')} specialized agent
---

"""
    
    new_content = basic_frontmatter + content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  Added frontmatter: {filepath}")

def main():
    """Main function to process all sub-agent files"""
    agents_dir = '/Volumes/SSD/development/cc-deck/.claude/agents'
    
    # Find all .md files in agents directory
    pattern = os.path.join(agents_dir, '**/*.md')
    md_files = glob.glob(pattern, recursive=True)
    
    print(f"Found {len(md_files)} sub-agent files to process")
    
    for filepath in md_files:
        fix_subagent_file(filepath)
    
    print("Sub-agent format fixes completed!")

if __name__ == '__main__':
    main()