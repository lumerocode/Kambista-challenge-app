import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ExchangeCalculation, ExchangeMode, ExchangeRates, ScreenKey, CurrencyCode } from '../types/exchange'
import { fetchCurrentRates, simulateExchange } from '../services/kambistaApi'
import { formatCurrencyAmount } from '../utils/currency'

interface ExchangeContextValue {
  currentRates: ExchangeRates | null
  isLoadingRates: boolean
  isCalculating: boolean
  errorMessage: string | null
  activeScreen: ScreenKey
  mode: ExchangeMode
  amount: string
  amountDisplay: string
  originCurrency: CurrencyCode
  destinationCurrency: CurrencyCode
  calculation: ExchangeCalculation | null
  setAmount: (value: string) => void
  setMode: (mode: ExchangeMode) => void
  swapCurrencies: () => void
  calculateExchange: () => Promise<void>
  goToSummary: () => Promise<void>
  goToCalculator: () => void
  resetOperation: () => void
  retryLoadRates: () => Promise<void>
}

const ExchangeContext = createContext<ExchangeContextValue | null>(null)

const defaultOriginCurrency: CurrencyCode = 'PEN'
const defaultDestinationCurrency: CurrencyCode = 'USD'

export function ExchangeProvider({ children }: { children: ReactNode }) {
  const [currentRates, setCurrentRates] = useState<ExchangeRates | null>(null)
  const [isLoadingRates, setIsLoadingRates] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('calculator')
  const [mode, setModeState] = useState<ExchangeMode>('buy')
  const [amount, setAmountState] = useState('')
  const [originCurrency, setOriginCurrency] = useState<CurrencyCode>(defaultOriginCurrency)
  const [destinationCurrency, setDestinationCurrency] = useState<CurrencyCode>(defaultDestinationCurrency)
  const [calculation, setCalculation] = useState<ExchangeCalculation | null>(null)

  useEffect(() => {
    void loadRates()
  }, [])

  const loadRates = async () => {
    setIsLoadingRates(true)
    setErrorMessage(null)

    try {
      const data = await fetchCurrentRates()
      setCurrentRates(data)
    } catch {
      setErrorMessage('No se pudieron cargar las tasas actuales. Revisa tu conexión.')
    } finally {
      setIsLoadingRates(false)
    }
  }

  const updateMode = (selectedMode: ExchangeMode) => {
    setModeState(selectedMode)
    if (selectedMode === 'buy') {
      setOriginCurrency('PEN')
      setDestinationCurrency('USD')
    } else {
      setOriginCurrency('USD')
      setDestinationCurrency('PEN')
    }
    setCalculation(null)
    setErrorMessage(null)
  }

  const amountDisplay = useMemo(() => {
    if (amount === '') return ''
    return formatCurrencyAmount(Number(amount.replace(/,/g, '')))
  }, [amount])

  const swapCurrencies = () => {
    setOriginCurrency((current) => {
      const next = current === 'PEN' ? 'USD' : 'PEN'
      setDestinationCurrency(current)
      setModeState(next === 'PEN' ? 'buy' : 'sell')
      setCalculation(null)
      setErrorMessage(null)
      return next
    })
  }

  const calculateExchange = async () => {
    if (!currentRates) {
      setErrorMessage('La tasa no está disponible. Intenta nuevamente.')
      return
    }

    const parsedAmount = Number(amount.replace(/,/g, '').trim())
    if (!parsedAmount || parsedAmount <= 0) {
      setErrorMessage('Ingresa un monto válido para calcular la operación.')
      return
    }

    setIsCalculating(true)
    setErrorMessage(null)

    try {
      const result = await simulateExchange({
        amount: parsedAmount,
        mode,
        originCurrency,
        destinationCurrency,
        rates: currentRates
      })
      setCalculation(result)
    } catch {
      setErrorMessage('No se pudo simular la operación. Intenta nuevamente.')
    } finally {
      setIsCalculating(false)
    }
  }

  const goToSummary = async () => {
    if (!calculation) {
      await calculateExchange()
    }
    setActiveScreen('summary')
  }

  const goToCalculator = () => {
    setActiveScreen('calculator')
    setErrorMessage(null)
  }

  const resetOperation = () => {
    setAmountState('')
    setCalculation(null)
    setErrorMessage(null)
    setActiveScreen('calculator')
  }

  const retryLoadRates = async () => {
    await loadRates()
  }

  const value: ExchangeContextValue = {
    currentRates,
    isLoadingRates,
    isCalculating,
    errorMessage,
    activeScreen,
    mode,
    amount,
    amountDisplay,
    originCurrency,
    destinationCurrency,
    calculation,
    setAmount: setAmountState,
    setMode: updateMode,
    swapCurrencies,
    calculateExchange,
    goToSummary,
    goToCalculator,
    resetOperation,
    retryLoadRates
  }

  return <ExchangeContext.Provider value={value}>{children}</ExchangeContext.Provider>
}

export function useExchange() {
  const context = useContext(ExchangeContext)
  if (!context) {
    throw new Error('useExchange must be used within ExchangeProvider')
  }
  return context
}
