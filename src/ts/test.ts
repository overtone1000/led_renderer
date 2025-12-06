import { init, render_frame, type RenderData, type Square } from "./led";
import convert from 'color-convert';

console.debug("Initializating.");

const HEIGHT=450;
const WIDTH=225;

const REAL_PIXEL_COUNT_LENGTHWISE=150;
const REAL_PIXEL_COUNT_WIDTHWISE=75;
const FACTOR=4;
const PIXEL_COUNT_LENGTHWISE=REAL_PIXEL_COUNT_LENGTHWISE/FACTOR;
const PIXEL_COUNT_WIDTHWISE=REAL_PIXEL_COUNT_WIDTHWISE/FACTOR;

const rendering_chain = init();

const start_millis=Date.now();

function get_squares()
{

    const max_width=WIDTH/PIXEL_COUNT_WIDTHWISE;
    const max_height=HEIGHT/PIXEL_COUNT_LENGTHWISE;

    const square_size = Math.min(max_width,max_height);


    const squares:Square[]=[];

    //Right of room, right of canvas
    for(let n=0;n<PIXEL_COUNT_LENGTHWISE-1;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:WIDTH-square_size,
                    y:n/PIXEL_COUNT_LENGTHWISE*HEIGHT
                },
                size:square_size,
                color:{
                    r:0,
                    g:1,
                    b:0,
                    a:1
                }
            }
        )
    }

    //Front of room, top of canvas
    for(let n=0;n<PIXEL_COUNT_WIDTHWISE-1;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:(PIXEL_COUNT_WIDTHWISE-n)/PIXEL_COUNT_WIDTHWISE*WIDTH-square_size,
                    y:HEIGHT-square_size
                },
                size:square_size,
                color:{
                    r:1,
                    g:0,
                    b:0,
                    a:1
                }
            }
        )
    }

    //Left of room, left of canvas
    for(let n=0;n<PIXEL_COUNT_LENGTHWISE-1;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:0,
                    y:(PIXEL_COUNT_LENGTHWISE-n)/PIXEL_COUNT_LENGTHWISE*HEIGHT-square_size
                },
                size:square_size,
                color:{
                    r:0,
                    g:1,
                    b:0,
                    a:1
                }
            }
        )
    }

    //Back of room, bottom of canvas
    for(let n=0;n<PIXEL_COUNT_WIDTHWISE-1;n++) //Leave last pixel to right strip
    {
        squares.push(
            {
                bottom_left:{
                    x:n/PIXEL_COUNT_WIDTHWISE*WIDTH,
                    y:0
                },
                size:square_size,
                color:{
                    r:1,
                    g:0,
                    b:1,
                    a:1
                }
            }
        )
    }

    return squares;
}

if(rendering_chain!==null)
{
    const squares = get_squares();
    setInterval(
        ()=>{

            const time=Date.now()-start_millis;
            
            const time_osc=(Math.sin(time/1000)+1)/2;
            const rgb = convert.hsv.rgb(360*time_osc,100,100);
            //console.debug(time_osc,rgb);

            for(const n in squares)
            {
                const square = squares[n];                
                
                square.color=
                {
                    r:rgb[0]/255,
                    g:rgb[1]/255,
                    b:rgb[2]/255,
                    a:1
                };
            }

            const data:RenderData=
            {
                squares
            };

            render_frame(rendering_chain,data);
        },
        10
    );
}