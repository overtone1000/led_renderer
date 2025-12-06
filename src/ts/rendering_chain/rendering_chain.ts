export type RenderingChain = {
    gl:WebGLRenderingContext,
    program:WebGLProgram,
    positionAttributeLocation:number,
    resolutionUniformLocation:WebGLUniformLocation,
    colorUniformLocation:WebGLUniformLocation,
    positionBuffer:WebGLBuffer
};