import os
import shutil

# Define the source file and the destination directory
source_file = 'images/default/CantiqueDefault.png'
destination_dir = 'default'

# Create the destination directory if it doesn't exist
if not os.path.exists(destination_dir):
    os.makedirs(destination_dir)

# Loop to create copies
for i in range(1, 420):
    # Format the new file name
    new_file_name = f'Cantique_{i:03}.png'
    # Define the full path for the new file
    destination_file = os.path.join(destination_dir, new_file_name)
    # Copy the source file to the new destination
    shutil.copyfile(source_file, destination_file)
    print(f'Created: {destination_file}')

print("All files have been created successfully.")
