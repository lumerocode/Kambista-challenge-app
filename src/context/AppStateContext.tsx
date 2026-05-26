import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { extractFirstName } from '../utils/profileValidation'

export type AppRoute =
  | 'welcome'
  | 'login'
  | 'onboarding'
  | 'profileCreated'
  | 'dashboard'
  | 'operationFlow'
  | 'receiptSent'

interface AppUser {
  email: string
  displayName: string
  profileComplete: boolean
}

interface AppStateContextValue {
  route: AppRoute
  user: AppUser | null
  isAuthenticated: boolean
  loginError: string | null
  login: (email: string, password: string, navigate?: boolean) => Promise<boolean>
  logout: () => void
  completeProfile: (fullName: string) => void
  goToRoute: (route: AppRoute) => void
  startOperationFlow: () => void
  finishReceiptFlow: () => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

const DEMO_CREDENTIALS = {
  email: 'usuario@kambista.com',
  password: 'Password1'
} as const

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<AppRoute>('welcome')
  const [user, setUser] = useState<AppUser | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  const login = async (email: string, password: string, navigate = true) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (normalizedEmail === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setLoginError(null)
      setUser({
        email: normalizedEmail,
        displayName: 'Usuario',
        profileComplete: false
      })
      if (navigate) {
        setRoute('onboarding')
      }
      return true
    }

    setLoginError('El correo o la contraseña no son correctos.')
    return false
  }

  const logout = () => {
    setUser(null)
    setLoginError(null)
    setRoute('welcome')
  }

  const completeProfile = (fullName: string) => {
    const nextDisplayName = extractFirstName(fullName)
    setUser((current) =>
      current
        ? { ...current, displayName: nextDisplayName, profileComplete: true }
        : {
            email: DEMO_CREDENTIALS.email,
            displayName: nextDisplayName,
            profileComplete: true
          }
    )
    setRoute('profileCreated')
  }

  const goToRoute = (nextRoute: AppRoute) => {
    setRoute(nextRoute)
  }

  const startOperationFlow = () => {
    setRoute('operationFlow')
  }

  const finishReceiptFlow = () => {
    setRoute('receiptSent')
  }

  const value: AppStateContextValue = {
    route,
    user,
    isAuthenticated,
    loginError,
    login,
    logout,
    completeProfile,
    goToRoute,
    startOperationFlow,
    finishReceiptFlow
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}
