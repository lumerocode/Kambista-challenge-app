import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import UserMenuDropdown from '../components/dashboard/UserMenuDropdown'
import ExchangeScreen from '../components/ExchangeScreen'
import WhatsAppButton from '../components/shared/WhatsAppButton'

export default function DashboardScreen() {
  const { startOperationFlow, logout, user } = useAppState()
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <View className="flex-1 bg-kambista-appBg">
      <DashboardHeader
        title="Panel Kambista"
        subtitle="Calcula tu operación y sigue el flujo completo."
        onLogout={logout}
        onOpenMenu={() => setMenuVisible(true)}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <DashboardSidebar />
        <View className="px-6">
          <ExchangeScreen />
        </View>
        <View className="px-6 py-4">
          <WhatsAppButton onPress={() => setMenuVisible(true)} message="Abrir ayuda rápida" />
        </View>
        <View className="px-6 pb-6">
          <View className="rounded-3xl bg-white p-5 shadow-xl shadow-black/5">
            <View className="items-center">
              <View className="rounded-3xl bg-kambista-appBg px-4 py-3">
                <View>
                  <Text className="text-sm text-neutral-grayText">Sigue el flujo</Text>
                  <Text className="mt-2 text-lg font-semibold text-kambista-navy">Presiona el botón para avanzar</Text>
                </View>
              </View>
            </View>
            <View className="mt-4">
              <Pressable onPress={startOperationFlow} className="rounded-3xl bg-kambista-mint px-5 py-4 items-center">
                <Text className="text-base font-semibold text-kambista-navy">Ver pasos de operación</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <UserMenuDropdown visible={menuVisible} userName={user?.displayName ?? 'Usuario'} onLogout={logout} onClose={() => setMenuVisible(false)} />
    </View>
  )
}
