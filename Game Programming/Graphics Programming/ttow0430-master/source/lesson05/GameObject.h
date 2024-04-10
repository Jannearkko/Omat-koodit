/**
 * ============================================================================
 *  Name        : GameObject.h
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : simple game object example
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#pragma once

#include "../core/include/GeometryNode.h"

class GameObject : public GeometryNode
{
public:
	GameObject(const std::shared_ptr<Geometry>& geometry, const std::shared_ptr<Material>& material);

	void Update(float frametime) override;

	void SetRandomRotationAxis();

	inline float GetGravity() const { return m_fGravity; }
	inline void SetGravity(float fGravity) { m_fGravity = fGravity; }

protected:
	float						m_fGravity;
};

