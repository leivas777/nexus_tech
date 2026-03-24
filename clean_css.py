import os
import re
import glob

def remove_globals_from_css(css_content):
    # This function uses a brace-matching parser to find all CSS blocks
    # and removes them if their selectors contain only global tags.
    
    result = []
    i = 0
    n = len(css_content)
    
    while i < n:
        # find the next '{'
        brace_idx = css_content.find('{', i)
        if brace_idx == -1:
            result.append(css_content[i:])
            break
            
        # check if there's a ';' before '{'
        semi_idx = css_content.rfind(';', i, brace_idx)
        close_idx = css_content.rfind('}', i, brace_idx)
        
        start_idx = max(semi_idx, close_idx) + 1
        if start_idx < i:
            start_idx = i
            
        selector_text = css_content[start_idx:brace_idx]
        
        # Now find the matching '}'
        brace_count = 1
        j = brace_idx + 1
        in_string = False
        str_char = ''
        in_comment = False
        
        while j < n and brace_count > 0:
            c = css_content[j]
            nxt = css_content[j+1] if j+1 < n else ''
            
            if in_comment:
                if c == '*' and nxt == '/':
                    in_comment = False
                    j += 1
            elif in_string:
                if c == '\\':
                    j += 1
                elif c == str_char:
                    in_string = False
            else:
                if c == '/' and nxt == '*':
                    in_comment = True
                    j += 1
                elif c in ('"', "'"):
                    in_string = True
                    str_char = c
                elif c == '{':
                    brace_count += 1
                elif c == '}':
                    brace_count -= 1
            j += 1
            
        block = css_content[start_idx:j]
        
        clean_sel = re.sub(r'/\*.*?\*/', '', selector_text, flags=re.DOTALL).strip()
        
        # Check if it's an at-rule
        if clean_sel.startswith('@media') or clean_sel.startswith('@supports'):
            inner = css_content[brace_idx+1:j-1]
            cleaned_inner = remove_globals_from_css(inner)
            if cleaned_inner.strip():
                result.append(css_content[i:start_idx] + selector_text + '{' + cleaned_inner + '}')
            else:
                # empty media query, skip adding the block, just append before it
                result.append(css_content[i:start_idx])
        elif clean_sel.startswith('@'):
            result.append(css_content[i:start_idx] + block)
        else:
            is_global = False
            parts = [p.strip() for p in clean_sel.split(',')]
            # if *all* parts are global, remove the block
            # Actually, standard module.css global blocks ONLY contain global tags
            all_global = True
            if not parts or parts[0] == '':
                all_global = False
                
            for p in parts:
                if not p: continue
                # remove attribute selectors or pseudo classes
                p_clean = re.sub(r'::?(?:before|after|focus-visible|hover|active|focus|root|visited)', '', p)
                p_clean = re.sub(r'\[.*?\]', '', p_clean)
                p_clean = p_clean.strip()
                if p_clean not in ('*', 'body', 'html', ''):
                    all_global = False
                    break
                    
            if all_global:
                print(f"Removed global block: {clean_sel}")
                # it's a global block, skip it
                result.append(css_content[i:start_idx])
            else:
                if 'box-sizing' in block:
                    print(f"Kept block {clean_sel} with parts {parts}")
                result.append(css_content[i:start_idx] + block)
                
        i = j
        
    return "".join(result)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.module.css'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                cleaned = remove_globals_from_css(content)
                if content != cleaned:
                    # try to remove empty media queries again just in case
                    cleaned = re.sub(r'@media[^{]+{\s*}', '', cleaned)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(cleaned)
                    print(f"Cleaned {path}")

process_directory('src')
