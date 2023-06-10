vim.cmd.packadd('packer.nvim')

return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'

    use {
        'ggandor/leap.nvim',
        disable = false,
        requires = 'tpope/vim-repeat'
    }

    use 'tpope/vim-repeat'

    use 'sainnhe/gruvbox-material'

    use 'bkad/CamelCaseMotion'

    use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate'
    }

    use {
        "RRethy/nvim-treesitter-textsubjects",
        after = "nvim-treesitter",
        requires = "nvim-treesitter"
    }

    use {
        "nvim-treesitter/nvim-treesitter-textobjects",
        after = "nvim-treesitter",
        requires = "nvim-treesitter"
    }

    use({
        "kylechui/nvim-surround",
        tag = "*", -- Use for stability; omit to use `main` branch for the latest features
        config = function()
            require("nvim-surround").setup({
                keymaps = {
                    insert = "<C-z>o",
                    insert_line = "<C-z>O",
                    normal = "yo",
                    normal_cur = "yoo",
                    normal_line = "yO",
                    normal_cur_line = "yOO",
                    visual = "O",
                    visual_line = "gO",
                    delete = "do",
                    change = "co"
                }
            })
        end
    })

end)

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
