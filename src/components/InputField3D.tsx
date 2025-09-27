import { useState } from 'react'
import { Html, Text } from '@react-three/drei'

interface InputField3DProps {
  position: [number, number, number]
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
  error?: string
  width?: number
  testId?: string
  label?: string
}

export function InputField3D({ 
  position, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  error,
  width = 3.2,
  testId,
  label
}: InputField3DProps) {
  const [focused, setFocused] = useState(false)
  
  return (
    <group position={position}>
      {/* Field Label */}
      {label && (
        <Text
          position={[-(width/2) - 0.05, 0.25, 0.02]}
          fontSize={0.08}
          color="#374151"
          anchorX="left"
          anchorY="middle"
          fontWeight="bold"
        >
          {label}
        </Text>
      )}
      
      {/* Input Background */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width, 0.4, 0.02]} />
        <meshStandardMaterial 
          color={error ? "#fef2f2" : focused ? "#ffffff" : "#f9fafb"} 
        />
      </mesh>
      
      {/* Input Border */}
      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[width + 0.02, 0.42, 0.015]} />
        <meshStandardMaterial 
          color={error ? "#ef4444" : focused ? "#6366f1" : "#d1d5db"} 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Error text */}
      {error && (
        <Text
          position={[0, -0.3, 0.02]}
          fontSize={0.07}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
          maxWidth={width - 0.2}
          textAlign="center"
        >
          {error}
        </Text>
      )}

      {/* HTML Input Overlay */}
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
        <input
          data-testid={testId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: '88%',
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '9px',
            textAlign: 'center',
            color: '#374151',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '0 8px'
          }}
        />
      </Html>
    </group>
  )
}