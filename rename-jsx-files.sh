#!/bin/bash

# Script to rename React component files from .js to .jsx

# Main app files
if [ -f "src/App.js" ]; then
  echo "Renaming src/App.js to src/App.jsx"
  mv src/App.js src/App.jsx
fi

if [ -f "src/index.js" ]; then
  echo "Renaming src/index.js to src/index.jsx"
  mv src/index.js src/index.jsx
fi

# Component files
for file in src/components/*.js; do
  if [ -f "$file" ]; then
    newfile="${file%.js}.jsx"
    echo "Renaming $file to $newfile"
    mv "$file" "$newfile"
  fi
done

# Page files
for file in src/pages/*.js; do
  if [ -f "$file" ]; then
    newfile="${file%.js}.jsx"
    echo "Renaming $file to $newfile"
    mv "$file" "$newfile"
  fi
done

# Utils files that might contain JSX
for file in src/utils/*.js; do
  if [ -f "$file" ]; then
    # Check if file contains JSX syntax (this is a simple check)
    if grep -q "<.*>" "$file"; then
      newfile="${file%.js}.jsx"
      echo "Renaming $file to $newfile (contains JSX)"
      mv "$file" "$newfile"
    fi
  fi
done

echo "File renaming complete!"
echo "Now run: npm run dev" 