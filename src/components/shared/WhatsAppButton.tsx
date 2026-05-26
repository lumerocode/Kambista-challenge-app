import { Pressable, Text, View } from 'react-native'

type WhatsAppButtonProps = {
  onPress: () => void
  message?: string
}

export default function WhatsAppButton({ onPress, message = 'Contacto por WhatsApp' }: WhatsAppButtonProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-center rounded-3xl bg-[#25D366] px-5 py-4">
      <View className="mr-3 h-10 w-10 rounded-full bg-white items-center justify-center border border-kambista-mint">
        <Text className="text-base font-bold text-[#25D366]">W</Text>
      </View>
      <View>
        <Text className="text-base font-semibold text-white">{message}</Text>
        <Text className="text-xs text-white/80">Chat de ayuda</Text>
      </View>
    </Pressable>
  )
}
