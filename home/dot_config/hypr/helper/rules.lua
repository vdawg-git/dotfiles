-- Sugar for Hyprland rules: plain strings match whole values without regard to case;
-- rx(...) keeps regex syntax. `match` ANDs its fields, while `any` emits one
-- independent rule per field (OR). Options such as float/center are copied to
-- every emitted rule. This keeps rules.lua declarative without repeating
-- anchors, regex escaping, and hl.window_rule/hl.layer_rule calls.
-- Use native Hyprland matcher names (e.g. initial_title), not event/window field names.

---@class Rules.Regex
---@field __kind "rx"
---@field pattern string

---@alias Rules.Pattern string|Rules.Regex|(string|Rules.Regex)[]
---@alias Rules.Match table<string, Rules.Pattern|number|boolean>

---@class Rules.WindowRule: HL.WindowRuleSpec
---@field name string
---@field match? Rules.Match
---@field any? table<string, Rules.Pattern>

---@class Rules.LayerRule: HL.LayerRuleSpec
---@field name string
---@field match? Rules.Match
---@field any? table<string, Rules.Pattern>

---@class Rules.Helper
---@field rx fun(pattern: string): Rules.Regex
---@field windowRules fun(rules: Rules.WindowRule[])
---@field layerRules fun(rules: Rules.LayerRule[])

---Mark a pattern as raw regex; plain strings would be escaped and anchored.
---@param pattern string
---@return Rules.Regex
local function rx(pattern)
	return { __kind = "rx", pattern = pattern }
end

-- Only these match fields accept regexes; other match values pass through unchanged.
-- Also gates `any`, since it can only expand a single pattern field at a time.
---@type table<string, true>
local patternKeys = {
	class = true,
	title = true,
	initial_class = true,
	initial_title = true,
	tag = true,
	workspace = true,
	namespace = true,
}

---Distinguish an rx marker from a list of alternatives.
---@param value unknown
---@return boolean
local function isRx(value)
	return type(value) == "table" and value.__kind == "rx"
end

---Escape regex metacharacters so a plain string is treated literally.
---@param s string
---@return string
local function escapeRegex(s)
	return tostring(s):gsub("([%^%$%(%)%%%.%[%]%*%+%-%?%{%}%|])", function(char)
		return "\\" .. char
	end)
end

---Match a whole value, case-insensitively (rather than a substring).
---@param s string
---@return string
local function compileExact(s)
	return "^(?i:" .. escapeRegex(s) .. ")$"
end

---Compile one matcher: preserve raw regex, or make a literal exact match.
---@param value string|Rules.Regex
---@return string
local function compileOne(value)
	if isRx(value) then
		---@cast value Rules.Regex
		return value.pattern
	end

	---@cast value string
	return compileExact(value)
end

---Join alternatives as a regex OR; a single value needs no join.
---@param values Rules.Pattern
---@return string
local function compileList(values)
	if type(values) ~= "table" or isRx(values) then
		return compileOne(values)
	end

	if #values == 0 then
		error("empty matcher list")
	end

	local parts = {}
	for _, value in ipairs(values) do
		table.insert(parts, compileOne(value))
	end

	return table.concat(parts, "|")
end

---Compile pattern fields in an AND-style `match`; leave booleans/numbers alone.
---@param match Rules.Match|nil
---@return table<string, string|number|boolean>
local function compileMatch(match)
	local out = {}

	for key, value in pairs(match or {}) do
		if patternKeys[key] then
			out[key] = compileList(value)
		else
			out[key] = value
		end
	end

	return out
end

---Shallow-copy options so each emitted rule has its own match table.
---@param tbl table
---@return table
local function copy(tbl)
	local out = {}
	for key, value in pairs(tbl) do
		out[key] = value
	end
	return out
end

---Keep effect options and name; `match`/`any` are helper-only input fields.
---@param rule Rules.WindowRule|Rules.LayerRule
---@return table
local function ruleOptions(rule)
	local opts = {}

	for key, value in pairs(rule) do
		if key ~= "any" and key ~= "match" then
			opts[key] = value
		end
	end

	return opts
end

---Reject unnamed rules or rules with no matcher before registering them.
---@param kind string
---@param rule Rules.WindowRule|Rules.LayerRule
local function validateRule(kind, rule)
	if not rule.name then
		error(kind .. ": rule missing name")
	end

	if not rule.match and not rule.any then
		error(kind .. ": rule '" .. tostring(rule.name) .. "' needs match or any")
	end
end

---Reject `any` fields that cannot be compiled as pattern matchers.
---@param kind string
---@param rule Rules.WindowRule|Rules.LayerRule
local function validateAny(kind, rule)
	if not rule.any then
		return
	end

	for key, _ in pairs(rule.any) do
		if not patternKeys[key] then
			error(kind .. ": rule '" .. tostring(rule.name) .. "' has invalid any key: " .. tostring(key))
		end
	end
end

---Register window rules: one for `match`, plus one per `any` field.
---Each `any` rule gets a distinct name (name-key) and the same effects.
---@param rules Rules.WindowRule[]
local function windowRules(rules)
	for _, rule in ipairs(rules) do
		validateRule("windowRules", rule)
		validateAny("windowRules", rule)

		local opts = ruleOptions(rule)

		if rule.match then
			local emitted = copy(opts)
			emitted.match = compileMatch(rule.match)
			hl.window_rule(emitted)
		end

		if rule.any then
			for key, values in pairs(rule.any) do
				local emitted = copy(opts)
				emitted.name = rule.name .. "-" .. key
				emitted.match = {
					[key] = compileList(values),
				}
				hl.window_rule(emitted)
			end
		end
	end
end

---Register layer rules with the same AND/OR expansion as windowRules.
---@param rules Rules.LayerRule[]
local function layerRules(rules)
	for _, rule in ipairs(rules) do
		validateRule("layerRules", rule)
		validateAny("layerRules", rule)

		local opts = ruleOptions(rule)

		if rule.match then
			local emitted = copy(opts)
			emitted.match = compileMatch(rule.match)
			hl.layer_rule(emitted)
		end

		if rule.any then
			for key, values in pairs(rule.any) do
				local emitted = copy(opts)
				emitted.name = rule.name .. "-" .. key
				emitted.match = {
					[key] = compileList(values),
				}
				hl.layer_rule(emitted)
			end
		end
	end
end

---@type Rules.Helper
return {
	rx = rx,
	windowRules = windowRules,
	layerRules = layerRules,
}
