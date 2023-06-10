require("vdawg.set")
require("vdawg.remap")
require("vdawg.packer")
require("vdawg.theme")

local augroup = vim.api.nvim_create_augroup
local autocmd = vim.api.nvim_create_autocmd

autocmd('TextYankPost', {
    desc = 'Hightlight selection on yank',
    group = augroup('highlight_yank', {}),
    pattern = '*',
    callback = function()
        vim.highlight.on_yank {
            higroup = 'IncSearch',
            timeout = 500,
            bg = '#000'
        }
    end
})

