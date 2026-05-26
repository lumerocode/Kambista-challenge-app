import { Pressable, Text, View } from 'react-native'

type FileUploadProps = {
  label?: string
  fileName?: string
  helperText?: string
  error?: string
  onUploadPress: () => void
  disabled?: boolean
}

export default function FileUpload({
  label = 'Sube el archivo de tu constancia',
  fileName,
  helperText,
  error,
  onUploadPress,
  disabled
}: FileUploadProps) {
  return (
    <View className="w-full flex flex-col gap-3">
      {label ? <Text className="font-sans font-normal text-sm text-kambista-navy tracking-wider">{label}</Text> : null}
      <Pressable
        onPress={onUploadPress}
        disabled={disabled}
        className={`w-full flex-row items-center justify-between rounded-2xl border px-4 py-3 ${disabled ? 'border-neutral-grayBorder bg-neutral-grayBorder/40' : 'border-neutral-grayBorder bg-white'}`}
      >
        <Text className="flex-1 text-sm text-neutral-darkText truncate">
          {fileName ? `Archivo: ${fileName}` : 'Selecciona archivo'}
        </Text>
        <View className="h-5 w-5 items-center justify-center rounded-full bg-kambista-appBg border border-neutral-grayBorder">
          <Text className="text-sm text-neutral-darkText">⬆️</Text>
        </View>
      </Pressable>
      {helperText ? <Text className="text-xs text-neutral-darkText">{helperText}</Text> : null}
      {error ? <Text className="text-kambista-errorRed text-xs">{error}</Text> : null}
    </View>
  )
}
