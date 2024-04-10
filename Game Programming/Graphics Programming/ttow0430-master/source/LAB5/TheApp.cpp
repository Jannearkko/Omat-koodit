/**
 * ============================================================================
 *  Name        : TheApp.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : LAB5
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
	m_arrTextures.push_back(renderer->CreateTexture("terrain.jpg"));
	m_arrTextures.push_back(renderer->CreateTexture("grass.png"));
	// setup our view and projection matrices
	m_mView = glm::lookAt(
		glm::vec3(0.0f, 3.0f, 20.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));
	m_mProjection = glm::perspective(0.7f, GetAspect(), 0.1f, 500.0f);

	// TODO: generate terrain & grass geometry
	m_pGrass = std::make_shared<Geometry>();
	m_pGrass->GenQuad(glm::vec2(4.0f, 4.0f));

	m_pTerrain = std::make_shared<Geometry>();
	m_pTerrain->GenQuad(glm::vec2(60.0f, 50.0f), glm::vec3(0.0f,2.0f,0.0f));
	// TODO: material

	m_pMaterial = std::make_shared<Material>();

	// build the scenegraph
	m_pSceneRoot = std::make_unique<Node>();
	
	// TODO: use quad as a terrain plane

	auto terrain = std::make_shared<GeometryNode>(m_pTerrain, nullptr);
	terrain->SetName("terrain");
	terrain->SetPos(0.0f, 0.0f, 0.0f);
	terrain->RotateAxisAngle(glm::vec3(-1.0f, 0.0f, 0.0f), glm::half_pi<float>());
	m_pSceneRoot->AddNode(terrain);

	auto grassContainer = std::make_shared<Node>();
	grassContainer->SetName("container");
	m_pSceneRoot->AddNode(grassContainer);

	for (int i = 0; i < 10000; ++i)
	{
		auto grass = std::make_shared<GeometryNode>(m_pGrass, nullptr);
		grass->SetName("grass");
		grass->SetPos(glm::linearRand(-50.0f, 50.0f),glm::linearRand(0.0f,0.0f),glm::linearRand(-25.0f,50.0f));
		grassContainer->AddNode(grass);
	}

	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	m_pSceneRoot = nullptr;

	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
	// update scenegraph
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);
		float swingSpeed = glm::linearRand(-0.5f,0.5f);
		float rotationAngle = glm::sin(frametime * swingSpeed);
		auto container = m_pSceneRoot->FindNode("container");
		for (auto& grass : container->GetNodes())
		{
			grass->SetRotationAxis(glm::vec3(0.0f, 0.0f, 1.0f));
			grass->SetRotationAngle(rotationAngle);
		}
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.6f, 0.6f, 1.0f, 1.0f);

	// set view and projection into the renderer
	GetRenderer()->SetViewMatrix(m_mView);
	GetRenderer()->SetProjectionMatrix(m_mProjection);

	// setup the rendering program
	glUseProgram(m_uProgram);

	// TODO: set material uniforms to program
	renderer.SetTexture(m_uProgram, m_arrTextures[0], 0, "texture01");
	renderer.SetTexture(m_uProgram, m_arrTextures[1], 1, "texture02");
	// setup the light position (above scene)
	const glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	const glm::vec3 lightpos(0.0f, 10.0f, campos.z);

	OpenGLRenderer::SetUniformVec3(m_uProgram, "lightPosition", lightpos);

	// setup the camera position uniform
	OpenGLRenderer::SetUniformVec3(m_uProgram, "cameraPosition", campos);

	m_pMaterial->SetToProgram(m_uProgram);

	// draw the scenegraph
	if (m_pSceneRoot)
	{
		auto terrain = static_cast<GeometryNode*>(m_pSceneRoot->FindNode("terrain"));
		renderer.SetTexture(m_uProgram, m_arrTextures[0], 0, "texture01");
		terrain->Render(renderer, m_uProgram);
		
		auto container = m_pSceneRoot->FindNode("container");
		renderer.SetTexture(m_uProgram, m_arrTextures[1], 0, "texture01");
		container->Render(renderer, m_uProgram);

		//m_pSceneRoot->Render(renderer, m_uProgram);
	}
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

