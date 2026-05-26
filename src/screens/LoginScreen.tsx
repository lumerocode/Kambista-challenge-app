import { useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import { normalizeLoginCredentials, validateEmail, validatePassword } from '../utils/authValidation'
import BaseButton from '../components/ui/BaseButton'
import BaseInput from '../components/ui/BaseInput'
import ApiErrorModal from '../components/shared/ApiErrorModal'
import LogoMain from '../assets/img/brand/logo-main.svg'

export default function LoginScreen() {
  const { login, loginError, goToRoute } = useAppState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showApiError, setShowApiError] = useState(false)

  const emailError = useMemo(() => (submitted ? validateEmail(email) : ''), [email, submitted])
  const passwordError = useMemo(() => (submitted ? validatePassword(password) : ''), [password, submitted])
  const isDisabled = isLoading || Boolean(emailError) || Boolean(passwordError) || !email || !password

  useEffect(() => {
    if (loginError) {
      setShowApiError(true)
    }
  }, [loginError])

  const handleLogin = async () => {
    setSubmitted(true)

    if (validateEmail(email) || validatePassword(password)) {
      return
    }

    setIsLoading(true)
    const startTime = Date.now()
    let success = false

    try {
      const credentials = normalizeLoginCredentials(email, password)
      success = await login(credentials.email, credentials.password, false)
    } finally {
      const elapsed = Date.now() - startTime
      if (elapsed < 800) {
        await new Promise((resolve) => setTimeout(resolve, 800 - elapsed))
      }
      setIsLoading(false)
      if (success) {
        goToRoute('onboarding')
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-kambista-appBg">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="w-full flex flex-col">
          <View className="flex justify-center items-center mb-[44px]">
            <LogoMain width={136} />
          </View>

          <Text className="font-sans font-normal text-2xl text-black text-center">Inicia sesión</Text>

          <View className="flex flex-col gap-5 mt-[70px]">
            <View>
              <BaseInput
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                placeholder="Escribe tu correo"
                keyboardType="email-address"
                error={emailError}
              />
            </View>

            <View className="flex flex-col gap-5">
              <BaseInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                placeholder="Escribe tu contraseña"
                secureTextEntry
                error={passwordError}
              />

              <View className="flex items-center mt-1">
                <Pressable onPress={() => {}}>
                  <Text className="font-sans font-medium text-xs text-neutral-darkText underline">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View className="mt-[72px]">
            <BaseButton
              label="INICIA SESIÓN"
              onPress={handleLogin}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>

          <View className="flex-row justify-center items-center gap-1.5 mt-6">
            <Text className="font-sans text-sm text-neutral-darkText">¿No tienes cuenta?</Text>
            <Pressable onPress={() => {}}>
              <Text className="font-sans text-sm text-neutral-darkText underline">Regístrate aquí</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <ApiErrorModal
        visible={showApiError && Boolean(loginError)}
        message={loginError ?? 'Ocurrió un error al iniciar sesión.'}
        onClose={() => setShowApiError(false)}
      />
    </KeyboardAvoidingView>
  )
}
