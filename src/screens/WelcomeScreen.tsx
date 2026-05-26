import { ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import BaseButton from '../components/ui/BaseButton'

export default function WelcomeScreen() {
  const { user, isAuthenticated, goToRoute, logout } = useAppState()

  return (
    <ScrollView className="flex-1 bg-kambista-appBg px-6" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 40 }}>
      <View className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/5 space-y-6">
        <View className="flex gap-3">
          <Text className="text-3xl font-bold text-kambista-navy mb-3">Bienvenido a Kambista</Text>
          <Text className="text-base text-neutral-darkText leading-7">
            Una experiencia móvil para simular cambio de divisas, completar tu perfil y gestionar operaciones con una navegación fluida.
          </Text>
        </View>

        {isAuthenticated && user ? (
          <View className="space-y-4">
            <View className="rounded-3xl bg-kambista-appBg p-4">
              <Text className="text-sm text-neutral-grayText">Sesión iniciada como</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">{user.displayName}</Text>
            </View>
            <View>
              <BaseButton
                label="Continuar"
                onPress={() => goToRoute(user.profileComplete ? 'dashboard' : 'onboarding')}
              />
            </View>
            <View>
              <BaseButton label="Cerrar sesión" onPress={logout} variant="secondary" />
            </View>
          </View>
        ) : (
          <View className="space-y-0">
            <BaseButton label="INICIAR SESIÓN" onPress={() => goToRoute('login')} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}