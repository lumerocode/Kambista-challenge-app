import type { ComponentType } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useState } from 'react'
import { useAppState } from '../../context/AppStateContext'
import ConfirmExitModal from '../shared/ConfirmExitModal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconExchange from '../../assets/img/icons/icon-nav-exchange.svg'
import IconHistory from '../../assets/img/icons/icon-nav-history.svg'
import IconAccount from '../../assets/img/icons/icon-nav-account.svg'
import IconKoin from '../../assets/img/icons/icon-nav-koin.svg'
import IconProfile from '../../assets/img/icons/icon-nav-profile.svg'

type NavItem = {
  label: string
  Icon: ComponentType<any>
}

const navItems: NavItem[] = [
  { label: 'Inicio', Icon: IconExchange },
  { label: 'Historial', Icon: IconHistory },
  { label: 'Cuentas', Icon: IconAccount },
  { label: 'Koinks', Icon: IconKoin },
  { label: 'Perfil', Icon: IconProfile }
]

export default function DashboardFooter() {
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitModalVisible, setExitModalVisible] = useState(false)
  const { logout } = useAppState()

  return (
    <View className="absolute left-0 right-0 bottom-0 bg-white py-6">
      <View className="flex-row">
        {navItems.map(({ label, Icon }, index) => (
          <Pressable
            key={label}
            className="flex-1 items-center justify-center py-3"
            onPress={() => {
              setActiveIndex(index)
              if (label === 'Perfil') {
                setExitModalVisible(true)
              }
            }}
          >
            <View className="mb-1">
              <Icon width={24} height={24} />
            </View>
            <Text className={`text-xs text-neutral-darkText ${activeIndex === index ? 'font-bold text-kambista-navy' : 'font-medium'}`}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <ConfirmExitModal
        visible={exitModalVisible}
        onConfirm={() => {
          setExitModalVisible(false)
          logout()
        }}
        onCancel={() => setExitModalVisible(false)}
        message="¿Deseas salir del aplicativo?"
        confirmText="Aceptar"
        cancelText="Cancelar"
      />
    </View>
  )
}