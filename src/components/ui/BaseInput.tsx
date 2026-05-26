import { Pressable, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import IconEye from '../../assets/img/icons/icon-eye.svg'
import IconEyeOff from '../../assets/img/icons/icon-eye-off.svg'

type BaseInputProps = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad'
  error?: string
  onFocus?: () => void
  onBlur?: () => void
}

export default function BaseInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  error,
  onFocus,
  onBlur
}: BaseInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View className="w-full flex flex-col gap-1.5">
      {label ? <Text className="font-sans font-medium text-sm text-neutral-darkText tracking-wider">{label}</Text> : null}
      <View className="relative w-full">
        <TextInput
          className={`w-full h-[44px] box-border font-sans font-medium text-sm bg-neutral-white border rounded-md py-3 px-4 text-kambista-navy ${error ? 'border-kambista-errorRed' : 'border-neutral-grayBorder'}`}
          placeholder={placeholder}
          placeholderTextColor="#A7A7A7"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setIsPasswordVisible((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-0 items-center justify-center"
          >
            {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="text-kambista-errorRed text-xs font-medium mt-0.5 pl-1">{error}</Text> : null}
    </View>
  )
}
