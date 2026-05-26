import { Text, View } from 'react-native'

type DashboardSidebarProps = {
  operations?: number
  lastUpdate?: string
}

export default function DashboardSidebar({ operations = 24, lastUpdate = 'Hace 2 minutos' }: DashboardSidebarProps) {
  return (
    <View className="px-6 py-4">
      <View className="mb-4 flex-row items-center gap-3">
        <View className="h-12 w-12 rounded-3xl bg-kambista-mint/20 items-center justify-center">
          <Text className="text-lg font-bold text-kambista-navy">K</Text>
        </View>
        <View>
          <Text className="text-sm font-semibold text-kambista-navy">Kambista</Text>
          <Text className="text-xs text-neutral-grayText">Resumen rápido</Text>
        </View>
      </View>

      <View className="rounded-3xl bg-white p-5 shadow-xl shadow-black/5">
        <Text className="text-sm font-semibold text-neutral-grayText mb-3">Resumen rápido</Text>
        <View className="space-y-4">
          <View>
            <Text className="text-xs uppercase text-neutral-grayText">Operaciones activas</Text>
            <Text className="mt-2 text-2xl font-semibold text-kambista-navy">{operations}</Text>
          </View>
          <View>
            <Text className="text-xs uppercase text-neutral-grayText">Última actualización</Text>
            <Text className="mt-2 text-base text-neutral-darkText">{lastUpdate}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
