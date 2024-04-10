/**
 * ============================================================================
 *  Name        : TheApp.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : the concrete application layer
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
	m_uTexture(0),
	m_fRotationAngle(0.0f)
{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	auto renderer = GetOpenGLRenderer();
	m_uVertexShader = renderer->CreateVertexShaderFromFile("gouraudshader.vs");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("gouraudshader.fs");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);
	m_uTexture = renderer->CreateTexture("earth.jpg");
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram || !m_uTexture)
	{
		return false;
	}

	// setup our view and projection matrices
	const glm::mat4 view = glm::lookAt(
		glm::vec3(0.0f, 0.0f, 8.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));
	const glm::mat4 projection = glm::perspective(1.51f, GetAspect(), 0.1f, 500.0f);

	// set them into the renderer
	GetRenderer()->SetViewMatrix(view);
	GetRenderer()->SetProjectionMatrix(projection);

	// generate sphere vertices
	m_pSphere = std::make_shared<Geometry>();
	m_pSphere->GenSphere(
		glm::vec3(5.0f, 5.0f, 5.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		48,
		48);

	// set the material
	m_pMaterial = std::make_shared<Material>();
	m_pMaterial->m_cAmbient = glm::vec4(0.1f, 0.1f, 0.1f, 1.0f);
	m_pMaterial->m_cDiffuse = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_pMaterial->m_cSpecular = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_pMaterial->m_cEmissive = glm::vec4(0.1f, 0.1f, 0.4f, 1.0f);
	m_pMaterial->m_fSpecularPower = 150.0f;

	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	glDeleteTextures(1, &m_uTexture);
	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	m_uTexture = 0;
	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
	// the main loop
	m_fRotationAngle += frametime * 0.5f;
	while (m_fRotationAngle > glm::two_pi<float>())
	{
		m_fRotationAngle -= glm::two_pi<float>();
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// render the sphere
	glUseProgram(m_uProgram);

	auto ogl = GetOpenGLRenderer();

	// setup the texture for rendering
	renderer.SetTexture(m_uProgram, m_uTexture, 0, "texture01");

	// setup the model view projection matrices
	glm::mat4 model(1.0f);
	model = glm::rotate(model, m_fRotationAngle, glm::normalize(glm::vec3(0.4f, 0.5f, 0.0f)));
	ogl->SetUniformMatrix4(m_uProgram, "modelMatrix", model);
	ogl->SetUniformMatrix4(m_uProgram, "viewMatrix", renderer.GetViewMatrix());
	ogl->SetUniformMatrix4(m_uProgram, "projectionMatrix", renderer.GetProjectionMatrix());

	// setup the light direction
	const glm::vec3 lightDirection = glm::normalize(glm::vec3(0.0f, 0.0f, -1.0f));
	ogl->SetUniformVec3(m_uProgram, "lightDirection", lightDirection);

	// set material uniforms to program
	m_pMaterial->SetToProgram(m_uProgram);

	// draw the sphere
	//glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
	m_pSphere->SetAttribs(m_uProgram);
	m_pSphere->Draw(renderer);
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
	const glm::mat4 projection = glm::perspective(1.51f, GetAspect(), 0.1f, 500.0f);
	GetRenderer()->SetProjectionMatrix(projection);
}


bool TheApp::OnKeyDown(uint32_t keyCode)
{
	if (keyCode == KEY_ESC)
	{
		Close();
		return true;
	}

	return false;
}

