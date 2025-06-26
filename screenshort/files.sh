#!/bin/bash

# Output file
output_file="file_list.txt"

# Clear the file if it already exists
> "$output_file"

# Loop through items in the current directory
for item in *; do
    if [ -f "$item" ]; then
        echo "$item" >> "$output_file"
    fi
done

echo "All file names saved to $output_file"
