import { ReactNode } from 'react'
import { View } from 'react-native'

type ExchangeCalculatorProps = {
  children: ReactNode
}

export default function ExchangeCalculator({ children }: ExchangeCalculatorProps) {
  return (
    <View className="rounded-[10px] px-4">
      <View>{children}</View>
    </View>
  )
}
