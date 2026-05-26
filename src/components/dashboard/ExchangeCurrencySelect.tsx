import { Pressable, Text, View } from 'react-native'
import { useState } from 'react'
import type { CurrencyCode } from '../../types/exchange'
import ArrowDown from '../../assets/img/icons/icon-arrow-down-v2.svg'

type ExchangeCurrencySelectProps = {
  options: CurrencyCode[]
  selected: CurrencyCode
  onSelect: (value: CurrencyCode) => void
  compact?: boolean
  className?: string
}

export default function ExchangeCurrencySelect({
  options,
  selected,
  onSelect,
  compact = false,
  className = ''
}: ExchangeCurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const baseClasses = compact
    ? 'rounded-r-[8px] border border-neutral-grayBorder bg-neutral-white px-4 py-3'
    : 'rounded-r-[8px] border px-4 py-4'

  const activeClasses = isOpen ? 'border-kambista-mint bg-kambista-mint/10' : 'border-neutral-grayBorder bg-neutral-white'

  return (
    <View className={`relative space-y-2 ${className} h-[70px]`}>
      <Pressable
        onPress={() => setIsOpen((current) => !current)}
        className={`${baseClasses} ${activeClasses} flex-row items-center justify-between h-[70px] bg-kambista-navy`}
      >
        <Text className={`text-base font-semibold ${isOpen ? 'text-neutral-white' : 'text-neutral-white'}`}>
          {selected}
        </Text>
        <View className="items-center justify-center">
          <ArrowDown />
        </View>
      </Pressable>

      {isOpen ? (
        <View className="absolute left-0 right-0 z-50 top-[62px] h-[140px] overflow-hidden rounded-[8px] border border-neutral-grayBorder bg-kambista-navy">
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-6 h-[70px] ${selected === option ? 'bg-neutral-grayBorder' : 'bg-neutral-white'}`}
            >
              <Text className={`text-base ${selected === option ? 'text-kambista-navy' : 'text-neutral-darkText'}`}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  )
}
