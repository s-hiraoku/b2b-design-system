#!/bin/bash

# Fix sub-agent format issues
echo "Fixing sub-agent format issues..."

# Find all sub-agent files
find /Volumes/SSD/development/cc-deck/.claude/agents -name "*.md" | while read -r file; do
    echo "Processing: $file"
    
    # Create temporary file
    temp_file=$(mktemp)
    
    # Process the file
    awk '
    BEGIN { in_frontmatter = 0; past_frontmatter = 0 }
    /^---$/ && NR == 1 { in_frontmatter = 1; print; next }
    /^---$/ && in_frontmatter && NR > 1 { in_frontmatter = 0; past_frontmatter = 1; print; next }
    in_frontmatter {
        # Fix name field - convert spaces to hyphens and lowercase
        if (/^name:/) {
            gsub(/^name: */, "")
            gsub(/ /, "-")
            $0 = tolower($0)
            print "name: " $0
            next
        }
        # Remove color field
        if (/^color:/) { next }
        # Keep other frontmatter fields
        print
        next
    }
    past_frontmatter { print }
    !past_frontmatter && !in_frontmatter {
        # File has no frontmatter, add basic one
        if (NR == 1) {
            filename = FILENAME
            gsub(/.*\//, "", filename)
            gsub(/\.md$/, "", filename)
            print "---"
            print "name: " filename
            print "description: " filename " specialized agent"
            print "---"
            print ""
        }
        print
    }
    ' "$file" > "$temp_file"
    
    # Replace original file if changes were made
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo "  Updated: $file"
    else
        rm "$temp_file"
    fi
done

echo "Sub-agent format fixes completed!"