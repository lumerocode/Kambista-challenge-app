import { Pressable, ScrollView, Text, View } from 'react-native'
import { useAppState } from '../context/AppStateContext'
import WhatsAppButton from '../components/shared/WhatsAppButton'

export default function ReceiptSentScreen() {
  const { goToRoute } = useAppState()

  return (
    <ScrollView className="flex-1 bg-kambista-appBg px-6 pt-16" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="rounded-[28px] bg-white p-6 shadow-xl shadow-black/5 space-y-6">
        <View className="flex-row items-center gap-3 bg-kambista-appBg rounded-3xl px-4 py-3">
          <View className="h-12 w-12 rounded-3xl bg-kambista-mint/20 items-center justify-center">
            <Text className="text-xl font-bold text-kambista-navy">K</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold text-kambista-navy">Kambista</Text>
            <Text className="text-xs text-neutral-grayText">Confirmación de constancia</Text>
          </View>
        </View>

        <Text className="text-3xl font-bold text-kambista-navy mb-4">¡Constancia enviada!</Text>
        <Text className="text-base text-neutral-darkText mb-4">
          Verificaremos tu operación y te notificaremos cuando esté procesada. Puedes revisar el estado en el panel.
        </Text>

        <View className="rounded-3xl bg-kambista-appBg p-4 mb-5">
          <Text className="text-sm text-neutral-grayText">Código Kambista</Text>
          <Text className="mt-2 text-lg font-semibold text-kambista-navy">km20ttfff</Text>
        </View>

        <View className="rounded-3xl bg-kambista-rewardBg p-4 mb-6">
          <Text className="text-sm font-semibold text-kambista-rewardText">Disfruta descuentos en tus próximas operaciones.</Text>
        </View>

        <WhatsAppButton onPress={() => goToRoute('dashboard')} message="Volver al panel" />

        <Pressable onPress={() => goToRoute('dashboard')} className="rounded-3xl bg-kambista-mint px-5 py-4 items-center">
          <Text className="text-base font-semibold text-kambista-navy">VOLVER AL PANEL</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
