import { Modal, Pressable, Text, View } from 'react-native'

type ApiErrorModalProps = {
  visible: boolean
  message: string
  onClose: () => void
}

export default function ApiErrorModal({ visible, message, onClose }: ApiErrorModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-black/20">
          <Text className="text-xl font-semibold text-kambista-navy mb-3">Error</Text>
          <Text className="text-sm text-neutral-darkText mb-6">{message}</Text>
          <Pressable onPress={onClose} className="rounded-3xl bg-kambista-mint px-5 py-4 items-center">
            <Text className="text-base font-semibold text-kambista-navy">Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
