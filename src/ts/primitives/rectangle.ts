import type { RenderingChain } from "../rendering_chain/rendering_chain";
import type { Vec_2D } from "./vecs";

export function draw_rectangle(rendering_chain:RenderingChain, bottom_left:Vec_2D, rec_size:Vec_2D)
{
    const gl = rendering_chain.gl;

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, rendering_chain.positionBuffer);
    const positions = [
        bottom_left.x, bottom_left.y,
        bottom_left.x, bottom_left.y+rec_size.y,
        bottom_left.x+rec_size.x, bottom_left.y,
        bottom_left.x+rec_size.x, bottom_left.y,
        bottom_left.x+rec_size.x, bottom_left.y+rec_size.y,
        bottom_left.x, bottom_left.y+rec_size.y,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(rendering_chain.positionAttributeLocation, size, type, normalize, stride, offset)

    const primitiveType = gl.TRIANGLES;
    const count = positions.length/2;
    gl.drawArrays(primitiveType, offset, count);
}