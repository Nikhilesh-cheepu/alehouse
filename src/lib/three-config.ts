import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Stars,
  useGLTF,
  Text3D,
  Float
} from '@react-three/drei'

export {
  Canvas,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Stars,
  useGLTF,
  Text3D,
  Float
}

// Default camera settings for cinematic experience
export const defaultCameraSettings = {
  position: [0, 0, 5],
  fov: 75,
  near: 0.1,
  far: 1000
}

// Default lighting setup
export const defaultLighting = {
  ambient: { intensity: 0.3 },
  directional: { 
    position: [5, 5, 5], 
    intensity: 1,
    castShadow: true 
  }
} 