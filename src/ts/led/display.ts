import { init, render_frame, type RenderData } from "../rendering_chain/led_rendering_chain";
import { get_squares_horizontal } from "./to_squares";


export function led_display(canvas_id:string, additional_modifications:((data:RenderData)=>RenderData)[])
{
    const rendering_chain = init(canvas_id);

    if(rendering_chain!==null)
    {
        const start_millis=Date.now();

        const squares = get_squares_horizontal();

        console.debug("Starting rendering.");
        setInterval(
            ()=>{

                const time=Date.now()-start_millis;

                let data:RenderData = {
                    time,
                    squares
                };
        
                for(const modification of additional_modifications)
                {
                    data = modification(data);
                }

                render_frame(rendering_chain,data);
            },
            100
        );
    }
    else
    {
        console.error("Couldn't create rendering chain.");
    }
}