#!/bin/sh
echo "Running dotfiles setup.."

# Chaotic Aur
sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
sudo pacman-key --lsign-key 3056513887B78AEB
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst'
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst'

sudo pacman -S tree
echo -e "[chaotic-aur] \n Include = /etc/pacman.d/chaotic-mirrorlist" | sudo tree -a /etc/pacman.conf

# Install Rust via rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install packages
pushd "~/.local/share/chezmoi/.other/"
./install_pkg.sh
# ./install_theme.mjs
# ./install_flatpack.sh
popd

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



