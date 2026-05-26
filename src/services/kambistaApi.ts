import type { CurrencyCode, ExchangeMode, ExchangeCalculation, ExchangeRates } from '../types/exchange'

const MOCK_RATES: ExchangeRates = {
  bid: 3.85,
  bidChange: 0.03,
  ask: 3.93,
  askChange: -0.01,
  date: new Date().toISOString().split('T')[0],
  author: 'kambista-app',
  created: new Date().toISOString()
}

export async function fetchCurrentRates(): Promise<ExchangeRates> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RATES), 400)
  })
}

export async function simulateExchange(params: {
  amount: number
  mode: ExchangeMode
  originCurrency: CurrencyCode
  destinationCurrency: CurrencyCode
  rates: ExchangeRates
}): Promise<ExchangeCalculation> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { amount, mode, originCurrency, destinationCurrency, rates } = params
      const useRate = mode === 'buy' ? rates.ask : rates.bid
      let exchange = amount

      if (originCurrency === 'PEN' && destinationCurrency === 'USD') {
        exchange = amount / useRate
      } else if (originCurrency === 'USD' && destinationCurrency === 'PEN') {
        exchange = amount * useRate
      }

      resolve({
        rate: useRate,
        exchange,
        tc: {
          bid: rates.bid,
          ask: rates.ask
        },
        data: {
          operate: true,
          msg: 'Simulación de tasa completada'
        },
        savings: {
          amount: '0.00',
          currency: destinationCurrency
        }
      })
    }, 500)
  })
}
