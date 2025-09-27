import { useState } from 'react'
import { Text } from '@react-three/drei'
import { InputField3D } from './InputField3D'
import { Button3D } from './Button3D'

interface SignupCard3DProps {
  position: [number, number, number]
  onSwitchToLogin: () => void
}

export function SignupCard3D({ position, onSwitchToLogin }: SignupCard3DProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match')
      return
    }
    console.log('Signup attempt:', { firstName, lastName, email, password })
    // Add signup logic here
  }

  const isFormValid = firstName && lastName && email && password && confirmPassword && password === confirmPassword

  return (
    <group position={position}>
      {/* Card Background */}
      <mesh position={[0, -0.3, -0.01]}>
        <boxGeometry args={[3.2, 5.8, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Card Shadow */}
      <mesh position={[0.05, -0.35, -0.02]}>
        <boxGeometry args={[3.2, 5.8, 0.05]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.15} />
      </mesh>

      {/* Card Border */}
      <mesh position={[0, -0.3, -0.005]}>
        <boxGeometry args={[3.22, 5.82, 0.09]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.8} />
      </mesh>

      {/* Fabrik Logo */}
      <Text
        position={[0, 2.0, 0.06]}
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
        position={[0, 1.72, 0.06]}
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
        position={[-0.35, 1.66, 0.06]}
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
        position={[0, 1.66, 0.06]}
        fontSize={0.06}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
      >
        and
      </Text>
      
      <Text
        position={[0.3, 1.66, 0.06]}
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
        position={[-0.65, 1.3, 0.06]}
        onClick={onSwitchToLogin}
        variant="secondary"
        width={1.1}
        testId="login-tab"
      >
        Login
      </Button3D>
      
      <Button3D
        position={[0.65, 1.3, 0.06]}
        onClick={() => {}}
        variant="primary"
        width={1.1}
        testId="signup-tab"
      >
        Sign Up
      </Button3D>

      {/* Name Fields Row */}
      <InputField3D
        position={[-0.7, 0.75, 0.06]}
        value={firstName}
        onChange={setFirstName}
        placeholder="First name"
        testId="firstname-input"
        width={1.2}
        label="First Name"
      />

      <InputField3D
        position={[0.7, 0.75, 0.06]}
        value={lastName}
        onChange={setLastName}
        placeholder="Last name"
        testId="lastname-input"
        width={1.2}
        label="Last Name"
      />

      {/* Email Field */}
      <InputField3D
        position={[0, 0.1, 0.06]}
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        type="email"
        testId="email-input"
        width={2.8}
        label="Email"
      />

      {/* Password Field */}
      <InputField3D
        position={[0, -0.4, 0.06]}
        value={password}
        onChange={setPassword}
        placeholder="Password"
        type="password"
        testId="password-input"
        width={2.8}
        label="Password"
      />

      {/* Confirm Password Field */}
      <InputField3D
        position={[0, -0.9, 0.06]}
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        testId="confirm-password-input"
        width={2.8}
        label="Confirm Password"
        error={confirmPassword && password !== confirmPassword ? "Passwords do not match" : undefined}
      />

      {/* Create Account Button */}
      <Button3D
        position={[0, -1.45, 0.06]}
        onClick={handleSignup}
        variant="primary"
        width={2.8}
        testId="create-account-button"
        disabled={!isFormValid}
      >
        Create Account
      </Button3D>
    </group>
  )
}