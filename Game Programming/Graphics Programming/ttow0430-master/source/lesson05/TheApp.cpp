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
	m_uTexture = renderer->CreateTexture("earth.jpg");
	if (!m_uVertexShader || !m_uFragmentShader || !m_uProgram || !m_uTexture)
	{
		return false;
	}

	// setup our view and projection matrices
	const glm::mat4 view = glm::lookAt(
		glm::vec3(0.0f, 0.0f, 32.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));

	const glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);

	// set them into the renderer
	GetRenderer()->SetViewMatrix(view);
	GetRenderer()->SetProjectionMatrix(projection);

	// set the material
	m_pMaterial = std::make_shared<Material>();
	m_pMaterial->m_cAmbient = glm::vec4(0.1f, 0.1f, 0.1f, 1.0f);
	m_pMaterial->m_cDiffuse = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_pMaterial->m_cSpecular = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_pMaterial->m_cEmissive = glm::vec4(0.0f, 0.0f, 0.0f, 1.0f);
	m_pMaterial->m_fSpecularPower = 25.0f;

	// generate sphere geometry
	constexpr float radius = 2.0f;
	m_pSphere = std::make_shared<Geometry>();
	m_pSphere->GenSphere(
		glm::vec3(radius),
		glm::vec3(0.0f),
		24,
		24);

	// build scenegraph
	m_pSceneRoot = std::make_unique<Node>();

	for (size_t i = 0; i < 25; ++i)
	{
		auto object = std::make_shared<GameObject>(m_pSphere, m_pMaterial);
		object->SetRadius(radius);
		object->SetPos(glm::vec3(glm::linearRand(-10.0f, 10.0f),
			glm::linearRand(-10.0f, 10.0f),
			glm::linearRand(-10.0f, 10.0f)));

		object->SetRandomRotationAxis();
		object->SetRotationAngle(glm::linearRand(0.0f, 6.0f));
		object->SetRotationSpeed(glm::linearRand(-10.0f, 10.0f));
		object->SetVelocity(glm::vec3(
			glm::linearRand(-10.0f, 10.0f),
			glm::linearRand(0.0f, 10.0f),
			glm::linearRand(-10.0f, 10.0f)));

		object->SetGravity(5.0f);

		m_pSceneRoot->AddNode(object);
	}

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
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);
		CheckSphereToSphereCollisions();
	}
}


void TheApp::CheckSphereToSphereCollisions()
{
	const auto& nodes = m_pSceneRoot->GetNodes();

	for (auto& object1 : nodes)
	{
		for (auto& object2 : nodes)
		{
			if (object1 != object2)
			{
				// calculate vector from object1 to object2
				glm::vec3 pos1 = object1->GetPos();
				glm::vec3 pos2 = object2->GetPos();
				glm::vec3 d(pos2 - pos1);

				const float len = glm::length(d);
				const float r = object1->GetRadius() + object2->GetRadius();
				if (len < r)
				{
					// objects intersect

					// calculate how much objects intersect
					const float inside = (r - len) * 1.001f;

					// normalize the d to use it as direction to move away from intersection
					d = glm::normalize(d);

					// move object positions away from intersection by half of the
					// intersection distance
					pos1 += d * -inside * 0.5f;
					pos2 += d * inside * 0.5f;

					object1->SetPos(pos1);
					object2->SetPos(pos2);


					// rest of the collision response from gamasutra article:
					// http://www.gamasutra.com/view/feature/131424/pool_hall_lessons_fast_accurate.php

					constexpr float mass1 = 1.0f;
					constexpr float mass2 = 1.0f;

					// Find the length of the component of each of the movement
					// vectors along n. 
					glm::vec3 v1 = object1->GetVelocity();
					glm::vec3 v2 = object2->GetVelocity();
					float a1 = glm::dot(v1, d);
					float a2 = glm::dot(v2, d);

					// Using the optimized version, 
					// optimizedP =  2(a1 - a2)
					//              -----------
					//                m1 + m2
					float optimizedP = (2.0f * (a1 - a2)) / (mass1 + mass2);

					// Calculate v1', the new movement vector of circle1
					v1 = v1 - optimizedP * mass2 * d;

					// Calculate v2', the new movement vector of circle2
					v2 = v2 + optimizedP * mass1 * d;

					object1->SetVelocity(v1);
					object2->SetVelocity(v2);

					object1->SetRotationSpeed(glm::linearRand(-10.0f, 10.0f));
					object2->SetRotationSpeed(glm::linearRand(-10.0f, 10.0f));
				}
			}
		}
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);

	// render the sphere
	glUseProgram(m_uProgram);

	// setup the texture for rendering
	renderer.SetTexture(m_uProgram, m_uTexture, 0, "texture01");

	// setup the light position
	glm::vec3 lightPos(0.0f, 0.0f, 15.0f);
	GLint location = glGetUniformLocation(m_uProgram, "lightPosition");
	glUniform3f(location, lightPos.x, lightPos.y, lightPos.z);

	// setup the camera position
	glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	location = glGetUniformLocation(m_uProgram, "cameraPosition");
	glUniform3f(location, campos.x, campos.y, campos.z);

	if (m_pSceneRoot)
	{
		m_pSceneRoot->Render(renderer, m_uProgram);
	}
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

