vim.cmd.packadd('packer.nvim')

local isVscode = vim.g.vscode == 1

local loadBasePackages = function(use)
    use 'wbthomason/packer.nvim'

    use {
        'ggandor/leap.nvim',
        requires = 'tpope/vim-repeat',
    }

    use 'tpope/vim-repeat'

	use 'sainnhe/gruvbox-material'


    use 'bkad/CamelCaseMotion'

    use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate',
    }

    use {
        "RRethy/nvim-treesitter-textsubjects",
        after = "nvim-treesitter",
        requires = "nvim-treesitter",
    }

    use {
        "nvim-treesitter/nvim-treesitter-textobjects",
        after = "nvim-treesitter",
        requires = "nvim-treesitter",
    }

	use {
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
	}

end

local loadNonVsCodePackages = function(use) 

		use {
			'nvim-tree/nvim-tree.lua',
			config = function() 
				vim.g.loaded_netrw = 1
				vim.g.loaded_netrwPlugin = 1
				vim.opt.termguicolors = true


				vim.keymap.set('n', '<c-b>', ':NvimTreeFindFileToggle<CR>')

				require("nvim-tree").setup({
					view = {
						adaptive_size = true
					}
				})

				vim.cmd("autocmd Colorscheme * highlight NvimTreeNormal guibg=#21252B guifg=#9da5b3")
			end
		}

		use {
			'nvim-tree/nvim-web-devicons',
		}

		use {
			'nvim-lualine/lualine.nvim',
			requires = { 'nvim-tree/nvim-web-devicons', opt = true },
		}


		use {
			'tpope/vim-commentary',
		}
	end


return require('packer').startup(function(use)
		loadBasePackages(use)

		if not vim.g.vscode then
			loadNonVsCodePackages(use)
		end
	end
)

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
