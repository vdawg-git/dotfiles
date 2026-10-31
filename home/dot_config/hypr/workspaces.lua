local vars = require("variables")
local mod = vars.main_mod

---@param name string
---@param program string
---@param window_rules? table<string, string|number|boolean>
function on_empty(name, program, window_rules)
  hl.on("workspace.created", function(workspace)
    if workspace.name ~= name or workspace.is_empty == false then
      return
    end

    local rules = {}
    for key, value in pairs(window_rules or {}) do
      rules[key] = value
    end
    rules.workspace = workspace.name .. " silent"

    hl.exec_cmd(program, rules)
  end)
end

on_empty("2", "brave")
on_empty("special:scratchpad", "kitty")


hl.bind(
  mod .. " + n",
  hl.dsp.window.move({ workspace = "special:scratchpad" }),
  { description = "Move window to scratchpad" }
)

hl.bind(mod .. " + m", hl.dsp.workspace.toggle_special("scratchpad"), { description = "Toggle scratchpad" })
