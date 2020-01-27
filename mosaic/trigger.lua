-- encoding:
-- 2bit pod id (zero based)
-- 2bit channel id (irgb)
-- 4bit color value
code = get_trigger_variable(1).integer
pod = ((code << 30) >> 30) + 1
channel = (code << 28) >> 30
color = ((code >> 4) << 5) + 31

log("code " .. code .. " pod " .. pod .. " channel " .. channel .. " col " .. color)
ov = get_fixture_override(pod)
if ov then
    if channel == 0 then
        ov:set_intensity(color)
    elseif channel == 1 then
        ov:set_red(color)
    elseif channel == 2 then
        ov:set_green(color)
    elseif channel == 3 then
        ov:set_blue(color)
    end
    
end
