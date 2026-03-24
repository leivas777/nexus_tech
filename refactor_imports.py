import os
import re

def rewrite_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') and not file.endswith('.spec.js'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                
                # We want to replace:
                # import ComponentName from '(./|../)+components/FolderName/FileName';
                # with
                # import { ComponentName } from '(./|../)+components';
                
                # Regex explanation:
                # ^import\s+(\w+)\s+from\s+['"]((?:\.\/|\.\.\/)+)components\/([^/]+)\/\w+['"];?
                # \1 = variable name (e.g. Header)
                # \2 = relative path up to components (e.g. ../../)
                # \3 = FolderName (e.g. Header)
                
                # Replace for components
                content = re.sub(
                    r'^import\s+(\w+)\s+from\s+[\'"]((?:\.\/|\.\.\/)+)components\/([^/]+)\/[^\'"]+[\'"];?',
                    r'import { \1 } from "\2components";',
                    content,
                    flags=re.MULTILINE
                )

                # Same for pages
                content = re.sub(
                    r'^import\s+(\w+)\s+from\s+[\'"]((?:\.\/|\.\.\/)+)pages\/([^/]+)\/[^\'"]+[\'"];?',
                    r'import { \1 } from "\2pages";',
                    content,
                    flags=re.MULTILINE
                )

                # What about imports that are already destructured? 
                # e.g. import { Button } from '../../components/ui';
                # If they already use barrel file inside the folder, let's leave them or fix if needed.

                if original != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Refactored imports in {path}")

rewrite_imports('src')
