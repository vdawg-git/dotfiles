---@param value any
---@return number|nil
---@return number|nil
local function getMonitorSizePair(value)
  return value.x or value[1], value.y or value[2]
end

---@param monitor HL.Monitor
---@return boolean
local function isBigMonitor(monitor)
  local physicalWidthMm, physicalHeightMm = getMonitorSizePair(monitor.size)

  if physicalWidthMm and physicalHeightMm and physicalWidthMm < 2000 and physicalHeightMm < 2000 then
    local diagonalInches = math.sqrt(physicalWidthMm ^ 2 + physicalHeightMm ^ 2) / 25.4

    return diagonalInches >= 24
  end

  local effectiveWidth = monitor.width / monitor.scale
  local effectiveHeight = monitor.height / monitor.scale

  return effectiveWidth >= 2400 and effectiveHeight >= 1350
end

local function getSingleTiledWindowGap()
  for _, monitor in ipairs(hl.get_monitors()) do
    if isBigMonitor(monitor) then
      return 40
    end
  end

  return 24
end

-- More space if there is only one tiled window.
local function applySingleTiledWindowGap()
  hl.workspace_rule({ workspace = "w[t1]s[false]", gaps_out = getSingleTiledWindowGap() })

  hl.workspace_rule({ workspace = "w[t1]s[true]", gaps_out = getSingleTiledWindowGap() + 80 })
end

hl.on("monitor.added", applySingleTiledWindowGap)
hl.on("monitor.removed", applySingleTiledWindowGap)
applySingleTiledWindowGap()
