import os
import subprocess

def run_command(command, directory):
    """Run a shell command in the specified directory."""
    try:
        print(f"Running '{command}' in {directory}...")
        result = subprocess.run(command, cwd=directory, shell=True, check=True)
        if result.returncode == 0:
            print(f"Successfully ran '{command}' in {directory}.")
        else:
            print(f"Failed to run '{command}' in {directory}.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")

def main():
    # Define the directories
    client_dir = './client'
    backend_dir = './server'
    current_dir = './'

    # Run 'npm install' in ./client, ./backend, and the current directory
    run_command('npm install', client_dir)
    run_command('npm install', backend_dir)
    run_command('npm install', current_dir)

    # Run 'npm run concurrent' in the current directory
    run_command('npm run concurrent', current_dir)

if __name__ == "__main__":
    main()
