import pathlib

with open('README.md', 'r', encoding='utf-8') as f:
    readme_lines = set(line.strip() for line in f)

def should_skip(line):
    stripped = line.strip()
    if stripped.startswith('```'):
        return False
    return stripped in readme_lines and stripped != ''

for path in pathlib.Path('docs').glob('*.md'):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    new_lines = []
    for line in lines:
        if should_skip(line):
            continue
        new_lines.append(line)
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
print('Docs reconciled.')
