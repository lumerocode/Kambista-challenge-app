import React from 'react'
import { Pressable, Text, View } from 'react-native'

type BaseCheckboxProps = {
  label: React.ReactNode
  checked: boolean
  onPress: () => void
  error?: string
}

export default function BaseCheckbox({ label, checked, onPress, error }: BaseCheckboxProps) {
  return (
    <View className="w-full flex flex-col gap-y-2">
      <Pressable onPress={onPress} className="flex-row items-center gap-2">
        <View
          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-kambista-navy border-kambista-navy' : 'bg-neutral-white border-neutral-grayBorder'} ${error ? 'border-kambista-errorRed' : ''}`}
        >
          {checked ? <Text className="text-[10px] font-bold text-white">✓</Text> : null}
        </View>
        <Text className="flex-1 text-xs text-neutral-navy leading-snug">{label}</Text>
      </Pressable>
      {error ? <Text className="text-kambista-errorRed text-xs font-medium pl-8">{error}</Text> : null}
    </View>
  )
}
