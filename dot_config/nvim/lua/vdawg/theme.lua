-- vim.o.background = 'dark' -- or 'light'
-- Set contrast.
-- This configuration option should be placed before `require('gruvbox-material').setup()`.
-- Available values: 'hard', 'medium'(default), 'soft'
vim.g.gruvbox_material_background = 'medium'

-- For better performance
vim.g.gruvbox_material_better_performance = true

vim.g.gruvbox_material_foreground = 'material'

vim.cmd.colorscheme('gruvbox-material')

