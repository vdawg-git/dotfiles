# VS Code shell integration - see https://code.visualstudio.com/docs/terminal/shell-integration
string match -q "$TERM_PROGRAM" "vscode"
and . (code --locate-shell-integration-path fish)

export EDITOR="code --wait"
# set EDITOR("code --wait")

alias pn="pnpm"
alias cz="chezmoi"
alias pac="sudo pacman -S"

if status is-interactive
    # Commands to run in interactive sessions can go here
end
