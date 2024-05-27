#!/bin/sh
echo "Running post dotfiles setup.."

# Fishery - Fish plugin manager
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher

# Set fish as the default shell
chsh -s /bin/fish

# Allow Flatpak apps to be styled
sudo flatpak override --filesystem=$HOME/.themes
sudo flatpak override --filesystem=$HOME/.icons
# And apply the theme settings
sudo flatpak override --env=GTK_THEME=Colloid-Orange-Dark-Gruvbox
sudo flatpak override --env=ICON_THEME=Colloid-yellow-dark

# Install dependencies for the config scripts
pnpm install

# Mange keyd config
sudo mkdir -p /etc/keyd/
sudo ln -s /home/vdawg/.local/share/chezmoi/.outside/etc/keyd/default.conf ./default.conf
sudo systemctl enable --now keyd



