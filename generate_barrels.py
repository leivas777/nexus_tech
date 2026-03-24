import os

def generate_index(target_dir, is_components=False):
    lines = []
    # find all subdirs
    for item in sorted(os.listdir(target_dir)):
        if item == 'ui' and is_components:
            lines.append("export * from './ui';")
            continue
            
        item_path = os.path.join(target_dir, item)
        if os.path.isdir(item_path):
            files = [f for f in os.listdir(item_path) if f.endswith('.js') and not f.endswith('.spec.js') and f != 'index.js']
            for f in files:
                export_name = f.replace('.js', '')
                
                # Special naming mapping for certain files to match how they are imported in App.js
                if export_name == 'services':
                    alias = 'ServicesPage'
                elif export_name == 'settings':
                    alias = 'SettingsPage'
                elif export_name == 'AuthPage':
                    alias = 'AuthPage'
                elif export_name == 'HealthBeautySection':
                    alias = 'HealthBeautySection'
                else:
                    alias = export_name
                
                lines.append(f"export {{ default as {alias} }} from './{item}/{export_name}';")
                
    with open(os.path.join(target_dir, 'index.js'), 'w') as f:
        f.write('\n'.join(lines) + '\n')

generate_index('src/components', True)
generate_index('src/pages', False)
print("Barrels generated")
