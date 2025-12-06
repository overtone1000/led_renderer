//Based on https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
//Currently on "In the case above you can see our vertex shader is doing nothing but"...

import convert from "color-convert";
import { draw_square } from "../primitives/square";
import type { Color, Vec_2D } from "../primitives/vecs";
import { createProgram } from "./program";
import type { RenderingChain } from "./rendering_chain_type";
import { createShader, fragmentShaderSource, vertexShaderSource } from "./shaders";

export type Square={bottom_left:Vec_2D,size:number,color:Color};
export type RenderData=
{
    time:number,
    squares:Square[]
}

export function init(canvas_id:string):RenderingChain|null
{
    const canvas = document.querySelector<HTMLCanvasElement>(canvas_id);
    // Initialize the GL context

    if(canvas!==null)
    {
        const gl = canvas.getContext("webgl");

        // Only continue if WebGL is available and working
        if (gl === null) {
            alert(
                "Unable to initialize WebGL. Your browser or machine may not support it.",
            );
            return null;
        }

        // Set clear color to red, fully opaque
        gl.clearColor(1.0, 0.0, 0.0, 0.0);

        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);

        if(vertexShaderSource!==null && fragmentShaderSource!==null)
        {
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

            if(vertexShader!==null && fragmentShader!==null)
            {
                const program = createProgram(gl, vertexShader, fragmentShader);

                if(program!==null)
                {
                    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
                    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
                    const colorUniformLocation = gl.getUniformLocation(program, "u_color");

                    if(resolutionUniformLocation!==null && colorUniformLocation!==null)
                    {
                        const positionBuffer = gl.createBuffer();
                                            
                        //webglUtils.resizeCanvasToDisplaySize(gl.canvas);
                        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

                        const rendering_chain = {
                            gl,
                            program,
                            positionAttributeLocation,
                            resolutionUniformLocation,
                            colorUniformLocation,
                            positionBuffer
                        };

                        return rendering_chain;
                    }
                }   
            }
        }
    }
    return null;
}

export function render_frame(rendering_chain:RenderingChain,data:RenderData)
{
    requestAnimationFrame(()=>{render(rendering_chain,data)});
}

function render(rendering_chain:RenderingChain,data:RenderData)
{
    if(rendering_chain!==null)
    {
        const gl = rendering_chain.gl;
        
        //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(rendering_chain.program);
        gl.enableVertexAttribArray(rendering_chain.positionAttributeLocation);
        gl.uniform2f(rendering_chain.resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        for(const square of data.squares)
        {
            const rgb = convert.hsv.rgb(
                square.color.h,
                square.color.s,
                square.color.v
            );

            gl.uniform4f(
                rendering_chain.colorUniformLocation, 
                rgb[0]/255,
                rgb[1]/255,
                rgb[2]/255,
                square.color.a,
            );
            draw_square(rendering_chain, square.bottom_left, square.size);
        }
    }
}