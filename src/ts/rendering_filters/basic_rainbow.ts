import type { RenderData } from "../rendering_chain/led_rendering_chain";
import { get_temporal_oscillation } from "../timing/oscillations";

const FORWARD_MOTION_PERIOD = 24001; //Should be near oscillation but slightly changed



export function basic_rainbow(data:RenderData):RenderData
{
    const forward_motion_fraction=get_temporal_oscillation(FORWARD_MOTION_PERIOD,data.time);
    
    const simple_curve = (location_fraction:number) => {
        let rotation=location_fraction%1+forward_motion_fraction;
        return rotation;
    };

    for(let n=0;n<data.squares.length;n++)
    {
        const location_fraction=n/data.squares.length;
        const rotation=simple_curve(location_fraction);

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