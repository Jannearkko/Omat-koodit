#include "QuadNode.h"


void QuadNode::Setup(IRenderer& renderer, GLuint program, GLuint texture, float* vertexData, int32_t vertexStride)
{
	// setup the rendering of our quad
	glUseProgram(program);

	// find the locations of position and uv attributes in shader program
	GLint position = glGetAttribLocation(program, "position");
	GLint uv = glGetAttribLocation(program, "uv");

	// enable the position and uv attributes
	glEnableVertexAttribArray(position);
	glEnableVertexAttribArray(uv);

	// set the data source for position and uv attributes
	glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE, vertexStride, vertexData);
	glVertexAttribPointer(uv, 2, GL_FLOAT, GL_FALSE, vertexStride, vertexData + 3);

	// set the texture for the quad (slot 0)
	renderer.SetTexture(program, texture, 0, "texture01");
}


void QuadNode::Render(IRenderer& renderer, GLuint program)
{
	// set our matrix to program uniform
	glm::mat4 mvp = renderer.GetProjectionMatrix() *
		renderer.GetViewMatrix() *
		GetWorldMatrix();
	GLint mvpMatrixLocation = glGetUniformLocation(program, "mvpMatrix");
	glUniformMatrix4fv(mvpMatrixLocation, 1, GL_FALSE, &mvp[0][0]);

	glDrawArrays(GL_TRIANGLES, 0, 6);

	// render all child nodes
	Node::Render(renderer, program);
}


