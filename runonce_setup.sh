# Fishery - Fish plugin manager
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher

# Allow Flatpak apps to be styled
sudo flatpak override --filesystem=$HOME/.themes
sudo flatpak override --filesystem=$HOME/.icons
# And apply the theme settings
sudo flatpak override --env=GTK_THEME=Colloid-Orange-Dark-Gruvbox
sudo flatpak override --env=ICON_THEME=Colloid-yellow-dark

# Install dependencies for the scripts
pnpm install

