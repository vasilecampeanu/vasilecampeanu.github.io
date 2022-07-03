import os

# Getting the current work directory (cwd)
target_directory = "../content/"

file_names = []
file_paths = []

# r=root, d=directories, f = files
for root, directories, files in os.walk(target_directory):
    for filename in files:
        if filename.endswith(".md"):
            file_names.append(filename)
            file_paths.append(os.path.join(root, filename))

print("File names:")
print(file_names)

print("File paths:")
print(file_paths)