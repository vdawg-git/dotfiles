#!/bin/bash

# Allow writing to VS Code to enable custom css modifications
sudo chown -R $(whoami) $(which code)
sudo chown -R $(whoami) /opt/visual-studio-code
# sudo chown -R $(whoami) $(which code-oss)
# sudo chown -R $(whoami) /opt/code-translucent
