export type RenderingChain = {
    canvas:HTMLCanvasElement,
    gl:WebGLRenderingContext,
    program:WebGLProgram,
    positionAttributeLocation:number,
    resolutionUniformLocation:WebGLUniformLocation,
    colorUniformLocation:WebGLUniformLocation,
    positionBuffer:WebGLBuffer
};