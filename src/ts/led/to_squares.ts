import type { Square } from "../rendering_chain/led_rendering_chain";

const HEIGHT=200;
const WIDTH=400;

const REAL_PIXEL_COUNT_LENGTHWISE=150;
const REAL_PIXEL_COUNT_WIDTHWISE=75;
const FACTOR=4;
const PIXEL_COUNT_LENGTHWISE=Math.round(REAL_PIXEL_COUNT_LENGTHWISE/FACTOR);
const PIXEL_COUNT_WIDTHWISE=Math.round(REAL_PIXEL_COUNT_WIDTHWISE/FACTOR);

export function get_squares_vertical()
{
    const max_width=WIDTH/(PIXEL_COUNT_WIDTHWISE);
    const max_height=HEIGHT/(PIXEL_COUNT_LENGTHWISE);

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
                    h:0,
                    s:1,
                    v:0,
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
                    h:0,
                    s:1,
                    v:0,
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
                    h:0,
                    s:1,
                    v:0,
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
                    h:0,
                    s:1,
                    v:0,
                    a:1
                }
            }
        )
    }

    return squares;
}

export function get_squares_horizontal()
{

    const max_width=WIDTH/(PIXEL_COUNT_LENGTHWISE);
    const max_height=HEIGHT/(PIXEL_COUNT_WIDTHWISE);

    const square_size = Math.min(max_width,max_height);


    const squares:Square[]=[];

    //Right of room, top of canvas
    for(let n=1;n<PIXEL_COUNT_LENGTHWISE;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:(PIXEL_COUNT_LENGTHWISE-n)/PIXEL_COUNT_LENGTHWISE*WIDTH,
                    y:HEIGHT-square_size
                },
                size:square_size,
                color:{
                    h:0,
                    s:1,
                    v:0,
                    a:1
                }
            }
        )
    }

    
    //Front of room, left of canvas
    for(let n=1;n<PIXEL_COUNT_WIDTHWISE;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:0,
                    y:(PIXEL_COUNT_WIDTHWISE-n)/PIXEL_COUNT_WIDTHWISE*HEIGHT
                },
                size:square_size,
                color:{
                    h:0,
                    s:1,
                    v:0,
                    a:1
                }
            }
        )
    }


    
    //Left of room, bottom of canvas
    for(let n=1;n<PIXEL_COUNT_LENGTHWISE;n++) //Leave last pixel to next strip
    {
        squares.push(
            {
                bottom_left:{
                    x:n/PIXEL_COUNT_LENGTHWISE*WIDTH-square_size,
                    y:0
                },
                size:square_size,
                color:{
                    h:0,
                    s:1,
                    v:0,
                    a:1
                }
            }
        )
    }

    //Back of room, right of canvas
    for(let n=1;n<PIXEL_COUNT_WIDTHWISE;n++) //Leave last pixel to right strip
    {
        squares.push(
            {
                bottom_left:{
                    x:WIDTH-square_size,
                    y:n/PIXEL_COUNT_WIDTHWISE*HEIGHT-square_size
                },
                size:square_size,
                color:{
                    h:0,
                    s:1,
                    v:0,
                    a:1
                }
            }
        )
    }

    return squares;
}