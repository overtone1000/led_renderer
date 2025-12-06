import type { RenderData } from "../rendering_chain/led_rendering_chain";
import { get_temporal_oscillation } from "../timing/oscillations";

const OSCILLATION_PERIOD = 30000;
const FORWARD_MOTION_PERIOD = 24001; //Should be near oscillation but slightly changed



export function stretchy_rainbow(data:RenderData):RenderData
{
    const forward_motion_fraction=get_temporal_oscillation(FORWARD_MOTION_PERIOD,data.time);
    const oscillation_fraction=get_temporal_oscillation(OSCILLATION_PERIOD,data.time);
    const oscillation_motion=(Math.sin(oscillation_fraction*(2*Math.PI))+1)/2

    //console.debug(time,forward_motion_fraction,oscillation_motion);

    //console.debug(time_osc,rgb);

    const funky_curve = (location_fraction:number) => {
        let rotation=(location_fraction+oscillation_motion)%1;
        rotation=rotation**2;
        rotation=(Math.cos(rotation*(2*Math.PI))+1)/2
        rotation=rotation+forward_motion_fraction;
        return rotation;
    };

    for(let n=0;n<data.squares.length;n++)
    {
        const location_fraction=n/data.squares.length;
        const rotation=funky_curve(location_fraction);

        const square = data.squares[n];        
        
        //console.debug(location_fraction,rotation);

        square.color=
        {
            h:360*rotation,
            s:100,
            v:100,
            a:1
        };
    }

    return data;
}