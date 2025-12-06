import type { RenderingChain } from "../rendering_chain/rendering_chain_type";
import { draw_rectangle } from "./rectangle";
import type { Vec_2D } from "./vecs";

export function draw_square(rendering_chain:RenderingChain, bottom_left:Vec_2D, size:number)
{
    draw_rectangle(rendering_chain,bottom_left,{x:size,y:size});
}