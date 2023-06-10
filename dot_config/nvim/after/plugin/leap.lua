local leap = require('leap')

leap.opts.equivalence_classes = {' \r\n\t', '([{<', {'"', "'", '`'}}
leap.add_default_mappings()

vim.api.nvim_set_hl(0, 'LeapBackdrop', {
    bg = '#1c1c1c'
})

vim.api.nvim_set_hl(0, 'LeapLabelPrimary', {
    fg = '#101010',
    bg = '#fda697'
})

vim.api.nvim_set_hl(0, 'LeapLabelSecondary', {
    bg = '#a6c8c0',
    fg = 'black'
})

vim.api.nvim_set_hl(0, 'LeapMatch', {
    bg = '#fca972',
    fg = 'black'
})

