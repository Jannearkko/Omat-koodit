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
#include "ShadowObject.h"


TheApp::TheApp() :
	m_iShadowMapSize(2048),
	m_uShadowMap(0),
	m_uFrameBuffer(0),
	m_iOriginalFrameBuffer(-1),
	m_fLightAngle(0.0f)
{
	// seed the random number generator
	RandSeed();
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete
	if (!CreatePrograms())
	{
		return false;
	}

	if (!CreateShadowMap(m_iShadowMapSize, m_iShadowMapSize))
	{
		return false;
	}

	// setup our view and projection matrices
	const glm::mat4 view = glm::lookAt(
		glm::vec3(4.0f, 5.0f, 14.0f),
		glm::vec3(0.0f, 0.0f, 0.0f),
		glm::vec3(0.0f, 1.0f, 0.0f));

	const glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);

	// set them into the renderer
	auto renderer = GetRenderer();
	renderer->SetViewMatrix(view);
	renderer->SetProjectionMatrix(projection);
	renderer->SetLightPos(0.0f, 2.0f, 0.0f);

	// generate geometrys
	m_arrGeometries.emplace_back(std::make_shared<Geometry>());
	m_arrGeometries.emplace_back(std::make_shared<Geometry>());
	m_arrGeometries.emplace_back(std::make_shared<Geometry>());
	m_arrGeometries.emplace_back(std::make_shared<Geometry>());
	m_arrGeometries[0]->GenCube(glm::vec3(15.0f, 1.0f, 15.0f), glm::vec3(0.0f, -2.5f, 0.0f));
	m_arrGeometries[1]->GenCube(glm::vec3(5.0f, 5.0f, 0.1f), glm::vec3(0.0f, 0.0f, -4.5f));
	m_arrGeometries[2]->GenKnot(64, 64, 1.0f);
	m_arrGeometries[3]->GenSphere(glm::vec3(0.1f, 0.1f, 0.1f), glm::vec3(0.0f, 0.0f, 0.0f), 16, 16);

	// init materials
	m_arrMaterials.emplace_back(std::make_shared<Material>());
	m_arrMaterials.emplace_back(std::make_shared<Material>());
	m_arrMaterials.emplace_back(std::make_shared<Material>());
	m_arrMaterials.emplace_back(std::make_shared<Material>());
	m_arrMaterials[0]->m_cDiffuse = glm::vec4(0.3f, 1.0f, 1.0f, 1.0f);
	m_arrMaterials[0]->m_cAmbient = glm::vec4(0.0f, 0.0f, 0.0f, 1.0f);
	m_arrMaterials[0]->m_fSpecularPower = 0.0f;

	m_arrMaterials[1]->m_cDiffuse = glm::vec4(0.0f, 1.0f, 0.0f, 1.0f);
	m_arrMaterials[1]->m_cAmbient = glm::vec4(0.0f, 0.0f, 0.0f, 1.0f);
	m_arrMaterials[1]->m_fSpecularPower = 0.0f;

	m_arrMaterials[2]->m_cDiffuse = glm::vec4(1.0f, 0.0f, 0.0f, 1.0f);
	m_arrMaterials[2]->m_cAmbient = glm::vec4(0.1f, 0.1f, 0.1f, 1.0f);
	m_arrMaterials[2]->m_cSpecular = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_arrMaterials[2]->m_fSpecularPower = 45.0f;

	m_arrMaterials[3]->m_cDiffuse = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_arrMaterials[3]->m_cAmbient = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
	m_arrMaterials[3]->m_fSpecularPower = 0.0f;

	m_pSceneRoot = std::make_unique<Node>();

	// create walls
	auto floor = std::make_shared<ShadowObject>(m_arrGeometries[0], m_arrMaterials[0]);
	floor->SetPos(0.0f, 0.0f, 0.0f);
	floor->SetShadowReceiver(true);
	m_pSceneRoot->AddNode(floor);

	auto wall = std::make_shared<ShadowObject>(m_arrGeometries[1], m_arrMaterials[1]);
	wall->SetPos(0.0f, 0.0f, 0.0f);
	wall->SetShadowReceiver(true);
	wall->SetShadowCaster(true);
	m_pSceneRoot->AddNode(wall);

	// spawn a knot
	auto knot = std::make_shared<ShadowObject>(m_arrGeometries[2], m_arrMaterials[2]);
	knot->SetPos(0.0f, -1.0f, 0.0f);
	knot->SetRotationAxis({ 0.4f, 0.5f, 0.6f });
	knot->SetRotationSpeed(0.7f);
	knot->SetShadowCaster(true);
	m_pSceneRoot->AddNode(knot);

	// light position indicator
	auto sphere = std::make_shared<ShadowObject>(m_arrGeometries[3], m_arrMaterials[3]);
	sphere->SetPos(GetRenderer()->GetLightPos());
	m_pSceneRoot->AddNode(sphere);

	return true;
}


bool TheApp::CreatePrograms()
{
	auto renderer = GetOpenGLRenderer();
	GLuint vertexShader = renderer->CreateVertexShaderFromFile("shadowmapping.vs");
	GLuint fragmentShader = renderer->CreateFragmentShaderFromFile("shadowmapping.fs");
	GLuint program = renderer->CreateProgram(vertexShader, fragmentShader);
	if (!vertexShader || !fragmentShader || !program)
	{
		return false;
	}

	// store shaders and program
	m_arrShaders.push_back(vertexShader);
	m_arrShaders.push_back(fragmentShader);
	m_arrPrograms.push_back(program);

	// program for rendering the shadow only
	vertexShader = renderer->CreateVertexShaderFromFile("shadowonly.vs");
	fragmentShader = renderer->CreateFragmentShaderFromFile("shadowonly.fs");
	program = renderer->CreateProgram(vertexShader, fragmentShader);
	if (!vertexShader || !fragmentShader || !program)
	{
		return false;
	}

	// store
	m_arrShaders.push_back(vertexShader);
	m_arrShaders.push_back(fragmentShader);
	m_arrPrograms.push_back(program);
	return true;
}


bool TheApp::CreateShadowMap(int32_t width, int32_t height)
{
	// store original frame buffer handle
	glGetIntegerv(GL_FRAMEBUFFER_BINDING, &m_iOriginalFrameBuffer);

	glGenTextures(1, &m_uShadowMap);
	glActiveTexture(GL_TEXTURE0);
	glBindTexture(GL_TEXTURE_2D, m_uShadowMap);

	glTexImage2D(GL_TEXTURE_2D,
		0,
		GL_DEPTH_COMPONENT,
		width,
		height,
		0,
		GL_DEPTH_COMPONENT,
		GL_UNSIGNED_INT,
		nullptr);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	
	
	glGenFramebuffers(1, &m_uFrameBuffer);
	glBindFramebuffer(GL_FRAMEBUFFER, m_uFrameBuffer);
	glFramebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D, m_uShadowMap, 0);

	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
	m_pSceneRoot = nullptr;

	for (auto program : m_arrPrograms)
	{
		glDeleteProgram(program);
	}
	m_arrPrograms.clear();

	for (auto shader : m_arrShaders)
	{
		glDeleteShader(shader);
	}
	m_arrShaders.clear();

	if (m_uShadowMap)
	{
		glDeleteTextures(1, &m_uShadowMap);
		m_uShadowMap = 0;
	}
	if (m_uFrameBuffer)
	{
		glDeleteFramebuffers(1, &m_uFrameBuffer);
		m_uFrameBuffer = 0;
	}
}


void TheApp::OnUpdate(float frametime)
{
	if (m_pSceneRoot)
	{
		m_pSceneRoot->Update(frametime);

		constexpr float pi2 = glm::pi<float>() * 2.0f;
		m_fLightAngle += frametime;
		if (m_fLightAngle > pi2)
		{
			m_fLightAngle -= pi2;
		}

		glm::vec3 lightPos;
		lightPos.x = cosf(m_fLightAngle);
		lightPos.y = 0.9f;
		lightPos.z = sinf(m_fLightAngle) * 6.0f;

		GetRenderer()->SetLightPos(lightPos);

		m_pSceneRoot->GetNodes().at(3)->SetPos(lightPos);
	}
}


void TheApp::OnDraw(IRenderer& renderer)
{
	glDisable(GL_BLEND);

	DrawShadowPass(renderer);
	DrawNormalPass(renderer);
}


void TheApp::DrawShadowPass(IRenderer& renderer)
{
	SetShadowMapAsRenderTarget();
	glCullFace(GL_FRONT);

	GLuint program = m_arrPrograms.at(1);
	glUseProgram(program);

	if (m_pSceneRoot)
	{
		for (auto& node : m_pSceneRoot->GetNodes())
		{
			auto& object = std::static_pointer_cast<ShadowObject>(node);
			if (object->IsShadowCaster())
			{
				object->DrawShadowOnly(renderer, program);
			}
		}
	}
}


void TheApp::SetShadowMapAsRenderTarget()
{
	glBindFramebuffer(GL_FRAMEBUFFER, m_uFrameBuffer);
	glViewport(0, 0, m_iShadowMapSize, m_iShadowMapSize);

	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glColorMask(GL_FALSE, GL_FALSE, GL_FALSE, GL_FALSE);
	glPolygonOffset(1.1f, 4.0f);
	glDisable(GL_POLYGON_OFFSET_FILL);
}


void TheApp::DrawNormalPass(IRenderer& renderer)
{
	SetFramebufferAsRenderTarget();
	glCullFace(GL_BACK);

	GLuint program = m_arrPrograms.at(0);
	glUseProgram(program);

	// setup the camera position
	const glm::vec3 campos(-renderer.GetViewMatrix()[3]);
	GLint location = glGetUniformLocation(program, "cameraPosition");
	glUniform3f(location, campos.x, campos.y, campos.z);

	// setup the light position
	const glm::vec3& lightPosition(renderer.GetLightPos());
	location = glGetUniformLocation(program, "lightPosition");
	glUniform3f(location, lightPosition.x, lightPosition.y, lightPosition.z);

	// set the shadow map into program
	renderer.SetTexture(program, m_uShadowMap, 0, "shadowMap");
	SetTexturingParams();

	if (m_pSceneRoot)
	{
		m_pSceneRoot->Render(renderer, program);
	}
}


void TheApp::SetFramebufferAsRenderTarget()
{
	glBindFramebuffer(GL_FRAMEBUFFER, m_iOriginalFrameBuffer);
	glViewport(0, 0, GetWidth(), GetHeight());

	glColorMask(GL_TRUE, GL_TRUE, GL_TRUE, GL_TRUE);

	glClearColor(0.5f, 0.5f, 1.0f, 1.0f);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glPolygonOffset(0.0f, 0.0f);
	glDisable(GL_POLYGON_OFFSET_FILL);
}


void TheApp::SetTexturingParams()
{
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	//glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);

	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_BORDER);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_BORDER);
	float borderColor[] = { 1.0f, 1.0f, 1.0f, 1.0f };
	glTexParameterfv(GL_TEXTURE_2D, GL_TEXTURE_BORDER_COLOR, borderColor);  
}


void TheApp::OnScreenSizeChanged(uint32_t widthPixels, uint32_t heightPixels)
{
	glm::mat4 projection = glm::perspective(0.61f, GetAspect(), 1.0f, 500.0f);
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

