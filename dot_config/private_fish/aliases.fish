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
abbr --add yayr "yay -R "
abbr icat "kitty +kitten icat"
abbr c. "code ."
abbr n. "nvim ."
abbr h. "cd ~/.config/hypr && nvim ."

alias ls "exa --icons"
alias lsg "exa --icons -F -H --group-directories-first --git -1"
