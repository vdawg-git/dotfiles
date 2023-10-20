# VS Code shell integration - see https://code.visualstudio.com/docs/terminal/shell-integration
string match -q "$TERM_PROGRAM" "vscode"
and . (code --locate-shell-integration-path fish)



fish_vi_key_bindings

# pnpm
set -gx PNPM_HOME "~/vdawg/.local/share/pnpm"
if not string match -q -- $PNPM_HOME $PATH
  set -gx PATH "$PNPM_HOME" $PATH
end
# pnpm end


set EDITOR "nvim"
set SUDO_EDITOR "nvim"
set VISUAL "nvim"


function multicd
    echo cd (string repeat -n (math (string length -- $argv[1]) - 1) ../)
end


abbr --add dotdot --regex '^\.\.+$' --function multicd

abbr --add cz "chezmoi"

alias pn="pnpm"
alias xclip="xclip -selection c"
alias icat="kitty +kitten icat"
alias ls="exa --icons"
alias ls="exa --icons -F -H --group-directories-first --git -1"

abbr --add pac "sudo pacman -S "
abbr --add pacr "sudo pacman -R "
abbr --add yays "yay -Syu "
abbr --add yayr "yay -R "

if status is-interactive
    # Commands to run in interactive sessions can go here
end

function fish_greeting
  kitten icat --align left  /home/vdawg/.local/share/chezmoi/.other/assets/see_you.png  2>/dev/null
end




## THEME

set red #EA6962
set blue #7DAEA3
set orange #E78A4E
set white #DDC7A1
set black #252423
set gray #928374 
set lightgray #A89984
set yellow #D8A657
set purple #D3869B
set aqua #89B482
set green #A9B665



# default color
set fish_color_normal white

# commands like echo
set fish_color_command blue

# keywords like if - this falls back on the command color if unset
set fish_color_keyword orange

# quoted text like "abc"
set fish_color_quote yellow

# IO redirections like >/dev/null
set fish_color_redirection purple

# process separators like ; and &
set fish_color_end gray --bold

# syntax errors
set fish_color_error red --bold --italics

# ordinary command parameters
set fish_color_param gray

# parameters that are filenames (if the file exists)
set fish_color_valid_path cyan

# options starting with “-”, up to the first “--” parameter
set fish_color_option $lightgray --bold

# comments like ‘# important’
set fish_color_comment $gray --bold

# selected text in vi visual mode
set fish_color_selection yellow

# parameter expansion operators like * and ~
set fish_color_operator purple --bold

# character escapes like \n and \x70
set fish_color_escape green --italics

# autosuggestions (the proposed rest of a command)
set fish_color_autosuggestion $lightgray 

# the current working directory in the default prompt
set fish_color_cwd green

# the current working directory in the default prompt for the root user
set fish_color_cwd_root green --bold

# the username in the default prompt
set fish_color_user blue 

# the hostname in the default prompt
set fish_color_host blue --dim

# the hostname in the default prompt for remote sessions (like ssh)
# set fish_color_host_remote

# the last command’s nonzero exit code in the default prompt
# set fish_color_status

# the ‘^C’ indicator on a canceled command
set fish_color_cancel red --dim

# history search matches and selected pager items (background only)
# set fish_color_search_match



# Plugins

starship init fish | source # prompt
zoxide init fish --cmd cd | source # folder auto jumping
