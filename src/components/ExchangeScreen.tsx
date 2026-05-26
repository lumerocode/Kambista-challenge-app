import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View, Image } from 'react-native'
import { useExchange } from '../context/ExchangeContext'
import { useAppState } from '../context/AppStateContext'
import type { CurrencyCode } from '../types/exchange'
import { formatCurrencyLabel, formatCurrencyAmount, sanitizeCurrencyInput } from '../utils/currency'
import ExchangeCalculator from '../components/dashboard/ExchangeCalculator'
import ExchangeCurrencySelect from '../components/dashboard/ExchangeCurrencySelect'
import BaseButton from '../components/ui/BaseButton'
import IconSwitch from '../assets/img/icons/icon-switch.svg'
import LogoMain from '../assets/img/brand/logo-main.png'
import Star from '../assets/img/illustrations/star-badge.svg'

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
    errorMessage,
    swapCurrencies,
    setOriginCurrency,
    setDestinationCurrency
  } = useExchange()
  const { startOperationFlow } = useAppState()
  const [isFocused, setIsFocused] = useState(false)
  const [isStartingOperation, setIsStartingOperation] = useState(false)

  const actionLabel = mode === 'buy' ? 'Comprar USD' : 'Vender USD'
  const rateLabel = mode === 'buy' ? currentRates?.ask : currentRates?.bid
  const resultLabel = calculation ? formatCurrencyLabel(calculation.exchange, destinationCurrency) : '--'

  const handleCurrencySelection = (currency: CurrencyCode, isOrigin: boolean) => {
    if (isOrigin) {
      if (currency === originCurrency) return
      setOriginCurrency(currency)
      return
    }

    if (currency === destinationCurrency) return
    setDestinationCurrency(currency)
  }

  const handleStartOperation = async () => {
    if (!amount || isLoadingRates || isStartingOperation) return

    setIsStartingOperation(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsStartingOperation(false)
    startOperationFlow()
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1 pt-10" contentContainerStyle={{ paddingBottom: 36 }}>
        <View className="flex justify-center items-center mb-[40px]">
          <Image source={LogoMain} resizeMode="contain" className='w-[208px] h-[48px]'/>
        </View>

        <ExchangeCalculator>        
          <View >
            <View className="flex-row h-[50px]">
              <Pressable
                onPress={() => setMode('buy')}
                className={`flex-1 flex items-center justify-center rounded-t-[8px] text-sm border-2 border-neutral-grayBg ${mode === 'buy' ? 'bg-kambista-navy text-neutral-white' : 'bg-neutral-white'}`}
              >
                <View className="flex-row items-center">
                  <Text className={`font-semibold ${mode === 'buy' ? 'text-neutral-white' : 'text-neutral-grayPlaceholder'}`}>Compra:</Text>
                  <Text className={`font-semibold ml-1 ${mode === 'buy' ? 'text-neutral-white' : 'text-neutral-grayPlaceholder'}`}>{currentRates ? `S/ ${currentRates.bid.toFixed(2)}` : '---'}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setMode('sell')}
                className={`flex-1 flex items-center justify-center rounded-t-[8px] text-sm border-2 border-neutral-grayBg ${mode === 'sell' ? 'bg-kambista-navy text-neutral-white' : 'bg-neutral-white'}`}
              >   
                <View className="flex-row items-center">
                  <Text className={`font-semibold ${mode === 'sell' ? 'text-neutral-white' : 'text-neutral-grayPlaceholder'}`}>Venta:</Text>
                  <Text className={`font-semibold ml-1 ${mode === 'sell' ? 'text-neutral-white' : 'text-neutral-grayPlaceholder'}`}>{currentRates ? `S/ ${currentRates.ask.toFixed(2)}` : '---'}</Text>
                </View>
              </Pressable>
            </View>
          </View>
          
          <View className="rounded-b-[8px] bg-white pt-[30px] px-5 pb-2">
            <View>
              {/* Input Row */}
              <View className="h-[70px] flex-row items-center">
                <View className="flex flex-[0.6] h-[70px]">
                  <View className="rounded-l-[8px] border border-neutral-grayBorder bg-neutral-grayBorder h-[70px] px-4 justify-center">
                    <Text className="text-xs text-neutral-grayText">¿Cuánto envías?</Text>
                    <TextInput
                      className="text-2xl font-bold text-kambista-navy"
                      keyboardType="decimal-pad"
                      placeholder={originCurrency === 'USD' ? '100.00' : '1,000.00'}
                      placeholderTextColor="#A7A7A7"
                      value={isFocused ? amount : amountDisplay}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChangeText={(text) => setAmount(sanitizeCurrencyInput(text))}
                    />
                  </View>
                </View>
                <View className="flex-[0.4]">
                  <ExchangeCurrencySelect
                    compact
                    className="h-[70px]"
                    options={['PEN', 'USD']}
                    selected={originCurrency}
                    onSelect={(value) => handleCurrencySelection(value, true)}
                  />
                </View>
              </View>
              <Pressable onPress={swapCurrencies} className="absolute z-10 right-[34%] top-[48px] -translate-x-1/2 -translate-y-1/2">
                <IconSwitch width={50} height={50} />
              </Pressable>
              {/* Result Row */}
              <View className="h-[70px] flex-row items-center mt-2">
                <View className="flex-[0.6]">
                  <View className="rounded-l-[8px] border border-neutral-grayBorder bg-neutral-grayBorder h-[70px] px-4 justify-center">
                    <Text className="text-xs text-neutral-grayText">Entonces recibes</Text>
                    <TextInput
                      className="text-2xl font-bold text-kambista-navy"
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor="#A7A7A7"
                      value={calculation ? formatCurrencyAmount(calculation.exchange) : '---'}
                      editable={false}
                    />
                  </View>
                </View>
                <View className="flex-[0.4]">
                  <ExchangeCurrencySelect
                    compact
                    className="min-w-[120px]"
                    options={['USD', 'PEN']}
                    selected={destinationCurrency}
                    onSelect={(value) => handleCurrencySelection(value, false)}
                  />
                </View>
              </View>
            </View>
            <View className="flex-row space-between">
              <View className="flex-1 pt-4">
                <Text className="text-xs text-neutral-grayText">Ahorro estimado:</Text>
                <Text className="font-bold text-kambista-navy">S/ 12.30</Text>
              </View>
              <View className="flex-1 pt-4 items-end">
                <Text className="text-xs text-neutral-grayText">Koinks</Text>
                <Text className="font-bold text-kambista-navy">480</Text>
              </View>
            </View>

            <View className="flex-row mt-5">
              <View className="flex-[0.7]">
                <TextInput
                  className="flex-1 h-[45px] rounded-l-[12px] border border-neutral-grayBorder bg-white px-4 text-base text-kambista-navy"
                  placeholder="¿Tienes un cupón?"
                />
              </View>
              <View className="flex-[0.3] h-[50px] bg-kambista-navy rounded-r-[12px] items-center justify-center">
                <Text 
                  onPress={() => {}} 
                  className="text-neutral-white font-semibold text-center"
                >
                  APLICAR
                </Text>
              </View>
            </View>

            {/* Promo */}
            <View className="flex justify-center">
              <View className="flex flex-row items-center mt-6">
                <Star width={32} height={32} />
                <View className="flex flex-col justify-center text-xs ml-2">
                  <Text className="font-sans text-sm text-kambista-navy leading-relaxed">
                    ¿Monto mayor a $5.000 o S/18.000?
                  </Text>
                  <Text className="font-bold text-kambista-navy underline cursor-pointer">
                    ¡Obtén un Tipo de Cambio Preferencial!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ExchangeCalculator>

        {errorMessage ? ( 
          <View className="rounded-3xl bg-kambista-errorRed/10 border border-kambista-errorRed p-4 mb-5">
            <Text className="text-sm text-kambista-errorRed">{errorMessage}</Text>
          </View>
        ) : null}

        <View className="px-4 mt-4">
          <BaseButton
            label={isStartingOperation ? 'Cargando...' : 'INICIAR OPERACIÓN'}
            onPress={handleStartOperation}
            loading={isStartingOperation}
            disabled={!amount || isStartingOperation || isLoadingRates}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>     
  )
}