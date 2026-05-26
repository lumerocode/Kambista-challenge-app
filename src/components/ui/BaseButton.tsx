import { Pressable, Text, View } from 'react-native'

type BaseButtonProps = {
  label: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export default function BaseButton({
  label,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  className = ''
}: BaseButtonProps) {
  const isDisabled = Boolean(disabled || loading)
  const backgroundClass =
    variant === 'secondary'
      ? 'bg-white border border-neutral-grayBorder'
      : variant === 'ghost'
      ? 'bg-transparent'
      : isDisabled
      ? 'bg-kambista-mintDisabled text-neutral-black'
      : 'bg-kambista-mint text-neutral-black'

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`w-full h-[52px] flex-row items-center justify-center rounded-md px-6 ${backgroundClass} ${isDisabled && !loading ? 'opacity-50' : ''} ${className}`}
    >
      {loading ? (
        <View className="mr-2 w-5 h-5 rounded-full border-2 border-kambista-navy border-t-transparent animate-spin" />
      ) : null}
      <Text className="text-sm font-medium text-neutral-black">{label}</Text>
    </Pressable>
  )
}
