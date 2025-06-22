#!/bin/bash
set -e

LOCKFILE="/tmp/e2e.lock"

# Check if the lock file exists
if [ -e "$LOCKFILE" ]; then
  echo "Another E2E test run is in progress. Exiting..."
  exit 1
fi

# Create a lock file and ensure it is removed on exit
touch "$LOCKFILE"

# Cleanup function to run on exit
cleanup() {
  echo "Cleaning up..."
  kill $SERVER_PID 2>/dev/null || true
  kill $CLIENT_PID 2>/dev/null || true
  rm -f "$LOCKFILE"
}
trap cleanup EXIT

# Kill any process using port 3010 (backend) or 5174 (frontend)
echo "Checking for processes on ports 3010 and 5174..."

for port in 3010 5174; do
  PID=$(lsof -ti :$port || true)  #Don't exit if no process is found
  if [ -n "$PID" ]; then
    echo "Port $port is in use by PID $PID — killing it..."
    kill -9 $PID || echo "Failed to kill PID $PID"
  else
    echo "Port $port is free"
  fi
done

echo "Port cleanup complete. Starting servers..."

echo "Starting backend..."
npm run dev:test --prefix ../server &
SERVER_PID=$!

echo "Starting frontend..."
npm run dev:test --prefix ../client &
CLIENT_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
npx wait-on http://127.0.0.1:3010 --verbose

# Run tests
echo "Running Playwright tests..."
if [[ "$1" == "--ui" ]]; then
  npx playwright test --ui
else
  npx playwright test --reporter=list
fi