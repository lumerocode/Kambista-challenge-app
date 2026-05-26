import { ReactNode } from 'react'
import { Text, View } from 'react-native'

type ExchangeCalculatorProps = {
  title: string
  children: ReactNode
}

export default function ExchangeCalculator({ title, children }: ExchangeCalculatorProps) {
  return (
    <View className="rounded-[28px] bg-white p-5 shadow-xl shadow-black/5 mb-6">
      <Text className="text-lg font-semibold text-kambista-navy mb-4">{title}</Text>
      <View className="space-y-5">{children}</View>
    </View>
  )
}
