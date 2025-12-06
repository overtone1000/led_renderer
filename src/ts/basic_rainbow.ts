import { led_display } from "./led/display";
import { basic_rainbow } from "./rendering_filters/basic_rainbow";

console.debug("Basic Rainbow");
led_display("#c-basic-rainbow", [basic_rainbow]);