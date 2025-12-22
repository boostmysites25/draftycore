/**
 * REUSABLE COMPONENTS INDEX
 * 
 * This file serves as the central export point for all reusable components.
 * Components should be created in separate files within this directory and exported here.
 * 
 * FOLDER STRUCTURE EXAMPLE:
 * components/
 * ├── index.ts              (this file - exports all components)
 * ├── Button/
 * │   ├── Button.tsx        (component implementation)
 * │   ├── Button.types.ts   (TypeScript interfaces/types)
 * │   └── index.ts          (re-export for cleaner imports)
 * ├── Card/
 * │   ├── Card.tsx
 * │   └── index.ts
 * └── Input/
 *     ├── Input.tsx
 *     └── index.ts
 * 
 * USAGE EXAMPLE:
 * 
 * 1. Create a new component file (e.g., Button.tsx):
 * 
 *    import { ButtonHTMLAttributes } from 'react'
 * 
 *    interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 *      variant?: 'primary' | 'secondary' | 'outline'
 *      size?: 'sm' | 'md' | 'lg'
 *      isLoading?: boolean
 *    }
 * 
 *    export const Button = ({ 
 *      variant = 'primary', 
 *      size = 'md', 
 *      isLoading = false,
 *      children,
 *      className = '',
 *      ...props 
 *    }: ButtonProps) => {
 *      const baseStyles = 'rounded-lg font-semibold transition-all duration-200'
 *      const variantStyles = {
 *        primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105',
 *        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
 *        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
 *      }
 *      const sizeStyles = {
 *        sm: 'px-4 py-2 text-sm',
 *        md: 'px-6 py-3 text-base',
 *        lg: 'px-8 py-4 text-lg'
 *      }
 * 
 *      return (
 *        <button 
 *          className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
 *          disabled={isLoading}
 *          {...props}
 *        >
 *          {isLoading ? 'Loading...' : children}
 *        </button>
 *      )
 *    }
 * 
 * 2. Export the component from this file:
 * 
 *    export { Button } from './Button/Button'
 * 
 * 3. Use the component in your pages:
 * 
 *    import { Button } from '@/components'
 * 
 *    function MyPage() {
 *      return (
 *        <Button variant="primary" size="lg" onClick={() => alert('Clicked!')}>
 *          Click Me
 *        </Button>
 *      )
 *    }
 * 
 * OTHER COMPONENT EXAMPLES:
 * 
 * - Card: Container component with shadow and padding
 * - Input: Form input with label and validation
 * - Modal: Overlay dialog component
 * - Navbar: Navigation bar component
 * - Footer: Footer component
 * - Spinner: Loading spinner component
 * - Badge: Small status indicator
 * - Tooltip: Hover information component
 * 
 * BEST PRACTICES:
 * 
 * 1. Use TypeScript interfaces for props
 * 2. Provide sensible default values
 * 3. Use Tailwind CSS for styling
 * 4. Make components composable and flexible
 * 5. Add GSAP animations where appropriate
 * 6. Keep components focused on a single responsibility
 * 7. Document complex components with JSDoc comments
 * 8. Export types along with components for better DX
 */

// Export your components here
// Example: export { Button } from './Button/Button'
// Example: export { Card } from './Card/Card'
// Example: export { Input } from './Input/Input'

export { }
