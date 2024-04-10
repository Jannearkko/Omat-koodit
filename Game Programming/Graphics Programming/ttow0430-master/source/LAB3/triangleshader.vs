// TODO: add texture coordinates
attribute vec2 uv;

attribute vec3 position;

uniform mat4 modelMatrix;

varying vec2 outUv;

void main(void)
{
	outUv = uv;
	gl_Position = modelMatrix * vec4(position, 1.0);
}


