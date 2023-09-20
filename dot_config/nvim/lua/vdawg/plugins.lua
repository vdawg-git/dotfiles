-- Bootstrap lazy package manager
local lazypath = vim.fn.stdpath( 'data' ) .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat( lazypath ) then
    vim.fn.system( {
        'git',
        'clone',
        '--filter=blob:none',
        'https://github.com/folke/lazy.nvim.git',
        '--branch=stable', -- latest stable release
        lazypath,
     } )
end
vim.opt.rtp:prepend( lazypath )

local isVscode = vim.g.vscode == 1

local plugins = {
    'wbthomason/packer.nvim',
    {
        'ggandor/leap.nvim',
        dependencies = {
            'tpope/vim-repeat',
            'sainnhe/gruvbox-material',

         },
        init = function()
            local leap = require( 'leap' )
            leap.opts.equivalence_classes = {
                ' \r\n\t',
                '([{<',
                {
                    '"',
                    '\'',
                    '`',
                 },
             }
            leap.add_default_mappings()

        end,

     },
    'tpope/vim-repeat',
    'sainnhe/gruvbox-material',
    'bkad/CamelCaseMotion',
    {
        'nvim-treesitter/nvim-treesitter',
        build = ':TSUpdate',
     },
    {
        'RRethy/nvim-treesitter-textsubjects',
        dependencies = {
            'nvim-treesitter',
         },
     },
    {
        'nvim-treesitter/nvim-treesitter-textobjects',
        dependencies = {
            'nvim-treesitter',
         },
     },
    {
        'kylechui/nvim-surround',
        version = '*', -- Use for stability; omit to use `main` branch for the latest features
        event = 'VeryLazy',
        config = function()
            require( 'nvim-surround' ).setup( {
                keymaps = {
                    insert = '<C-z>o',
                    insert_line = '<C-z>O',
                    normal = 'yo',
                    normal_cur = 'yoo',
                    normal_line = 'yO',
                    normal_cur_line = 'yOO',
                    visual = 'O',
                    visual_line = 'gO',
                    delete = 'do',
                    change = 'co',
                 },
             } )
        end,
     },
    {
        'nat-418/boole.nvim',
        config = function()
            require( 'boole' ).setup( {
                mappings = {
                    increment = '<C-a>',
                    decrement = '<C-x>',
                 },
             } )
        end,
     },

    --  Plugins for Neovim in the terminal
    {
        'nvim-tree/nvim-tree.lua',
        cond = not isVscode,
        config = function()
            vim.g.loaded_netrw = 1
            vim.g.loaded_netrwPlugin = 1
            vim.opt.termguicolors = true

            vim.keymap.set( 'n', '<c-b>', ':NvimTreeFindFileToggle<CR>' )

            require( 'nvim-tree' ).setup( {
                view = {
                    adaptive_size = true,
                 },
             } )

            vim.cmd(
                'autocmd Colorscheme * highlight NvimTreeNormal guibg=#00000000 guifg=#9da5b3' )
        end,
     },
    {
        'nvim-tree/nvim-web-devicons',
        cond = not isVscode,
     },
    {
        'nvim-lualine/lualine.nvim',
        cond = not isVscode,
        dependencies = {
            'nvim-tree/nvim-web-devicons',
         },
     },
    {
        'tpope/vim-commentary',
        cond = not isVscode,
     },
    {
        'luckasRanarison/tree-sitter-hypr',
        cond = not isVscode,
     },
 }

local opts = {}
require( 'lazy' ).setup( plugins, opts )

-- You must run this or `PackerSync` whenever you make changes to your plugin configuration
-- Regenerate compiled loader file
-- :PackerCompile

-- Remove any disabled or unused plugins
-- :PackerClean

-- Clean, then install missing plugins
-- :PackerInstall

-- Clean, then update and install plugins
-- supports the `--preview` flag as an optional first argument to preview updates
-- :PackerUpdate

-- Perform `PackerUpdate` and then `PackerCompile`
-- supports the `--preview` flag as an optional first argument to preview updates
-- :PackerSync

-- Show list of installed plugins
-- :PackerStatus

-- Loads opt plugin immediately
-- :PackerLoad completion-nvim ale
