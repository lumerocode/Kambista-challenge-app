import { Modal, Pressable, Text, View } from 'react-native'

type ConfirmExitModalProps = {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  message?: string
  confirmText?: string
  cancelText?: string
}

export default function ConfirmExitModal({
  visible,
  onConfirm,
  onCancel,
  message = '¿Estás seguro de que quieres salir?',
  confirmText = 'Aceptar',
  cancelText = 'Cancelar'
}: ConfirmExitModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-black/20">
          <Text className="text-xl font-semibold text-kambista-navy mb-3">Confirmar salida</Text>
          <Text className="text-sm text-neutral-darkText mb-6">{message}</Text>
          <View className="space-y-3">
            <Pressable onPress={onConfirm} className="w-full rounded-3xl bg-kambista-mint px-5 py-4 items-center">
              <Text className="text-base font-semibold text-kambista-navy">{confirmText}</Text>
            </Pressable>
            <Pressable onPress={onCancel} className="w-full rounded-3xl border border-neutral-grayBorder px-5 py-4 items-center">
              <Text className="text-base font-semibold text-kambista-navy">{cancelText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
