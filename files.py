import os

def list_files(startpath, output_file='folder_structure.txt'):
    # List of folders to exclude
    excluded_dirs = {"node_modules", ".git", ".vscode", ".astro" , "z-zip",".next"}
    
    with open(output_file, 'w') as file:
        for root, dirs, files in os.walk(startpath):
            # Exclude specified directories
            dirs[:] = [d for d in dirs if d not in excluded_dirs]
            
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * level
            file.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                file.write(f"{subindent}{f}\n")

if __name__ == "__main__":
    list_files(".")  # "." means the current directory
    print("Folder structure saved to 'folder_structure.txt'")
