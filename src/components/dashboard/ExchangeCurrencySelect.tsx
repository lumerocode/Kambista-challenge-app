import { Pressable, Text, View } from 'react-native'

type ExchangeCurrencySelectProps = {
  options: string[]
  selected: string
  onSelect: (value: string) => void
  title: string
}

export default function ExchangeCurrencySelect({ options, selected, onSelect, title }: ExchangeCurrencySelectProps) {
  return (
    <View className="space-y-3">
      <Text className="text-sm text-neutral-grayText">{title}</Text>
      <View className="flex-row flex-wrap gap-3">
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            className={`rounded-3xl px-4 py-3 border ${selected === option ? 'border-kambista-mint bg-kambista-mint/20' : 'border-neutral-grayBorder bg-kambista-appBg'}`}
          >
            <Text className={`text-base ${selected === option ? 'text-kambista-navy' : 'text-neutral-darkText'}`}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
