/**
 * ============================================================================
 *  Name        : GameObject.cpp
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : simple game object example
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#include "GameObject.h"


GameObject::GameObject(const std::shared_ptr<Geometry>& geometry, const std::shared_ptr<Material>& material) :
	GeometryNode(geometry, material),
	m_fGravity(5.0f)
{
}


void GameObject::SetRandomRotationAxis()
{
	glm::vec3 axis;
	axis.x = glm::linearRand(-1.0f, 1.0f);
	axis.y = glm::linearRand(-1.0f, 1.0f);
	axis.z = glm::linearRand(-1.0f, 1.0f);
	m_vRotationAxis = glm::normalize(axis);
}


void GameObject::Update(float frametime)
{
	GeometryNode::Update(frametime);

	glm::vec3 pos = GetPos();

	// add gravity to velocity
	m_vVelocity.y -= frametime * m_fGravity;

	// check limits
	constexpr float limit = 10.0f;
	if (pos.y < -limit)
	{
		pos.y = -limit;
		m_vVelocity.y = -m_vVelocity.y;
	}
	if (pos.y > limit)
	{
		pos.y = limit;
		m_vVelocity.y = -m_vVelocity.y;
	}
	if (pos.x < -limit)
	{
		pos.x = -limit;
		m_vVelocity.x = -m_vVelocity.x;
	}
	if (pos.x > limit)
	{
		pos.x = limit;
		m_vVelocity.x = -m_vVelocity.x;
	}
	if (pos.z < -limit)
	{
		pos.z = -limit;
		m_vVelocity.z = -m_vVelocity.z;
	}
	if (pos.z > limit)
	{
		pos.z = limit;
		m_vVelocity.z = -m_vVelocity.z;
	}

	SetPos(pos);
}


