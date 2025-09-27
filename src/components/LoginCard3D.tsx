import { useState } from 'react'
import { Text } from '@react-three/drei'
import { InputField3D } from './InputField3D'
import { Button3D } from './Button3D'

interface LoginCard3DProps {
  position: [number, number, number]
  onSwitchToSignup: () => void
}

export function LoginCard3D({ position, onSwitchToSignup }: LoginCard3DProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login attempt:', { email, password })
    // Add login logic here
  }

  return (
    <group position={position}>
      {/* Card Background */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[3.2, 4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Card Shadow */}
      <mesh position={[0.05, -0.05, -0.02]}>
        <boxGeometry args={[3.2, 4, 0.05]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.15} />
      </mesh>

      {/* Card Border */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[3.22, 4.02, 0.09]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
      </mesh>

      {/* Fabrik Logo */}
      <Text
        position={[0, 1.5, 0.06]}
        fontSize={0.25}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.0}
        textAlign="center"
      >
        fabrik
      </Text>

      {/* Terms Text - Split for clickable links */}
      <Text
        position={[0, 1.2, 0.06]}
        fontSize={0.06}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
      >
        By continuing, you agree to our{'\n'}
      </Text>
      
      <Text
        position={[-0.35, 1.14, 0.06]}
        fontSize={0.06}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        onClick={() => window.open('https://www.fabrik.space/terms-and-conditions', '_blank')}
        onPointerEnter={(e) => {
          e.object.material.color.setHex(0x4f46e5)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={(e) => {
          e.object.material.color.setHex(0x6366f1)
          document.body.style.cursor = 'default'
        }}
      >
        Terms of Service
      </Text>
      
      <Text
        position={[0, 1.14, 0.06]}
        fontSize={0.06}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
      >
        and
      </Text>
      
      <Text
        position={[0.3, 1.14, 0.06]}
        fontSize={0.06}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        onClick={() => window.open('https://www.fabrik.space/privacy-policy', '_blank')}
        onPointerEnter={(e) => {
          e.object.material.color.setHex(0x4f46e5)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={(e) => {
          e.object.material.color.setHex(0x6366f1)
          document.body.style.cursor = 'default'
        }}
      >
        Privacy Policy
      </Text>

      {/* Tab Buttons */}
      <Button3D
        position={[-0.65, 0.5, 0.06]}
        onClick={() => {}}
        variant="primary"
        width={1.1}
        testId="login-tab"
      >
        Login
      </Button3D>
      
      <Button3D
        position={[0.65, 0.5, 0.06]}
        onClick={onSwitchToSignup}
        variant="secondary"
        width={1.1}
        testId="signup-tab"
      >
        Sign Up
      </Button3D>

      {/* Login Form */}
      <InputField3D
        position={[0, -0.05, 0.06]}
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        type="email"
        testId="email-input"
        width={2.8}
        label="Email"
      />

      <InputField3D
        position={[0, -0.65, 0.06]}
        value={password}
        onChange={setPassword}
        placeholder="Password"
        type="password"
        testId="password-input"
        width={2.8}
        label="Password"
      />

      <Button3D
        position={[0, -1.35, 0.06]}
        onClick={handleLogin}
        variant="primary"
        width={2.8}
        testId="login-button"
        disabled={!email || !password}
      >
        Login
      </Button3D>
    </group>
  )
}