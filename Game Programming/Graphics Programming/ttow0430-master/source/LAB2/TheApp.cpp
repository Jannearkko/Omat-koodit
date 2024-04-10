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
#include "GameObject.h"

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
	m_uVertexShader = renderer->CreateVertexShaderFromFile("phongshader.vs");
	m_uFragmentShader = renderer->CreateFragmentShaderFromFile("phongshader.fs");
	m_uProgram = renderer->CreateProgram(m_uVertexShader, m_uFragmentShader);
	m_uTexture = renderer->CreateTexture("tank.png");
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram || !m_uTexture)
	{
		return false;
	}

	// setup our view and projection matrices
	m_mView = glm::lookAt(
		glm::vec3(0.0f, 7.0f, 25.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));
	m_mProjection = glm::perspective(0.7f, GetAspect(), 0.1f, 500.0f);

	// generate material
	m_pMaterial = std::make_shared<Material>();

	// build the scenegraph
	m_pSceneRoot = std::make_unique<Node>();


	// TODO: build a tank
	m_pCubeBottom = std::make_shared<Geometry>();
	m_pCubeTop = std::make_shared<Geometry>();
	m_pCubePipe = std::make_shared<Geometry>();

	m_pCubeBottom->GenCube(glm::vec3(5.0f, 2.0f, 3.0f));
	m_pCubeTop->GenCube(glm::vec3(3.0f, 1.0f, 2.0f));
	m_pCubePipe->GenCube(glm::vec3(4.0f, 0.5f, 0.5f),
		glm::vec3(2.0f,0.0f,0.0f));


	auto tankBase = std::make_shared<GameObject>(m_pCubeBottom, m_pMaterial);
	auto tankTurret = std::make_shared<GameObject>(m_pCubeTop, m_pMaterial);
	auto tankBarrel = std::make_shared<GameObject>(m_pCubePipe, m_pMaterial);

	tankTurret->SetPos(glm::vec3(0.0f, 1.5f, 0.0f));
	tankBarrel->SetPos(glm::vec3(1.0f, 0.0f, 0.0f));

	tankBase->SetName("tankBase");
	tankTurret->SetName("tankTurret");
	tankBarrel->SetName("tankBarrel");

	auto baseRotationAxis = glm::vec3(0.0f, -1.0f, 0.0f);
	tankBase->SetRotationAxis(baseRotationAxis);

	auto turretRotationAxis = glm::vec3(0.0f, -1.0f, 0.0f);
	tankTurret->SetRotationAxis(turretRotationAxis);

	auto barrelRotationAxis = glm::vec3(0.0f, 0.0f, -1.0f);
	tankBarrel->SetRotationAxis(barrelRotationAxis);

	tankTurret->AddNode(tankBarrel);
	tankBase->AddNode(tankTurret);
	m_pSceneRoot->AddNode(tankBase);


	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	m_pSceneRoot = nullptr;

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

	// update scenegraph
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);

		/*
		Set NodeObject variables
		*/
		auto nodeBase = m_pSceneRoot->FindNode("tankBase");
		auto nodeTurret = m_pSceneRoot->FindNode("tankTurret");
		auto nodeBarrel = m_pSceneRoot->FindNode("tankBarrel");

		if (IsKeyDown(KEY_UP))
		{
			glm::vec3 pos = nodeBase->GetPos();
			float angle = nodeBase->GetRotationAngle();
			glm::vec3 movement(2.0f, 0.0f, 0.0f);
			glm::mat4 rotationMatrix = glm::rotate(glm::mat4(1.0f), angle, nodeBase->GetRotationAxis());
			nodeBase->SetVelocity(glm::vec3(rotationMatrix * glm::vec4(movement, 1.0)));
		}
		else if (IsKeyDown(KEY_DOWN))
		{
			glm::vec3 pos = nodeBase->GetPos();
			float angle = nodeBase->GetRotationAngle();
			glm::vec3 movement(-2.0f, 0.0f, 0.0f);
			glm::mat4 rotationMatrix = glm::rotate(glm::mat4(1.0f), angle, nodeBase->GetRotationAxis());
			nodeBase->SetVelocity(glm::vec3(rotationMatrix * glm::vec4(movement, 1.0)));
		}
		else
		{
			nodeBase->SetVelocity(glm::vec3(0.0f));
		}
		if (IsKeyDown(KEY_LEFT))
		{
			float angle = nodeBase->GetRotationAngle();
			angle -= 0.01f;
			nodeBase->SetRotationAngle(angle);
		}
		else if (IsKeyDown(KEY_RIGHT))
		{
			float angle = nodeBase->GetRotationAngle();
			angle += 0.01f;
			nodeBase->SetRotationAngle(angle);
		}
		if (IsKeyDown('W'))
		{
			float angle = nodeBarrel->GetRotationAngle();
			if (angle > -0.4f)
			{
				angle -= 0.005f;
			}
			nodeBarrel->SetRotationAngle(angle);
		}
		else if (IsKeyDown('S'))
		{
			float angle = nodeBarrel->GetRotationAngle();
			if (angle < 0.07f)
			{
				angle += 0.005f;
			}
			nodeBarrel->SetRotationAngle(angle);
		}
		if (IsKeyDown('A'))
		{
			float angle = nodeTurret->GetRotationAngle();
			angle -= 0.01f;
			nodeTurret->SetRotationAngle(angle);
		}
		else if (IsKeyDown('D'))
		{
			float angle = nodeTurret->GetRotationAngle();
			angle += 0.01f;
			nodeTurret->SetRotationAngle(angle);
		}

	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// set view and projection into the renderer
	GetRenderer()->SetViewMatrix(m_mView);
	GetRenderer()->SetProjectionMatrix(m_mProjection);

	// setup the rendering of our quad
	glUseProgram(m_uProgram);

	// set the texture for the quad (slot 0)
	renderer.SetTexture(m_uProgram, m_uTexture, 0, "texture01");

	// set light position
	const glm::vec3 lightPosition(-1.0f, 4.0f, 15.0f);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "lightPosition", lightPosition);

	//set camera position
	const glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	OpenGLRenderer::SetUniformVec3(m_uProgram, "cameraPosition", campos);

	// draw the scenegraph
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Render(renderer, m_uProgram);
		//m_pGeometry->Draw(renderer);
	}
}

void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
	m_mProjection = glm::perspective(0.7f, GetAspect(), 0.1f, 500.0f);
}
bool TheApp::OnKeyDown(uint32_t keyCode)
{
	switch (keyCode)
	{
	case KEY_ESC:
		Close();
		return true;
	default:
		// Handle other key presses here, if needed
		break;
	}
	return false;
}



