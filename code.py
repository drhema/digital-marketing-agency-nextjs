import os
from html import escape

# Specify files and folders to exclude
EXCLUDED_FILES = {"package-lock.json", ".gitignore", "webpack-runtime.js", "trace"}
EXCLUDED_FOLDERS = {"node_modules", ".git", ".astro", ".vscode", ".DS_Store", "cache", "zip", "static", "server", "build", ".next", "docs", "dist", "public", "content", ".contentlayer"}

def generate_file_tree_html(base_dir):
    html_content = ["<html><head><style>"]
    html_content.append("""
        body { font-family: Arial, sans-serif; margin: 20px; }
        .folder { font-weight: bold; margin-top: 10px; }
        .file { margin-left: 20px; color: blue; font-weight: bold; }
        .content { margin-left: 40px; white-space: pre-wrap; font-family: monospace; color: black; border-left: 2px solid #ddd; padding-left: 10px; }
    </style></head><body><h1>Project Files</h1>
    """)

    def process_folder(folder, depth=0):
        nonlocal html_content
        for item in sorted(os.listdir(folder)):
            item_path = os.path.join(folder, item)
            # Skip excluded folders and files
            if item in EXCLUDED_FOLDERS or item in EXCLUDED_FILES or item.endswith(".zip"):
                continue
            if os.path.isdir(item_path):
                html_content.append(f'<div class="folder" style="margin-left: {depth * 20}px;">📁 {escape(item)}</div>')
                process_folder(item_path, depth + 1)
            else:
                html_content.append(f'<div class="file" style="margin-left: {depth * 20}px;">📄 {escape(item)}</div>')
                try:
                    with open(item_path, 'r', encoding='utf-8') as f:
                        file_content = f.read()
                    html_content.append(f'<div class="content">{escape(file_content)}</div>')
                except Exception as e:
                    html_content.append(f'<div class="content">[Error reading file: {e}]</div>')

    process_folder(base_dir)
    html_content.append("</body></html>")
    return "\n".join(html_content)

if __name__ == "__main__":
    base_dir = os.getcwd()
    html_output = generate_file_tree_html(base_dir)
    output_file = os.path.join(base_dir, "project_code.html")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(html_output)
    print(f"HTML file generated: {output_file}")