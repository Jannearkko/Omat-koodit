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
TheApp::TheApp()
{
}


bool TheApp::OnCreate()
{
	// OnCreate is called by the application when window and graphics initialization is complete

	// return false to quit the app
	return true;
}


void TheApp::OnDestroy()
{
	// app is about to close, clear all resources
}


void TheApp::OnUpdate(float frametime)
{
	// the main loop
}


void TheApp::OnDraw(IRenderer& renderer)
{
	// clear color, depth and stencil buffers
	renderer.Clear(0.2f, 0.2f, 0.2f, 1.0f);
}


bool TheApp::OnMouseBegin(int32_t buttonIndex, const glm::vec2& point)
{
	//Debug("OnMouseBegin " + std::to_string(iButtonIndex) + ": " + std::to_string((int)vPoint.x) + "x" + std::to_string((int)vPoint.y) + "\r\n");
	return true;
}


bool TheApp::OnMouseDrag(int32_t buttonIndex, const glm::vec2& point)
{
	//Debug("OnMouseDrag " + std::to_string(iButtonIndex) + ": " + std::to_string((int)vPoint.x) + "x" + std::to_string((int)vPoint.y) + "\r\n");
	return true;
}


bool TheApp::OnMouseEnd(int32_t buttonIndex, const glm::vec2& point)
{
	//Debug("OnMouseEnd " + std::to_string(iButtonIndex) + ": " + std::to_string((int)vPoint.x) + "x" + std::to_string((int)vPoint.y) + "\r\n");
	return true;
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

