# Fetching Processes

Run this file before running the tauri app. This generates a python executable file which tauri picks up.

## Running 

```bash
python3 -m venv .
pip3 install -r requirements.txt
pyinstaller --onefile --hidden-import psutil ./src/checkRunningProcesses.py
cp checkRunningProcesses checkRunningProcesses-x86_64-apple-darwin

```
