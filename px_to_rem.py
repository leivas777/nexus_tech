import os
import re

def convert_px_to_rem(match):
    value = float(match.group(1))
    # Keep small values like 1px, 2px, 3px as px
    if value <= 3:
        return f"{match.group(1)}px"
    
    # Optional: don't convert typical breakpoint values if we want them as px
    # if value in (320, 480, 768, 1024, 1200): return f"{match.group(1)}px"
    
    rem_value = value / 16.0
    rem_str = f"{rem_value:.3f}".rstrip('0').rstrip('.')
    return f"{rem_str}rem"

def process_css_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'\b(\d+(?:\.\d+)?)px\b', convert_px_to_rem, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Converted {filepath}")

def process_all(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.css'):
                process_css_file(os.path.join(root, file))

process_all('src')
print("Done px to rem conversion.")
