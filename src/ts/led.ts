//Based on https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
//Currently on "In the case above you can see our vertex shader is doing nothing but"...

const vertexShaderSource = `
    // an attribute will receive data from a buffer
    attribute vec2 a_position;
    uniform vec2 u_resolution;
     
    // all shaders have a main function
    void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;
    
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
    
        // convert from 0->2 to -1->+1 (clip space)
        vec2 clipSpace = zeroToTwo - 1.0;
    
        gl_Position = vec4(clipSpace, 0, 1);
    }
`;

const fragmentShaderSource = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
        gl_FragColor = u_color;
    }
`;

type RenderingChain = {
    gl:WebGLRenderingContext,
    program:WebGLProgram,
    positionAttributeLocation:number,
    resolutionUniformLocation:WebGLUniformLocation,
    colorUniformLocation:WebGLUniformLocation,
    positionBuffer:WebGLBuffer
};

let rendering_chain:RenderingChain|null=null;

init();
render();


function createShader(gl:WebGLRenderingContext, type:number, source:string) {
    let shader = gl.createShader(type);

    if(shader!==null)
    {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        else
        {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
    }
    else
    {
        return null;
    }
}

function createProgram(gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    else
    {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
}

function init()
{
    console.debug("Initializing.");
    const canvas = document.querySelector<HTMLCanvasElement>("#led-gl-canvas");
    // Initialize the GL context

    if(canvas!==null)
    {
        const gl = canvas.getContext("webgl");

        // Only continue if WebGL is available and working
        if (gl === null) {
            alert(
            "Unable to initialize WebGL. Your browser or machine may not support it.",
            );
            return;
        }

        // Set clear color to red, fully opaque
        gl.clearColor(1.0, 0.0, 0.0, 0.0);

        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);

        console.debug(vertexShaderSource);
        console.debug(fragmentShaderSource);
        if(vertexShaderSource!==null && fragmentShaderSource!==null)
        {
            let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

            if(vertexShader!==null && fragmentShader!==null)
            {
                let program = createProgram(gl, vertexShader, fragmentShader);

                if(program!==null)
                {
                    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
                    let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
                    let colorUniformLocation = gl.getUniformLocation(program, "u_color");

                    if(resolutionUniformLocation!==null && colorUniformLocation!==null)
                    {
                        let positionBuffer = gl.createBuffer();
                                            
                        //webglUtils.resizeCanvasToDisplaySize(gl.canvas);
                        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

                        rendering_chain = {
                            gl,
                            program,
                            positionAttributeLocation,
                            resolutionUniformLocation,
                            colorUniformLocation,
                            positionBuffer
                        };
                    }
                }   
            }
        }
    }
}

let continue_render=true;
function render()
{
    if(rendering_chain!==null)
    {
        do
        {
            let gl = rendering_chain.gl;
        
            // Clear the canvas
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(rendering_chain.program);
            gl.enableVertexAttribArray(rendering_chain.positionAttributeLocation);
            gl.uniform2f(rendering_chain.resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

            let bottom_left={x:1,y:1};
            let rec_size={x:200,y:20};
            draw_rectangle(rendering_chain, bottom_left,rec_size);
        }
        while(continue_render);
    }
}

type Vec_2D={x:number,y:number};

function draw_rectangle(rendering_chain:RenderingChain, bottom_left:Vec_2D, rec_size:Vec_2D)
{
    let gl = rendering_chain.gl;

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, rendering_chain.positionBuffer);
    let positions = [
        bottom_left.x, bottom_left.y,
        bottom_left.x, bottom_left.y+rec_size.y,
        bottom_left.x+rec_size.x, bottom_left.y,
        bottom_left.x+rec_size.x, bottom_left.y,
        bottom_left.x+rec_size.x, bottom_left.y+rec_size.y,
        bottom_left.x, bottom_left.y+rec_size.y,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(rendering_chain.positionAttributeLocation, size, type, normalize, stride, offset)

    // Set a random color.
    gl.uniform4f(rendering_chain.colorUniformLocation, 0, 0, 1, 1);

    let primitiveType = gl.TRIANGLES;
    let count = positions.length/2;
    gl.drawArrays(primitiveType, offset, count);
}