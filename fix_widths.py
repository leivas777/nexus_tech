import os
import re

def process_css_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for elements with `width: Xrem;` (or similar) inside a block
    # and add `max-width: 100%;` if it's not already there.
    # This ensures no fixed elements break out of mobile viewports.
    
    new_content = []
    
    # Simple parser to find blocks
    # It splits on "}"
    parts = content.split('}')
    changed = False
    
    for part in parts:
        if '{' in part:
            selector, rules = part.split('{', 1)
            
            # Check if this rule block has width: Xrem but no max-width
            if 'width:' in rules and 'max-width:' not in rules:
                if re.search(r'width:\s*\d+\.?\d*rem;', rules):
                    rules = rules.rstrip() + "\n    max-width: 100%;\n"
                    changed = True
            
            new_content.append(selector + "{" + rules + "}")
        else:
            new_content.append(part)
            
    if changed:
        final_content = "".join(new_content)
        # Fix formatting for empty braces that might have been lost if any, but split/join is mostly safe
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print(f"Fixed widths in {filepath}")

def process_all(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.css'):
                process_css_file(os.path.join(root, file))

process_all('src')
print("Done fixing widths.")
