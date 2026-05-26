import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

type BankAccountsModalProps = {
  visible: boolean
  accounts: string[]
  selectedAccount: string
  onSelect: (account: string) => void
  onClose: () => void
}

export default function BankAccountsModal({ visible, accounts, selectedAccount, onSelect, onClose }: BankAccountsModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-black/20">
          <Text className="text-xl font-semibold text-kambista-navy mb-4">Cuentas disponibles</Text>
          <ScrollView className="space-y-3">
            {accounts.map((account) => (
              <Pressable
                key={account}
                onPress={() => onSelect(account)}
                className={`rounded-3xl border px-4 py-4 ${selectedAccount === account ? 'border-kambista-mint bg-kambista-mint/20' : 'border-neutral-grayBorder bg-kambista-appBg'}`}
              >
                <Text className={`text-base ${selectedAccount === account ? 'text-kambista-navy' : 'text-neutral-darkText'}`}>{account}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable onPress={onClose} className="mt-4 rounded-3xl bg-kambista-mint px-5 py-4 items-center">
            <Text className="text-base font-semibold text-kambista-navy">Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
