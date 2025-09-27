import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { LoginCard3D } from './components/LoginCard3D'
import { SignupCard3D } from './components/SignupCard3D'

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login')

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Simplified Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <directionalLight position={[-2, 1, 1]} intensity={0.3} />
        
        {currentView === 'login' ? (
          <LoginCard3D
            position={[0, 0, 0]}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        ) : (
          <SignupCard3D
            position={[0, 0, 0]}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </Canvas>
    </div>
  )
}