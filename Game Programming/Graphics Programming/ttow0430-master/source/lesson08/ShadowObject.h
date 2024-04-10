/**
 * ============================================================================
 *  Name        : ShadowObject.h
 *  Part of     : Simple OpenGL graphics engine framework
 *  Description : simple game object example
 *  Version     : 1.00
 *	Author		: Jani Immonen, <realdashdev@gmail.com>
 * ============================================================================
**/

#pragma once

#include "../core/include/Geometry.h"
#include "../core/include/Material.h"
#include "../core/include/GeometryNode.h"


class ShadowObject : public GeometryNode
{
public:
	ShadowObject(const std::shared_ptr<Geometry>& geometry, const std::shared_ptr<Material>& material);

	void Render(IRenderer& renderer, GLuint program) override;

	virtual void DrawShadowOnly(IRenderer& renderer, GLuint program);

	inline bool IsShadowCaster() const { return m_bShadowCaster; }
	inline bool IsShadowReceiver() const { return m_bShadowReceiver; }
	inline void SetShadowCaster(bool set) { m_bShadowCaster = set; }
	inline void SetShadowReceiver(bool set) { m_bShadowReceiver = set; }

protected:
	glm::mat4 GetDepthMatrix(const glm::vec3& lightPosition) const;

	bool						m_bShadowCaster;
	bool						m_bShadowReceiver;
};

