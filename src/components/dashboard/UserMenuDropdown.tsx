import { Modal, Pressable, Text, View } from 'react-native'

type UserMenuDropdownProps = {
  visible: boolean
  userName: string
  onLogout: () => void
  onClose: () => void
}

export default function UserMenuDropdown({ visible, userName, onLogout, onClose }: UserMenuDropdownProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-black/20">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="h-12 w-12 rounded-full bg-kambista-appBg border border-neutral-grayBorder items-center justify-center">
              <Text className="text-lg font-bold text-kambista-navy">U</Text>
            </View>
            <View>
              <Text className="text-xl font-semibold text-kambista-navy">Hola, {userName}</Text>
              <Text className="text-sm text-neutral-grayText">Usuario Kambista</Text>
            </View>
          </View>

          <Pressable onPress={onLogout} className="rounded-3xl bg-kambista-mint px-5 py-4 items-center mb-3">
            <Text className="text-base font-semibold text-kambista-navy">Cerrar sesión</Text>
          </Pressable>
          <Pressable onPress={onClose} className="rounded-3xl border border-neutral-grayBorder px-5 py-4 items-center">
            <Text className="text-base font-semibold text-kambista-navy">Cerrar menú</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
