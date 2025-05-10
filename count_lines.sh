#!/bin/bash

echo ""
echo "Counting lines and files..."
echo ""
echo ""

# --- Client ---
cd client

client_lines=$(find . -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.css" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
  \) \
  ! -path "./node_modules/*" \
  ! -path "./coverage/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  -exec cat {} + | wc -l)

client_files=$(find . -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.css" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
  \) \
  ! -path "./node_modules/*" \
  ! -path "./coverage/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  | wc -l)

# --- Server ---
cd ..
cd server

server_lines=$(find . -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
  \) \
  ! -path "./node_modules/*" \
  ! -path "./coverage/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  -exec cat {} + | wc -l)

server_files=$(find . -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
  \) \
  ! -path "./node_modules/*" \
  ! -path "./coverage/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  | wc -l)

# --- Root ---
cd ..

root_lines=$(find . -maxdepth 1 -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
     -o -name "*.md" \
  \) \
  ! -name "package-lock.json" \
  -exec cat {} + | wc -l)

root_files=$(find . -maxdepth 1 -type f \
  \( -name "*.ts" \
     -o -name "*.tsx" \
     -o -name "*.js" \
     -o -name "*.jsx" \
     -o -name "*.json" \
     -o -name "*.yaml" \
     -o -name "*.yml" \
     -o -name "*.html" \
     -o -name "*.env*" \
     -o -name "*Dockerfile*" \
     -o -name "*ignore*" \
     -o -name "*.md" \
  \) \
  ! -name "package-lock.json" \
  | wc -l)

total_lines=$((client_lines + server_lines + root_lines))
total_files=$((client_files + server_files + root_files))

# --- Testing ---
test_lines=$(find . -type f -name "*.test.tsx" -exec cat {} + | wc -l)
test_files=$(find . -type f -name "*.test.tsx" | wc -l)


printf "  %-8s | %8s | %8s\n" "Section" "Files" "Lines"
echo "--------------------------------------"
printf "  %-8s | %8d | %8d\n" "Client" "$client_files" "$client_lines"
printf "  %-8s | %8d | %8d\n" "Server" "$server_files" "$server_lines"
printf "  %-8s | %8d | %8d\n" "Root" "$root_files" "$root_lines"
echo "--------------------------------------"
printf "  %-8s | %8d | %8d\n" "Test" "$test_files" "$test_lines"
echo "--------------------------------------"
printf "  %-8s | %8d | %8d\n" "Total" "$total_files" "$total_lines"

