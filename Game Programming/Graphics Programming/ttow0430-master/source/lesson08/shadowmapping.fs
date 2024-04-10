uniform sampler2D shadowMap;
uniform vec3 lightPosition;
uniform vec3 cameraPosition;
uniform vec4 materialAmbient;
uniform vec4 materialDiffuse;
uniform vec4 materialSpecular;
uniform float specularPower;

uniform float shadowReceiver;

varying vec2 outUv;
varying vec3 eyespacePosition;
varying vec3 eyespaceNormal;
varying vec3 shadowTexCoords;

void main(void)
{
	float light = 1.0;
    vec3 normal = normalize(eyespaceNormal);
    vec3 surfaceToLight = normalize(lightPosition - eyespacePosition);

	if (shadowReceiver > 0.5)
	{
        float d = texture2D(shadowMap, shadowTexCoords.xy).r;
        if (shadowTexCoords.z <= 1.0 && shadowTexCoords.z - 0.000005 > d)
        {
            light = d;
        }
	}
	
    float d = dot(normal, surfaceToLight) * light;
    vec4 diffuse = materialAmbient + materialDiffuse * d;
    diffuse.a = materialDiffuse.a;
    if (specularPower > 0.9)
    {
        vec3 surfaceToCamera = normalize(cameraPosition - eyespacePosition);
        float specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-surfaceToLight, normal))),
            specularPower);
        vec4 specular = materialSpecular * specularCoefficient * light;
        gl_FragColor = diffuse + specular;
    }
    else
    {
        gl_FragColor = diffuse;
    }
}

