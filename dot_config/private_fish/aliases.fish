# Turn ... into cd ../../
abbr --add dotdot --regex '^\.\.+$' --function multicd

abbr pn "pnpm"
abbr g "git"
abbr xclip "xclip -selection c"
abbr cz "chezmoi"
abbr j "joshuto"
abbr --add pac "sudo pacman -S "
abbr --add pacr "sudo pacman -R "
abbr --add yays "yay -Syu "
abbr icat "kitty +kitten icat"
abbr c. "code ."
abbr n. "nvim ."
abbr h. "nvim ~/.config/hypr"

alias ls "exa --icons"
alias lsg "exa --icons -F -H --group-directories-first --git -1"
