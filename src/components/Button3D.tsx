import { useState } from 'react'
import { Html, Text } from '@react-three/drei'

interface Button3DProps {
  position: [number, number, number]
  onClick: () => void
  children: string
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  width?: number
  testId?: string
}

export function Button3D({ 
  position, 
  onClick, 
  children, 
  disabled = false,
  variant = 'primary',
  width = 3.2,
  testId
}: Button3DProps) {
  const [hovered, setHovered] = useState(false)
  
  const bgColor = variant === 'primary' 
    ? (disabled ? "#9ca3af" : hovered ? "#4f46e5" : "#6366f1")
    : (disabled ? "#f9fafb" : hovered ? "#f3f4f6" : "#ffffff")
  
  const textColor = variant === 'primary' ? "#ffffff" : (disabled ? "#9ca3af" : "#374151")

  return (
    <group position={position}>
      {/* Button Shadow */}
      <mesh position={[0.03, -0.03, -0.01]}>
        <boxGeometry args={[width, 0.4, 0.02]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      
      {/* Button Background */}
      <mesh
        scale={hovered && !disabled ? 1.02 : 1}
        onClick={disabled ? undefined : onClick}
        onPointerEnter={() => !disabled && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[width, 0.4, 0.03]} />
        <meshStandardMaterial color={bgColor} />
      </mesh>
      
      {/* Button Border for secondary */}
      {variant === 'secondary' && (
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[width + 0.02, 0.42, 0.025]} />
          <meshStandardMaterial 
            color="#d1d5db" 
            transparent 
            opacity={0.6} 
          />
        </mesh>
      )}

      {/* Hidden HTML button for testing */}
      <Html
        position={[0, 0, 0.02]}
        transform
        occlude={false}
        style={{
          width: `${width * 80}px`,
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <button
          data-testid={testId}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: 0
          }}
        />
      </Html>

      <Text
        position={[0, 0, 0.03]}
        fontSize={0.11}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    </group>
  )
}