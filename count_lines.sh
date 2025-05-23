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
  ! -path "./playwright-report/*" \
  ! -path "./test-results/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  ! -name "demo-todo-app.spec.ts" ! -name "example.spec.ts" \
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
  ! -path "./playwright-report/*" \
  ! -path "./test-results/*" \
  ! -path "./dist/*" \
  ! -name "package-lock.json" \
  ! -name "demo-todo-app.spec.ts" ! -name "example.spec.ts" \
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
  ! -path "./test-results/*" \
  ! -path "./node_modules/*" \
  ! -path "./scripts/*" \
  | wc -l)

total_lines=$((client_lines + server_lines + root_lines))
total_files=$((client_files + server_files + root_files))

# --- Testing ---
test_lines=$(find . -type f -name "*.test.tsx" -exec cat {} + | wc -l)
test_files=$(find . -type f -name "*.test.tsx" | wc -l)

e2e_lines=$(find ./client/e2e -type f ! -name "*.md" ! -name "demo-todo-app.spec.ts" ! -name "example.spec.ts" \-exec cat {} + | wc -l)
e2e_dirs=$(find ./client/e2e -mindepth 1 -type d | wc -l)

printf "  %-10s | %8s | %8s\n" "Section" "Files" "Lines"
echo "--------------------------------------"
printf "  %-10s | %8d | %8d\n" "Client" "$client_files" "$client_lines"
printf "  %-10s | %8d | %8d\n" "Server" "$server_files" "$server_lines"
printf "  %-10s | %8d | %8d\n" "Root" "$root_files" "$root_lines"
echo "--------------------------------------"
printf "  %-10s | %8d | %8d\n" "Unit Tests" "$test_files" "$test_lines"
printf "  %-10s | %8d | %8d\n" "E2e Tests" "$e2e_dirs" "$e2e_lines"
echo "--------------------------------------"
printf "  %-10s | %8d | %8d\n" "Total" "$total_files" "$total_lines"

