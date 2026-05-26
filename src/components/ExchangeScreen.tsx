import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import { useExchange } from '../context/ExchangeContext'
import { formatCurrencyLabel, sanitizeCurrencyInput } from '../utils/currency'
import ExchangeCalculator from '../components/dashboard/ExchangeCalculator'
import ExchangeCurrencySelect from '../components/dashboard/ExchangeCurrencySelect'
import InfoAlert from '../components/ui/InfoAlert'
import BaseButton from '../components/ui/BaseButton'

export default function ExchangeScreen() {
  const {
    currentRates,
    amount,
    amountDisplay,
    setAmount,
    mode,
    setMode,
    originCurrency,
    destinationCurrency,
    calculation,
    isLoadingRates,
    isCalculating,
    errorMessage,
    calculateExchange,
    goToSummary,
    swapCurrencies
  } = useExchange()
  const [isFocused, setIsFocused] = useState(false)

  const actionLabel = mode === 'buy' ? 'Comprar USD' : 'Vender USD'
  const rateLabel = mode === 'buy' ? currentRates?.ask : currentRates?.bid

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1 bg-kambista-appBg px-4 pt-8" contentContainerStyle={{ paddingBottom: 36 }}>
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-kambista-navy mb-1">Kambista Expo</Text>
          <Text className="text-sm text-neutral-darkText">Simula tu operación de divisas en móvil.</Text>
        </View>

        <ExchangeCalculator title="Calculadora de cambio">
          <View className="rounded-3xl bg-kambista-navy/5 p-4">
            <Text className="text-sm font-semibold text-kambista-mint mb-4">Tasa actual de cambio</Text>
            <View className="flex-row justify-between gap-3">
              <View className="flex-1 rounded-2xl bg-white p-4">
                <Text className="text-xs uppercase text-neutral-grayText">Compra</Text>
                <Text className="mt-2 text-xl font-semibold text-kambista-navy">{currentRates ? `S/ ${currentRates.bid.toFixed(2)}` : '---'}</Text>
                <Text className="mt-1 text-xs text-kambista-mint">{currentRates ? `${currentRates.bidChange >= 0 ? '+' : ''}${currentRates.bidChange.toFixed(2)}` : ''}</Text>
              </View>
              <View className="flex-1 rounded-2xl bg-white p-4">
                <Text className="text-xs uppercase text-neutral-grayText">Venta</Text>
                <Text className="mt-2 text-xl font-semibold text-kambista-navy">{currentRates ? `S/ ${currentRates.ask.toFixed(2)}` : '---'}</Text>
                <Text className="mt-1 text-xs text-kambista-errorRed">{currentRates ? `${currentRates.askChange >= 0 ? '+' : ''}${currentRates.askChange.toFixed(2)}` : ''}</Text>
              </View>
            </View>
          </View>

          <View className="rounded-2xl bg-kambista-appBg p-4">
            <ExchangeCurrencySelect
              title="Tipo de operación"
              options={['Comprar', 'Vender']}
              selected={mode === 'buy' ? 'Comprar' : 'Vender'}
              onSelect={(value) => setMode(value === 'Comprar' ? 'buy' : 'sell')}
            />
          </View>

          <View className="rounded-2xl bg-kambista-appBg p-4">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-sm text-neutral-darkText">Moneda origen</Text>
                <Text className="text-lg font-semibold text-kambista-navy">{originCurrency}</Text>
              </View>
              <BaseButton label="Intercambiar" onPress={swapCurrencies} variant="secondary" />
            </View>
            <Text className="text-xs uppercase text-neutral-grayText mb-2">Monto a convertir</Text>
            <TextInput
              className="h-16 rounded-3xl border border-neutral-grayBorder bg-kambista-appBg px-5 text-2xl font-semibold text-kambista-navy"
              keyboardType="decimal-pad"
              placeholder={`Ej. ${originCurrency === 'USD' ? '$ 100.00' : 'S/ 1,000.00'}`}
              value={isFocused ? amount : amountDisplay}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(text) => setAmount(sanitizeCurrencyInput(text))}
            />
            <View className="mt-4 rounded-2xl bg-white p-4">
              <Text className="text-xs uppercase text-neutral-grayText">Destino</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">{destinationCurrency}</Text>
              <Text className="mt-1 text-sm text-neutral-darkText">Tasa aplicada: {rateLabel ? formatCurrencyLabel(rateLabel, originCurrency) : '---'}</Text>
            </View>
          </View>
        </ExchangeCalculator>

        {errorMessage ? (
          <View className="rounded-3xl bg-kambista-errorRed/10 border border-kambista-errorRed p-4 mb-5">
            <Text className="text-sm text-kambista-errorRed">{errorMessage}</Text>
          </View>
        ) : null}

        <View className="rounded-3xl bg-white p-5 shadow-xl shadow-black/5 mb-6">
          <Text className="text-sm uppercase text-neutral-grayText mb-3">Simulación</Text>
          <View className="space-y-3">
            <View className="rounded-2xl bg-kambista-appBg p-4">
              <Text className="text-xs text-neutral-grayText">Operación</Text>
              <Text className="mt-2 text-lg font-semibold text-kambista-navy">{actionLabel}</Text>
            </View>
            <View className="rounded-2xl bg-kambista-appBg p-4">
              <Text className="text-xs text-neutral-grayText">Resultado estimado</Text>
              <Text className="mt-2 text-xl font-semibold text-kambista-navy">
                {calculation ? formatCurrencyLabel(calculation.exchange, destinationCurrency) : '--'}
              </Text>
            </View>
          </View>
        </View>

        <BaseButton
          label={isCalculating ? 'Calculando...' : 'Ver resumen'}
          onPress={goToSummary}
          disabled={!amount || isCalculating || isLoadingRates}
        />

        <InfoAlert
          title="Consejo"
          message="Para operaciones en móvil, revisa siempre la tasa antes de confirmar. Este flujo simula mejor la experiencia de una app de cambio de divisas."
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
