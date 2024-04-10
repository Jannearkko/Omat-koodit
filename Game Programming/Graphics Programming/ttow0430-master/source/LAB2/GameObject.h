#pragma once
#include "../core/include/GeometryNode.h"
class GameObject : public GeometryNode
{
public:
	GameObject(const std::shared_ptr<Geometry>& geometry, const std::shared_ptr<Material>& material);

	void Update(float frametime) override;

	void SetRandomRotation();

	inline float GetGravity() const { return m_fGravity; }
	inline void SetGravity(float gravity) { m_fGravity = gravity; }

protected:
	float				m_fGravity;
};

