local isVscode = vim.g.vscode == 1

return {
	"wbthomason/packer.nvim",
	"tpope/vim-repeat",
	"sainnhe/gruvbox-material",
	"bkad/CamelCaseMotion",
	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
	},
	{
		"RRethy/nvim-treesitter-textsubjects",
		dependencies = { "nvim-treesitter" },
	},
	{
		"nvim-treesitter/nvim-treesitter-textobjects",
		dependencies = { "nvim-treesitter" },
	},
	{
		"nat-418/boole.nvim",
		config = function()
			require("boole").setup({
				mappings = {
					increment = "<C-a>",
					decrement = "<C-x>",
				},
			})
		end,
	},

	--  Plugins for Neovim in the terminal
	{
		"nvim-tree/nvim-tree.lua",
		cond = not isVscode,
		config = function()
			vim.g.loaded_netrw = 1
			vim.g.loaded_netrwPlugin = 1
			vim.opt.termguicolors = true

			vim.keymap.set("n", "<c-b>", ":NvimTreeFindFileToggle<CR>")

			require("nvim-tree").setup({
				view = {
					adaptive_size = true,
				},
			})

			vim.cmd("autocmd Colorscheme * highlight NvimTreeNormal guibg=#00000000 guifg=#9da5b3")
		end,
	},
	{
		"nvim-lualine/lualine.nvim",
		cond = not isVscode,
		dependencies = {
			"nvim-tree/nvim-web-devicons",
		},
	},
	{ "nvim-tree/nvim-web-devicons", cond = not isVscode },
	{ "tpope/vim-commentary", cond = not isVscode },
	{ "luckasRanarison/tree-sitter-hypr", cond = not isVscode },
	{ "NvChad/nvim-colorizer.lua", config = true, cond = not isVscode },
}
