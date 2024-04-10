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
	m_fUvOffset(0.0f)
{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	auto renderer = GetOpenGLRenderer();
	m_uVertexShader = renderer->CreateVertexShaderFromFile("multitexturing.vert");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("multitexturing.frag");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram)
	{
		return false;
	}

	m_arrTextures.push_back(renderer->CreateTexture("earth.jpg"));
	m_arrTextures.push_back(renderer->CreateTexture("earth_specular.jpg"));
	m_arrTextures.push_back(renderer->CreateTexture("hex.jpg"));
	m_arrTextures.push_back(renderer->CreateTexture("clouds.jpg"));
	for (const auto texture : m_arrTextures)
	{
		if (texture == 0)
		{
			// texture did not load
			return false;
		}
	}

	// setup our view and projection matrices
	const glm::mat4 view = glm::lookAt(
		glm::vec3(0.0f, 0.0f, 9.5f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));

	const glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);

	// set them into the renderer
	GetRenderer()->SetViewMatrix(view);
	GetRenderer()->SetProjectionMatrix(projection);

	// generate sphere geometry
	m_pSphere = std::make_shared<Geometry>();
	m_pSphere->GenSphere(glm::vec3(2.0f, 2.0f, 2.0f), glm::vec3(0.0f, 0.0f, 0.0f), 24, 24);

	// generate cube geometry
	m_pCube = std::make_shared<Geometry>();
	m_pCube->GenCube(glm::vec3(3.0f, 3.0f, 3.0f), glm::vec3(0.0f, 0.0f, 0.0f));

	// default material
	m_pMaterial = std::make_shared<Material>();

	// build scenegraph
	m_pSceneRoot = std::make_unique<Node>();

	// spawn a cube
	auto cube = std::make_shared<GeometryNode>(m_pCube, nullptr);
	cube->SetName("cube");
	cube->SetPos(-2.5f, 0.0f, 0.0f);
	m_pSceneRoot->AddNode(cube);

	// spawn a sphere
	auto sphere = std::make_shared<GeometryNode>(m_pSphere, nullptr);
	sphere->SetName("sphere");
	sphere->SetPos(2.5f, 0.0f, 0.0f);
	m_pSceneRoot->AddNode(sphere);

	// set some parameters to all objects in scene
	for (auto& node : m_pSceneRoot->GetNodes())
	{
		auto gameObject = std::static_pointer_cast<GeometryNode>(node);
		gameObject->SetRotationSpeed(glm::linearRand(-1.0f, 1.0f));
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
	m_arrTextures.clear();

	glDeleteProgram(m_uProgram);
	glDeleteShader(m_uFragmentShader);
	glDeleteShader(m_uVertexShader);

	m_uVertexShader = 0;
	m_uFragmentShader = 0;
	m_uProgram = 0;
}


void TheApp::OnUpdate(float frametime)
{
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);
	}

	// animate the uv offset
	m_fUvOffset += 0.1f * frametime;
	if (m_fUvOffset > 1.0f)
	{
		m_fUvOffset -= 1.0f;
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// activate our program
	glUseProgram(m_uProgram);

	// set the uniform for second set of texture coordinates
	OpenGLRenderer::SetUniformFloat(m_uProgram, "uvOffset", m_fUvOffset);

	// setup the light position
	const glm::vec3 lightPos(0.0f, 0.0f, 15.0f);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "lightPosition", lightPos);

	// setup the camera position
	const glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "cameraPosition", campos);

	// disable OpenGL blending as multitexturing will handle the transparency effects
	glDisable(GL_BLEND);

	if (m_pSceneRoot)
	{
		auto cube = static_cast<GeometryNode*>(m_pSceneRoot->FindNode("cube"));
		auto sphere = static_cast<GeometryNode*>(m_pSceneRoot->FindNode("sphere"));

		// setup the diffuse texture
		renderer.SetTexture(m_uProgram, m_arrTextures[0], 0, "texture01");
		SetTexturingParams();

		// setup the specular map
		renderer.SetTexture(m_uProgram, m_arrTextures[1], 1, "texture02");
		SetTexturingParams();

		// setup the diffuse effect texture for the cube
		renderer.SetTexture(m_uProgram, m_arrTextures[2], 2, "texture03");
		SetTexturingParams();

		// draw the cube
		cube->Render(renderer, m_uProgram);

		// setup the diffuse effect texture for the sphere
		renderer.SetTexture(m_uProgram, m_arrTextures[3], 2, "texture03");
		SetTexturingParams();

		// draw the sphere
		sphere->Render(renderer, m_uProgram);
	}
}


void TheApp::SetTexturingParams()
{
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
	const glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);
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

