export type CurrencyCode = 'USD' | 'PEN'
export type ExchangeMode = 'buy' | 'sell'

export interface ExchangeRates {
  bid: number
  bidChange: number
  ask: number
  askChange: number
  date: string
  author: string
  created: string
}

export interface ExchangeCalculation {
  rate: number
  exchange: number
  tc: {
    bid: number
    ask: number
  }
  data: {
    operate: boolean
    msg: string
  }
  savings: {
    amount: string
    currency: CurrencyCode
  }
}

export type ScreenKey = 'calculator' | 'summary'
