#!/bin/sh
echo "Running pre-setup.."

# Stuff to do before installing packages,
# like enabling the Chaotic Aur to skip compiling everything from source.

# Chaotic Aur
sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
sudo pacman-key --lsign-key 3056513887B78AEB
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst'
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst'

grep chaotic-aur /etc/pacman.conf || sudo sh -c "echo -e '[chaotic-aur]\nInclude = /etc/pacman.d/chaotic-mirrorlist' >>/etc/pacman.conf" 
sudo pacman -Sy

# Install Rust via rustup
# We do this before installing other packages to prevent them from using the Rust package from the Arch repo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh




