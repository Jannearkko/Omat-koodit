/**
 * ============================================================================
 *  Name        : TheApp.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : LAB4
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#include "TheApp.h"


// constructor, init members
TheApp::TheApp() :
	m_uVertexShader(0),
	m_uFragmentShader(0),
	m_uProgram(0)
{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	auto renderer = GetOpenGLRenderer();
	m_uVertexShader = renderer->CreateVertexShaderFromFile("phongshader.vert");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("phongshader.frag");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram)
	{
		return false;
	}

	// TODO: load the textures
	m_arrTextures.push_back(renderer->CreateTexture("box.png"));
	m_arrTextures.push_back(renderer->CreateTexture("box_specular.png"));
	for (const auto texture : m_arrTextures)
	{
		if (texture == 0) return false;
	}

	// setup our view and projection matrices
	const glm::mat4 view = glm::lookAt(
		glm::vec3(0.0f, 0.0f, 9.5f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));

	const glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);
	GetRenderer()->SetViewMatrix(view);
	GetRenderer()->SetProjectionMatrix(projection);

	// TODO: generate box geometry
	m_pBox = std::make_shared<Geometry>();
	m_pBox->GenCube(glm::vec3(3.0f, 3.0f, 3.0f), glm::vec3(0.0f, 0.0f, 0.0f));

	// TODO: use material
	m_pMaterial = std::make_shared<Material>();

	// build the scenegraph
	m_pSceneRoot = std::make_unique<Node>();
	
	// TODO: create box object and add to scenegraph
	auto box = std::make_shared<GeometryNode>(m_pBox, nullptr);
	box->SetName("box");
	box->SetPos(0.0f, 0.0f, 0.0f);
	m_pSceneRoot->AddNode(box);

	for (auto& node : m_pSceneRoot->GetNodes())
	{
		auto gameObject = std::static_pointer_cast<GeometryNode>(node);
		gameObject->SetRotationAxis({ 1.0f,0.0f,0.0f });
		gameObject->SetRotationSpeed(0.5f);
		gameObject->SetVelocity(glm::vec3(0.0f, 0.0f, 0.0f));
		gameObject->SetMaterial(m_pMaterial);
	}

	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	m_pSceneRoot = nullptr;

	glDeleteTextures((GLsizei)m_arrTextures.size(), m_arrTextures.data());

	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	// TODO: delete loaded textures

	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
	// TODO: rotate box around a bit to see the specular effect

	// update scenegraph
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// setup the rendering program
	glUseProgram(m_uProgram);

	// TODO: set the textures to slot 0 and slot 1
	renderer.SetTexture(m_uProgram, m_arrTextures[0], 0, "texture01");
	renderer.SetTexture(m_uProgram, m_arrTextures[1], 1, "texture02");
	//SetTexturingParams();

	// TODO: set material uniforms to program
	

	// setup the light position (to camera position)
	const glm::vec3 lightPos(0.0f, 0.0f, 15.0f);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "lightPosition", lightPos);

	// setup the camera position uniform
	const glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "cameraPosition", campos);

	glDisable(GL_BLEND);

	// draw the scenegraph
	if (m_pSceneRoot)
	{
		auto box = static_cast<GeometryNode*>(m_pSceneRoot->FindNode("box"));
		box->Render(renderer, m_uProgram);

		//m_pSceneRoot->Render(renderer, m_uProgram);
	}
}
void TheApp::SetTexturingParams()
{
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
	m_mProjection = glm::perspective(0.7f, GetAspect(), 0.1f, 500.0f);
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



