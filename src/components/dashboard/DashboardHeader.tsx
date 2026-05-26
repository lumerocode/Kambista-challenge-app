import { Pressable, Text, View } from 'react-native'

type DashboardHeaderProps = {
  title: string
  subtitle?: string
  onLogout: () => void
  onOpenMenu: () => void
}

export default function DashboardHeader({ title, subtitle, onLogout, onOpenMenu }: DashboardHeaderProps) {
  return (
    <View className="px-6 pt-8">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 rounded-3xl bg-kambista-mint/20 items-center justify-center">
            <Text className="text-xl font-bold text-kambista-navy">K</Text>
          </View>
          <View>
            <Text className="text-xl font-semibold text-kambista-navy">{title}</Text>
            {subtitle ? <Text className="text-sm text-neutral-darkText">{subtitle}</Text> : null}
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable onPress={onOpenMenu} className="rounded-3xl border border-neutral-grayBorder px-4 py-2">
            <Text className="text-sm text-kambista-navy">Menu</Text>
          </Pressable>
          <Pressable onPress={onLogout} className="rounded-3xl border border-neutral-grayBorder px-4 py-2">
            <Text className="text-sm text-kambista-navy">Salir</Text>
          </Pressable>
        </View>
      </View>

      <View className="rounded-3xl bg-white border border-neutral-grayBorder p-4 shadow-sm flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-2xl bg-kambista-blueLight items-center justify-center">
            <Text className="text-base font-bold text-white">K</Text>
          </View>
          <View>
            <Text className="text-xs uppercase text-neutral-grayText">Koinks</Text>
            <Text className="text-base font-semibold text-kambista-navy">2500</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-full bg-kambista-appBg border border-neutral-grayBorder items-center justify-center">
            <Text className="text-base text-kambista-navy">💰</Text>
          </View>
          <Text className="text-sm text-neutral-darkText">Horario 9:00 - 19:00</Text>
        </View>
      </View>
    </View>
  )
}
