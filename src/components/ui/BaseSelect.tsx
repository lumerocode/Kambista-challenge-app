import { ActionSheetIOS, Pressable, Text, View, Platform } from 'react-native'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import ArrowDown from '../../assets/img/icons/icon-arrow-down.svg'

type SelectOption = {
  label: string
  value: string
}

type BaseSelectProps = {
  label: string
  options: SelectOption[]
  selectedValue: string
  placeholder?: string
  onValueChange: (value: string) => void
  error?: string
}

export default function BaseSelect({
  label,
  options,
  selectedValue,
  placeholder,
  onValueChange,
  error
}: BaseSelectProps) {
  const [open, setOpen] = useState(false)
  const selectedLabel = options.find((option) => option.value === selectedValue)?.label ?? ''
  const isAndroid = Platform.OS === 'android'
  const isIos = Platform.OS === 'ios'

  const showIosOptions = () => {
    const optionLabels = options.map((option) => option.label)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...optionLabels, 'Cancelar'],
        cancelButtonIndex: optionLabels.length,
        title: placeholder ?? 'Seleccionar',
      },
      (buttonIndex) => {
        if (buttonIndex >= 0 && buttonIndex < optionLabels.length) {
          onValueChange(options[buttonIndex].value)
        }
      }
    )
  }

  return (
    <View className="w-full flex flex-col gap-1.5">
      {label ? <Text className="font-sans font-medium text-sm text-neutral-darkText tracking-wider">{label}</Text> : null}

      {isAndroid ? (
        <View className={`relative w-full h-[44px] rounded-[10px] border bg-neutral-white py-3 pl-4 pr-10 ${error ? 'border-kambista-errorRed' : 'border-neutral-grayBorder'}`}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            mode="dropdown"
            style={{
              height: 44,
              width: '100%',
              color: selectedValue ? '#060F26' : '#A7A7A7'
            }}
          >
            <Picker.Item label={placeholder ?? 'Seleccionar'} value="" enabled={false} />
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
          <View pointerEvents="none" className="absolute right-3 top-3">
            <ArrowDown />
          </View>
        </View>
      ) : isIos ? (
        <View className="relative w-full">
          <Pressable
            onPress={showIosOptions}
            className={`w-full h-[44px] rounded-[10px] border bg-neutral-white py-3 pl-4 pr-10 justify-center ${error ? 'border-kambista-errorRed' : 'border-neutral-grayBorder'}`}
          >
            <Text className={`${selectedValue ? 'text-kambista-navy' : 'text-neutral-grayPlaceholder'} text-sm font-medium`}>
              {selectedValue ? selectedLabel : placeholder ?? 'Seleccionar'}
            </Text>
            <View className="absolute right-3 top-3 items-center justify-center">
              <ArrowDown />
            </View>
          </Pressable>
        </View>
      ) : (
        <View className="relative w-full">
          <Pressable
            onPress={() => setOpen((current) => !current)}
            className={`w-full h-[44px] rounded-[10px] border bg-neutral-white py-3 pl-4 pr-10 justify-center ${error ? 'border-kambista-errorRed' : 'border-neutral-grayBorder'}`}
          >
            <Text className={`${selectedValue ? 'text-kambista-navy' : 'text-neutral-grayPlaceholder'} text-sm font-medium`}>
              {selectedValue ? selectedLabel : placeholder ?? 'Seleccionar'}
            </Text>
            <View className="absolute right-3 top-3 items-center justify-center">
              <ArrowDown />
            </View>
          </Pressable>

          {open ? (
            <View className="absolute z-50 mt-1 w-full space-y-2 rounded-[10px] border border-neutral-grayBorder bg-white p-2 shadow-lg">
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onValueChange(option.value)
                    setOpen(false)
                  }}
                  className={`rounded-2xl px-4 py-3 ${selectedValue === option.value ? 'bg-kambista-mint/20 border border-kambista-mint' : 'bg-kambista-appBg border border-neutral-grayBorder'}`}
                >
                  <Text className={`${selectedValue === option.value ? 'text-kambista-navy' : 'text-neutral-darkText'} text-base`}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      )}

      {error ? <Text className="text-kambista-errorRed text-xs font-medium mt-0.5 pl-1">{error}</Text> : null}
    </View>
  )
}
