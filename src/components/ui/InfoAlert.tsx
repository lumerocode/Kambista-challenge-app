import { Pressable, Text, View } from 'react-native'
import Close from '../../assets/img/icons/icon-close.svg'
import CircleInfo from '../../assets/img/icons/icon-info-circle.svg'


type InfoAlertProps = {
  title?: string
  message: string
  iconSrc?: string
  closable?: boolean
  onClose?: () => void
}

export default function InfoAlert({
  title,
  message,
  closable,
  onClose
}: InfoAlertProps) {
  return (
    <View className="relative rounded-md bg-kambista-blueLight p-3 mt-5">
      <View className="flex-row items-center">
        <View className="shrink-0 mr-3 mb-1">
          <CircleInfo width={22} height={22} />
        </View>
        <View className="flex-1">
          {title ? (
            <Text className="font-sans font-semibold text-sm text-kambista-blueInfo mb-1">{title}</Text>
          ) : null}
          <Text className="font-sans font-medium text-xs leading-[16px] text-kambista-blueInfo">{message}</Text>
        </View>
      </View>
      {closable ? (
        <Pressable onPress={onClose} className="absolute right-3 top-3">
          <Close width={14} height={14} />
        </Pressable>
      ) : null}
    </View>
  )
}