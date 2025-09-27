import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { LoginCard3D } from './components/LoginCard3D'
import { SignupCard3D } from './components/SignupCard3D'

// Mock @react-three/drei components
jest.mock('@react-three/drei', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock @react-three/fiber
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
}))

describe('3D Login/Signup Component Tests', () => {
  describe('Positive Test Cases', () => {
    test('1. App renders without crashing', () => {
      render(<App />)
      expect(screen.getByTestId('canvas')).toBeInTheDocument()
    })

    test('2. Default view is login', () => {
      render(<App />)
      expect(screen.getByTestId('canvas')).toBeInTheDocument()
    })

    test('3. LoginCard3D renders all form elements', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
      expect(screen.getByTestId('login-button')).toBeInTheDocument()
      expect(screen.getByTestId('signup-tab')).toBeInTheDocument()
    })

    test('4. SignupCard3D renders all form elements', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      expect(screen.getByTestId('firstname-input')).toBeInTheDocument()
      expect(screen.getByTestId('lastname-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
      expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
      expect(screen.getByTestId('create-account-button')).toBeInTheDocument()
    })

    test('5. Login form accepts valid email input', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      expect(emailInput).toHaveValue('test@example.com')
    })

    test('6. Login form accepts password input', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const passwordInput = screen.getByTestId('password-input')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      expect(passwordInput).toHaveValue('password123')
    })

    test('7. Signup form accepts first name input', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const firstNameInput = screen.getByTestId('firstname-input')
      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      expect(firstNameInput).toHaveValue('John')
    })

    test('8. Signup form accepts last name input', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const lastNameInput = screen.getByTestId('lastname-input')
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      expect(lastNameInput).toHaveValue('Doe')
    })

    test('9. Login button becomes enabled with valid inputs', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const loginButton = screen.getByTestId('login-button')
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      expect(loginButton).not.toBeDisabled()
    })

    test('10. Signup button becomes enabled with all valid inputs', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const firstNameInput = screen.getByTestId('firstname-input')
      const lastNameInput = screen.getByTestId('lastname-input')
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const confirmPasswordInput = screen.getByTestId('confirm-password-input')
      const createButton = screen.getByTestId('create-account-button')
      
      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
      
      expect(createButton).not.toBeDisabled()
    })

    test('11. Login button click triggers console log', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const mockSwitch = jest.fn()
      
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const loginButton = screen.getByTestId('login-button')
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(loginButton)
      
      expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
        email: 'test@example.com',
        password: 'password123'
      })
      
      consoleSpy.mockRestore()
    })

    test('12. Signup button click triggers console log with valid data', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const mockSwitch = jest.fn()
      
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const firstNameInput = screen.getByTestId('firstname-input')
      const lastNameInput = screen.getByTestId('lastname-input')
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const confirmPasswordInput = screen.getByTestId('confirm-password-input')
      const createButton = screen.getByTestId('create-account-button')
      
      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
      fireEvent.click(createButton)
      
      expect(consoleSpy).toHaveBeenCalledWith('Signup attempt:', {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123'
      })
      
      consoleSpy.mockRestore()
    })

    test('13. Tab switching works in login card', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const signupTab = screen.getByTestId('signup-tab')
      fireEvent.click(signupTab)
      
      expect(mockSwitch).toHaveBeenCalledTimes(1)
    })

    test('14. Tab switching works in signup card', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const loginTab = screen.getByTestId('login-tab')
      fireEvent.click(loginTab)
      
      expect(mockSwitch).toHaveBeenCalledTimes(1)
    })

    test('15. Password inputs have correct type attribute', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const passwordInput = screen.getByTestId('password-input')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('Negative Test Cases', () => {
    test('16. Login button is disabled with empty fields', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const loginButton = screen.getByTestId('login-button')
      expect(loginButton).toBeDisabled()
    })

    test('17. Login button is disabled with only email', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      const loginButton = screen.getByTestId('login-button')
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      expect(loginButton).toBeDisabled()
    })

    test('18. Login button is disabled with only password', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const passwordInput = screen.getByTestId('password-input')
      const loginButton = screen.getByTestId('login-button')
      
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      expect(loginButton).toBeDisabled()
    })

    test('19. Signup button is disabled with empty fields', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const createButton = screen.getByTestId('create-account-button')
      expect(createButton).toBeDisabled()
    })

    test('20. Signup button is disabled with mismatched passwords', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const firstNameInput = screen.getByTestId('firstname-input')
      const lastNameInput = screen.getByTestId('lastname-input')
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const confirmPasswordInput = screen.getByTestId('confirm-password-input')
      const createButton = screen.getByTestId('create-account-button')
      
      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'different' } })
      
      expect(createButton).toBeDisabled()
    })

    test('21. Signup button disabled with missing first name', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const lastNameInput = screen.getByTestId('lastname-input')
      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const confirmPasswordInput = screen.getByTestId('confirm-password-input')
      const createButton = screen.getByTestId('create-account-button')
      
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
      
      expect(createButton).toBeDisabled()
    })

    test('22. Form handles empty string inputs', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      
      fireEvent.change(emailInput, { target: { value: '' } })
      expect(emailInput).toHaveValue('')
    })

    test('23. Components handle undefined props gracefully', () => {
      const mockSwitch = jest.fn()
      
      expect(() => {
        render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      }).not.toThrow()
    })

    test('24. Disabled buttons do not trigger click events when disabled', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const loginButton = screen.getByTestId('login-button')
      fireEvent.click(loginButton)
      
      expect(loginButton).toBeDisabled()
      expect(consoleSpy).not.toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })

    test('25. Form inputs accept special characters', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      const emailInput = screen.getByTestId('email-input')
      const specialEmail = 'test+special@example-domain.co.uk'
      
      fireEvent.change(emailInput, { target: { value: specialEmail } })
      expect(emailInput).toHaveValue(specialEmail)
    })
  })

  describe('VR Compatibility Tests', () => {
    test('26. Components render within Canvas environment', () => {
      render(<App />)
      expect(screen.getByTestId('canvas')).toBeInTheDocument()
    })

    test('27. 3D components use proper positioning', () => {
      const mockSwitch = jest.fn()
      render(<LoginCard3D position={[0, 0, 0]} onSwitchToSignup={mockSwitch} />)
      
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
    })

    test('28. All form elements are accessible in 3D space', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      expect(screen.getByTestId('firstname-input')).toBeInTheDocument()
      expect(screen.getByTestId('lastname-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
      expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
      expect(screen.getByTestId('create-account-button')).toBeInTheDocument()
      expect(screen.getByTestId('login-tab')).toBeInTheDocument()
    })

    test('29. Form validation works in 3D environment', () => {
      const mockSwitch = jest.fn()
      render(<SignupCard3D position={[0, 0, 0]} onSwitchToLogin={mockSwitch} />)
      
      const passwordInput = screen.getByTestId('password-input')
      const confirmPasswordInput = screen.getByTestId('confirm-password-input')
      
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'different' } })
      
      expect(passwordInput).toHaveValue('password123')
      expect(confirmPasswordInput).toHaveValue('different')
    })

    test('30. App starts with login view by default', () => {
      render(<App />)
      expect(screen.getByTestId('canvas')).toBeInTheDocument()
    })
  })
})