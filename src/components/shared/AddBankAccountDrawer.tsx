import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

type AddBankAccountDrawerProps = {
  visible: boolean
  accounts: string[]
  onSelect: (account: string) => void
  onClose: () => void
}

export default function AddBankAccountDrawer({ visible, accounts, onSelect, onClose }: AddBankAccountDrawerProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-3xl bg-white p-6">
          <Text className="text-xl font-semibold text-kambista-navy mb-4">Seleccionar banco</Text>
          <ScrollView className="max-h-80 space-y-3">
            {accounts.map((account) => (
              <Pressable
                key={account}
                onPress={() => onSelect(account)}
                className="rounded-3xl border border-neutral-grayBorder bg-kambista-appBg px-4 py-4"
              >
                <Text className="text-base text-kambista-navy">{account}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable onPress={onClose} className="mt-4 rounded-3xl border border-neutral-grayBorder px-5 py-4 items-center">
            <Text className="text-base font-semibold text-kambista-navy">Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
