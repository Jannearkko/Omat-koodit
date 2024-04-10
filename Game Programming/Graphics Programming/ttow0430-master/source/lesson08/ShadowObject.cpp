/**
 * ============================================================================
 *  Name        : ShadowObject.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : simple game object example
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#include "ShadowObject.h"



ShadowObject::ShadowObject(const std::shared_ptr<Geometry>& geometry, const std::shared_ptr<Material>& material) :
	GeometryNode(geometry, material),
	m_bShadowCaster(false),
	m_bShadowReceiver(false)
{
}


void ShadowObject::Render(IRenderer& renderer, GLuint program)
{
	if (m_pGeometry)
	{
		// set shadow map matrix
		const glm::mat4 shadowMapMatrix = renderer.GetShadowBiasMatrix() * GetDepthMatrix(renderer.GetLightPos());
		GLint location = glGetUniformLocation(program, "shadowMapMatrix");
		glUniformMatrix4fv(location, 1, GL_FALSE, &shadowMapMatrix[0][0]);

		// set shadow receiver flag
		float shadowReceiver = IsShadowReceiver() ? 1.0f : 0.0f;
		location = glGetUniformLocation(program, "shadowReceiver");
		glUniform1f(location, shadowReceiver);
	}

	GeometryNode::Render(renderer, program);

	if (m_pGeometry)
	{
		m_pGeometry->DisableAttribs(program);
	}
}


void ShadowObject::DrawShadowOnly(IRenderer& renderer, GLuint program)
{
	if (m_pGeometry)
	{
		// get the vertex attribute locations
		const GLint positionLocation = glGetAttribLocation(program, "position");

		// set the vertex position
		glEnableVertexAttribArray(positionLocation);
		glVertexAttribPointer(
			positionLocation,
			3,
			GL_FLOAT,
			GL_FALSE,
			Geometry::VERTEX::GetStride(),
			m_pGeometry->GetData());

		const glm::mat4 depthMVP = GetDepthMatrix(renderer.GetLightPos());
		const GLint location = glGetUniformLocation(program, "modelViewProjectionMatrix");
		glUniformMatrix4fv(location, 1, GL_FALSE, &depthMVP[0][0]);

		m_pGeometry->Draw(renderer);

		glDisableVertexAttribArray(positionLocation);
	}
}


glm::mat4 ShadowObject::GetDepthMatrix(const glm::vec3& lightPosition) const
{
	//glm::vec3 lightInvDir = glm::normalize(-lightPosition);
	const glm::mat4 depthProjectionMatrix = glm::ortho<float>(-10, 10, -10, 10, 1.0f, 5000.0f);
	const glm::mat4 depthViewMatrix = glm::lookAt(lightPosition, glm::vec3(0.0f, 0.0f, 0.0f), glm::vec3(0.0f, 1.0f, 0.0f));
	return depthProjectionMatrix * depthViewMatrix * m_mModel;

	/*
	const glm::mat4 depthProjectionMatrix = glm::perspective<float>(45.0f, 1.0f, 2.0f, 500.0f);
	const glm::mat4 depthViewMatrix = glm::lookAt(vLightPosition, glm::vec3(0.0f ,0.0f, 0.0f), glm::vec3(0.0f, 1.0f, 0.0f));
	return depthProjectionMatrix * depthViewMatrix * m_mModel;
	*/
}


