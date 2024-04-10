/**
 * ============================================================================
 *  Name        : TheApp.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : LAB3
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
	m_uTexture(0)
{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	auto renderer = GetOpenGLRenderer();
	m_uVertexShader = renderer->CreateVertexShaderFromFile("triangleshader.vs");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("triangleshader.fs");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);


	// TODO: load a leaf.png texture
	m_uTexture = renderer->CreateTexture("leaf.png");

	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram || !m_uTexture)
	{
		return false;
	}

	// TODO: add texture mapping coordinates to triangle			Uv-coordinates
	m_Triangle[0] = TRIANGLEVERTEX(glm::vec3(0.5f, -0.5f, 0.0f),	 1.0f, 1.0f);
	m_Triangle[1] = TRIANGLEVERTEX(glm::vec3(-0.5f, -0.5f, 0.0f),	 0.0f, 1.0f);
	m_Triangle[2] = TRIANGLEVERTEX(glm::vec3( 0.0f,  0.5f, 0.0f),	 0.5f, 0.0f);

	m_uTextureMap = true; // boolean texture map checker


	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	// TODO: delete loaded texture
	m_uTexture = 0;
	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// setup the rendering program
	glUseProgram(m_uProgram);


	// get the vertex attribute locations
	GLint position = glGetAttribLocation(m_uProgram, "position");
	GLint uv = glGetAttribLocation(m_uProgram, "uv");

	// set the vertex position
	glEnableVertexAttribArray(position);
	glEnableVertexAttribArray(uv);

	glVertexAttribPointer(uv, 2, GL_FLOAT, GL_FALSE, TRIANGLEVERTEX::GetStride(), (float*)m_Triangle + 3);
	glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE, TRIANGLEVERTEX::GetStride(), m_Triangle);

	// TODO: set the texture coordinate attribute to the program
	renderer.SetTexture(m_uProgram, m_uTexture, 0, "texture01");

	// set the model matrix
	glm::mat4 model = glm::mat4(1.0f);
	GLint location = glGetUniformLocation(m_uProgram, "modelMatrix");
	glUniformMatrix4fv(location, 1, GL_FALSE, &model[0][0]);

	glDrawArrays(GL_TRIANGLES, 0, 3);
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
}


bool TheApp::OnKeyDown(uint32_t keyCode)
{
	// TODO: modify texture coordinates when user presses space
	if (keyCode == KEY_ESC)
	{
		Close();
		return true;
	}
	if (keyCode == KEY_SPACE)
	{
		if (m_uTextureMap) // change texture mapping if current mapping is true
		{
			m_Triangle[0].tu = 1.0f;
			m_Triangle[1].tu = 0.0f;
			m_Triangle[2].tu = 0.5f;
			m_Triangle[0].tv = 0.0f;
			m_Triangle[1].tv = 0.0f;
			m_Triangle[2].tv = 1.0f;
			m_uTextureMap = false;
		}
		else // revert the changes if current mapping is false
		{
			m_Triangle[0].tu = 1.0f;
			m_Triangle[1].tu = 0.0f;
			m_Triangle[2].tu = 0.5f;
			m_Triangle[0].tv = 1.0f;
			m_Triangle[1].tv = 1.0f;
			m_Triangle[2].tv = 0.0f;
			m_uTextureMap = true;
		}

	}

	return false;
}

