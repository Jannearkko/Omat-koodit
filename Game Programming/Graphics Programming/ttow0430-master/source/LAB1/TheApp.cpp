/**
 * ============================================================================
 *  Name        : TheApp.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : LAB2
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#include "TheApp.h"


// constructor, init members
TheApp::TheApp() :
	m_uVertexShader(0),
	m_uFragmentShader(0),
	m_uProgram(0),
	m_fX(0.0f),
	m_fAngle(0.0f)

{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	auto renderer = GetOpenGLRenderer();
	m_uVertexShader = renderer->CreateVertexShaderFromFile("triangleshader.vert");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("triangleshader.frag");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram)
	{
		return false;
	}

	// TODO: make a gouraud shaded triangle
	constexpr float hw = 2.0f;
	m_Geometry[0] = VERTEX(-hw, -hw, 0.0f, 0.0f, 1.0f, 0.0f, 1.0f);
	m_Geometry[1] = VERTEX(0.0f, hw, 0.0f, 0.0f, 0.0f, 1.0f, 1.0f);
	m_Geometry[2] = VERTEX(hw, -hw, 0.0f, 1.0f, 0.0f, 0.0f, 1.0f);

	m_mView = glm::lookAt(
		glm::vec3(0.0f, 0.0f, 5.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));

	m_mProjection = glm::perspective(1.51f, GetAspect(), 0.1f, 500.0f);

	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
	if (!rotating)
		return;
	// main loop
	const glm::mat4 rotation = glm::rotate(glm::mat4(1.0f), m_fAngle, glm::vec3(0.0f, 0.0f, 1.0f));
	glm::mat4 translation(1.0f);
	translation[3][0] = 2.0f; // kokeile muuttaa 0.0f jos silloin pyörii keskellä akselin ympäri!

	m_mModel = rotation * translation; // pyörii jonkin muun akselin ympärillä
	//m_mModel = translation * rotation; // pyörii paikallaan

	//m_mModel[3][2] = m_fX; // no perspective

	m_fX += 2.0f * frametime;
	if (m_fX > 5.0f) m_fX = -5.0f;

	m_fAngle += frametime;
	if (m_fAngle > glm::pi<float>() * 2.0f) m_fAngle = 0.0f;
	
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// setup the rendering program
	glUseProgram(m_uProgram);

	GLint position = glGetAttribLocation(m_uProgram, "position");
	glEnableVertexAttribArray(position);
	glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE, VERTEX::GetStride(), m_Geometry);

	GLint color = glGetAttribLocation(m_uProgram, "color");
	glEnableVertexAttribArray(color);
	glVertexAttribPointer(color, 4, GL_FLOAT, GL_FALSE, VERTEX::GetStride(), (float*)m_Geometry + 3);

	glm::mat4 mvp(m_mProjection * m_mView * m_mModel);
	OpenGLRenderer::SetUniformMatrix4(m_uProgram, "mvpMatrix", mvp);


	glDrawArrays(GL_TRIANGLES, 0, 3);
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
}


bool TheApp::OnKeyDown(uint32_t keyCode)
{
	if (keyCode == KEY_ESC)
	{
		Close();
		return true;
	}
	if (keyCode == KEY_SPACE)
	{
		rotating = !rotating;
	}

	return false;
}

