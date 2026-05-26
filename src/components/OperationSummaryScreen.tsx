import { Pressable, ScrollView, Text, View } from 'react-native'
import { useExchange } from '../context/ExchangeContext'
import { formatCurrencyLabel } from '../utils/currency'

export default function OperationSummaryScreen() {
  const {
    calculation,
    amount,
    originCurrency,
    destinationCurrency,
    mode,
    currentRates,
    goToCalculator,
    resetOperation
  } = useExchange()

  if (!calculation || !currentRates) {
    return (
      <View className="flex-1 items-center justify-center bg-kambista-appBg px-4">
        <Text className="text-base font-semibold text-kambista-navy">No hay simulación disponible</Text>
        <Pressable onPress={goToCalculator} className="mt-4 rounded-3xl bg-kambista-mint px-5 py-4">
          <Text className="text-base font-semibold text-kambista-navy">Volver</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-kambista-appBg px-4 pt-8" contentContainerStyle={{ paddingBottom: 36 }}>
      <View className="mb-5">
        <Text className="text-2xl font-semibold text-kambista-navy mb-1">Resumen de operación</Text>
        <Text className="text-sm text-neutral-darkText">Revisa tu simulación antes de confirmar.</Text>
      </View>

      <View className="rounded-3xl bg-white p-5 shadow-xl shadow-black/5 mb-5">
        <Text className="text-sm uppercase text-neutral-grayText mb-3">Detalle</Text>
        <View className="space-y-4">
          <View>
            <Text className="text-xs text-neutral-grayText">Operación</Text>
            <Text className="mt-1 text-lg font-semibold text-kambista-navy">{mode === 'buy' ? 'Comprar USD' : 'Vender USD'}</Text>
          </View>
          <View>
            <Text className="text-xs text-neutral-grayText">Monto origen</Text>
            <Text className="mt-1 text-lg font-semibold text-kambista-navy">
              {originCurrency === 'USD' ? formatCurrencyLabel(Number(amount.replace(/,/g, '')), 'USD') : formatCurrencyLabel(Number(amount.replace(/,/g, '')), 'PEN')}
            </Text>
          </View>
          <View>
            <Text className="text-xs text-neutral-grayText">Monto estimado recibido</Text>
            <Text className="mt-1 text-lg font-semibold text-kambista-navy">{formatCurrencyLabel(calculation.exchange, destinationCurrency)}</Text>
          </View>
        </View>
      </View>

      <View className="rounded-3xl bg-kambista-appBg p-5 mb-5">
        <Text className="text-sm uppercase text-neutral-grayText mb-3">Tipo de cambio aplicado</Text>
        <Text className="text-xl font-semibold text-kambista-navy">{formatCurrencyLabel(calculation.rate, originCurrency)}</Text>
        <View className="mt-4 rounded-2xl bg-white p-4">
          <Text className="text-xs uppercase text-neutral-grayText">Tasa bid</Text>
          <Text className="mt-1 text-base text-kambista-navy">S/ {currentRates.bid.toFixed(2)}</Text>
          <Text className="mt-3 text-xs uppercase text-neutral-grayText">Tasa ask</Text>
          <Text className="mt-1 text-base text-kambista-navy">S/ {currentRates.ask.toFixed(2)}</Text>
        </View>
      </View>

      <View className="rounded-3xl bg-kambista-rewardBg p-5 mb-6">
        <Text className="text-sm font-semibold text-kambista-rewardText mb-2">Siguiente paso</Text>
        <Text className="text-sm text-kambista-rewardText leading-6">
          Si deseas continuar, utiliza esta simulación como referencia para tu transferencia. Esta app usa la misma lógica de cálculo del reto web, adaptada para móvil usando React Native y Tailwind.
        </Text>
      </View>

      <Pressable onPress={goToCalculator} className="mb-4 rounded-3xl bg-kambista-mint px-5 py-4 items-center">
        <Text className="text-base font-semibold text-kambista-navy">Nueva simulación</Text>
      </Pressable>
      <Pressable onPress={resetOperation} className="rounded-3xl bg-white border border-neutral-grayBorder px-5 py-4 items-center">
        <Text className="text-base font-semibold text-kambista-navy">Reiniciar flujo</Text>
      </Pressable>
    </ScrollView>
  )
}
